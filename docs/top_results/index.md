---
hide:
  - navigation
  - toc
---

<html>

<h2 id="topresults_heading" class="results_table_heading"></h2>

        
<div id="topresults_table_wrapper" class="resultstable_wrapper"> 
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
<table class="tablesorter">
</table>
</div>

<hr>

 <form id="resultSelectionForm" method="post" action="">
        <h3>Choose the comparison</h3>

        <div class="form-field">
            <label for="category">Category</label>
            <select id="category" name="category" class="col">
                <option value='datacenter' >Datacenter</option>
<option value='edge' >Edge</option>

            </select>
        </div>

        <div class="form-field">
            <label for="division">Division</label>
            <select id="division" name="division" class="col">
                <option value='closed' selected>Closed</option>
<option value='open' >Open</option>

            </select>
        </div>

        <div class="form-field">
            <label for="availability">Availability</label>
            <select id="availability" name="availability" class="col">
                <option value='available' selected >Available</option>
                <option value='preview' >Preview</option>
                <option value='rdi' >RDI</option>
            </select>
        </div>

        <div class="form-field">
            <label for="model">Model</label>
            <select id="model" name="model" class="col">
            </select>
        </div>

        <div class="form-field">
            <label for="scenario">Scenario</label>
            <select id="scenario" name="scenario" class="col">
                <option value='Offline' selected>Offline</option>
                <option value='Server'>Server</option>
                <option value='SingleStream'>SingleStream</option>
                <option value='MultiStream'>MultiStream</option>
            </select>
        </div>

        <div class="form-field">
            <label for="metric">Metric</label>
            <select id="metric" name="metric" class="col">
                <option value="peak_performance" selected >Peak performance</option>
                <option value="power_efficiency" >Power efficiency</option>
                <option value="performance_per_accelerator" selected>Performance per accelerator</option>
                <option value="performance_per_core">Performance per core</option>
            </select>
        </div>

        <div class="form-field">
            <label for="filter_systems">Filter Systems</label>
             <select id="filter_systems" name="filter_systems[]" class="col" multiple size="30">
            </select>
        </div>

        <div class="form-field">
            <label for="filter_devices">Filter Devices</label>
            <select id="filter_devices" name="filter_devices" class="col">
            </select>
        </div>

        <div class="form-field">
            <button type="submit" name="submit" value="1" id="topresults_tablesorter">Submit</button>
        </div>
    </form>




<script type="text/javascript">
var sortcolumnindex = 5, perfsortorder = 1;
</script>

<script type="text/javascript" src="javascripts/topresults.js"></script>
<script type="text/javascript" src="javascripts/topresults_charts.js"></script>
<script type="text/javascript" src="javascripts/tablesorter.js"></script>


</html>
