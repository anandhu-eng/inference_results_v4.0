import json
import os

with open('summary.json') as f:
    data = json.load(f)
#print(models_all)
#print(platforms)

tableposhtml = """
<!-- pager -->
<div class="pager">
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/first.png" class="first"/>
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/prev.png" class="prev"/>
            <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/next.png" class="next"/>
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/last.png" class="last"/>
            <select class="pagesize" title="Select page size">
            <option selected="selected" value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="all">All</option>
            </select>
            <select class="gotoPage" title="Select page number"></select>
</div>
        """


def processdata(data, category, division, availability):

    mydata = {}
    needed_keys_model = [ "has_power", "Performance_Result", "Performance_Units", "Accuracy", "Location" ]

    needed_keys_system = [ "System", "Submitter", "Availability", "Category", "Accelerator", "a#", "Nodes", "Processor", "host_processors_per_node", "host_processor_core_count", "Notes", "Software" ]
    for item in data:
        if item['Suite'] != category:
            continue
        if item['Category'] != division:
            continue
        myid = item['ID']
        if mydata.get(myid, '') == '':
            mydata[myid] = {}
        model = item['Model']
        if mydata[myid].get(model, '') == '':
            mydata[myid][model] = {}
        scenario = item['Scenario']
        if mydata[myid][model].get(scenario, '') == '':
            mydata[myid][model][scenario] = {}

        mydata[myid][model][scenario]['has_power'] = item['has_power']
        if item['has_power'] and item.get('Power_Result'):
            mydata[myid][model][scenario]['Power_Result'] = item['Power_Result']
            mydata[myid][model][scenario]['Power_Units'] = item['Power_Units']
        for key in needed_keys_model:
            mydata[myid][model][scenario][key] = item[key]
        for key in needed_keys_system:
            mydata[myid][key] = item[key]
    return mydata


def construct_table():
    # Initialize the HTML table with the header
    html = '<div id="results_table"> <table class="tablesorter" id="results">'
    html += "<thead> <tr>"
    
    # Table header
    tableheader = f"""
        <th id="col-id">ID</th>
        <th id="col-system">System</th>
        <th id="col-submitter">Submitter</th>
        <th id="col-accelerator">Accelerator</th>
        <th id="col-llama2-99" colspan="2">LLAMA2-70B-99</th>
        <th id="col-llama2-99.9" colspan="2">LLAMA2-70B-99.9</th>
        <th id="col-gptj-99" colspan="2">GPTJ-99</th>
        <th id="col-gptj-99.9" colspan="2">GPTJ-99.9</th>
        <th id="col-bert-99" colspan="2">Bert-99</th>
        <th id="col-bert-99.9" colspan="2">Bert-99.9</th>
        <th id="col-dlrm-v2-99" colspan="2">Stable Diffusion</th>
        <th id="col-dlrm-v2-99" colspan="2">DLRM-v2-99</th>
        <th id="col-dlrm-v2-99.9" colspan="2">DLRM-v2-99.9</th>
        <th id="col-retinanet" colspan="2">Retinanet</th>
        <th id="col-resnet50" colspan="2">ResNet50</th>
        <th id="col-3d-unet-99" colspan="1">3d-unet-99</th>
        <th id="col-3d-unet-99.9" colspan="1">3d-unet-99.9</th>
        """ 
    tableheader += "</tr>"
    
    tableheader += f"""
    <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Server</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Offline</th>
    <th class="col-scenario">Offline</th>
    """
    
    
    # Add header and footer
    html += tableheader
    html += "</tr></thead>"
    html += f"<tfoot> <tr>{tableheader}</tr></tfoot>"

    mydata = processdata(data, "datacenter", "closed", "availability")
    model = [ "resnet", "retinanet", "bert-99", "bert-99.9", "gptj-99", "gptj-99.9", "llama2-70b-99", "llama2-70b-99.9", "stable-diffusion-xl", "dlrm-v2-99", "dlrm-v2-99.9", "3d-unet-99", "3d-unet-99.9"  ]
    model = [ "llama2-70b-99", "llama2-70b-99.9", "gptj-99", "gptj-99.9", "bert-99", "bert-99.9", "stable-diffusion-xl",  "dlrm-v2-99", "dlrm-v2-99.9", "retinanet", "resnet", "3d-unet-99", "3d-unet-99.9"  ]
    for rid in mydata:
        extra_sys_info = f"""
Processor: {mydata[rid]['Processor']}
Software: {mydata[rid]['Software']}
Cores per processor: {mydata[rid]['host_processor_core_count']}
Processors per node: {mydata[rid]['host_processors_per_node']}
Nodes: {mydata[rid]['Nodes']}
Notes: {mydata[rid]['Notes']}
        """
        a_num = mydata[rid]['a#']
        if a_num =='':
            acc = ""
        else:
            acc = f"{mydata[rid]['Accelerator']} x {int(a_num)}"
        html += f"""
        <tr>
        <td class="col-id"> {rid} </tid>
        <td class="col-system" title="{extra_sys_info}"> {mydata[rid]['System']} </td>
        <td class="col-submitter"> {mydata[rid]['Submitter']} </td>
        <td class="col-accelerator"> {acc} </td>
        """
        for m in model:
            if mydata[rid].get(m):
                location_pre = "https://github.com/mlcommons/inference_results_v4.0/tree/main/"
                if mydata[rid][m].get('Server'):
                    html += f"""
                        <td class="col-result"><a target="_blank" href="{location_pre}{mydata[rid][m]['Offline']['Location']}"> {round(mydata[rid][m]['Server']['Performance_Result'],1)} </a> </td>
                    """
                html += f"""
                <td class="col-result"><a target="_blank" href="{location_pre}{mydata[rid][m]['Offline']['Location']}"> {round(mydata[rid][m]['Offline']['Performance_Result'],1)} </a> </td>
                """
            else:
                html += f"""
                <td></td>
                """
                if "3d-unet" not in m:
                    html += f"""
                    <td></td>
                    """


        html += f"""
        </tr>
        """
    
    html += "</table></div>"
    
    return html

