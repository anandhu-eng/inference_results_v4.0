import json
import os

def getuniquevalues(data, key):
    uniquevalues = []
    for item in data:
        if item.get(key) and item.get(key) not in uniquevalues:
            uniquevalues.append(item[key])
    return uniquevalues

with open('summary.json') as f:
    data = json.load(f)
#print(models_all)
#print(platforms)

def processdata(data, category, division):
    mydata = {}
    needed_keys_model = [ "has_power", "Performance_Result", "Performance_Units", "Accuracy" ]
    needed_keys_system = [ "System", "Submitter", "Availability", "Category", "Accelerator" ]
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
    html = '<html> <div id="results_table"> <table class="tablesorter table-material" id="results">'
    html += "<thead> <tr>"
    
    # Table header
    tableheader = f"""
        <th>ID</th>
        <th>System</th>
        <th>Submitter</th>
        <th>Accelerator</th>
        <th>ResNet50</th>
        <th>GPT-J</th>
        """ 
    tableheader += "</tr>"
    tableheader += f"""
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th>Server</th>
    <th>Offline</th>
    """
    
    # Add header and footer
    html += tableheader
    html += "</thead>"
    html += f"<tfoot> <tr>{tableheader}</tr></tfoot>"

    mydata = processdata(data, "datacenter", "closed")
    model = [ "resnet", "bert-99" ]
    for rid in mydata:
        html += f"""
        <tr>
        <td> {rid} </tid>
        <td> {mydata[rid]['System']} </td>
        <td> {mydata[rid]['Submitter']} </td>
        <td> {mydata[rid]['Accelerator']} </td>
        """
        for m in model:
            if mydata[rid].get(m):
                html += f"""
                <td> {mydata[rid][m]['Offline']['Performance_Result']} </td>
                """

        html += f"""
        </tr>
        """
    
    html += "</table></div></html>"
    
    return html

html = construct_table()
with open(os.path.join("docs", "index.md"), "w") as f:
    f.write(html)


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