html_table = construct_table()

html = f"""
{tableposhtml}
{html_table}
{tableposhtml}
"""

extra_scripts = """
<script type="text/javascript">
var sortcolumnindex = 4, perfsortorder = 1;
</script>

<script type="text/javascript" src="/javascripts/results_tablesorter.js"></script>

"""

out_html = f"""---
hide:
  - navigation
  - toc
---

<html>
{html}
{extra_scripts}
</html>
"""
with open(os.path.join("docs", "index.md"), "w") as f:
    f.write(out_html)


#print(data)
def generate_html_form(platforms, models_all, data1=None, data2=None, modelsdata=None):
    # Setting default values if not provided
    if not data1:
        data1 = ''
    if not data2:
        data2 = ''
    if not modelsdata:
        modelsdata = 'All models'

    # Create select options for system 1 and system 2
    def generate_select_options(options, selected_value):
        html = ""
        for key, value in options.items():
            selected = 'selected' if key == selected_value else ''
            html += f"<option value='{key}' {selected}>{value}</option>\n"
        return html

    system1_options = generate_select_options(platforms, data1)
    system2_options = generate_select_options(platforms, data2)

    # Create select options for models
    models_options = generate_select_options(models_all, modelsdata)

    # Generate the HTML for the form
    html_form = f"""
    <form id="compareform"  method="post" action="">
        <h3>Compare Results</h3>

        <div class="form-field">
            <label for="system1">System 1</label>
            <select id="system1" name="system1" class="col">
                {system1_options}
            </select>
        </div>

        <div class="form-field">
            <label for="system2">System 2</label>
            <select id="system2" name="system2" class="col">
                {system2_options}
            </select>
        </div>

        <div class="form-field">
            <label for="models">Models</label>
            <select id="models" name="models[]" class="col" multiple>
                {models_options}
            </select>
        </div>

        <div class="form-field">
            <button type="submit" name="okthen" value="1" id="compare_results">Compare SUTs</button>
        </div>
    </form>
    """

    return html_form

