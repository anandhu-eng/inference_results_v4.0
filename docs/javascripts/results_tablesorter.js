$('#results_available').tablesorter({

    // *** APPEARANCE ***
    // Add a theme - try 'blackice', 'blue', 'dark', 'default'
    //  'dropbox', 'green', 'grey' or 'ice'
    // to use 'bootstrap' or 'jui', you'll need to add the "uitheme"
    // widget and also set it to the same name
    // this option only adds a table class name "tablesorter-{theme}"
    theme: 'blue',

    // fix the column widths
    widthFixed: false,

    // Show an indeterminate timer icon in the header when the table
    // is sorted or filtered
    showProcessing: false,

    // header layout template (HTML ok); {content} = innerHTML,
    // {icon} = <i/> (class from cssIcon)
    headerTemplate: '{content}',

    // return the modified template string
    onRenderTemplate: null, // function(index, template){ return template; },

    // called after each header cell is rendered, use index to target the column
    // customize header HTML
    onRenderHeader: function (index) {
        // the span wrapper is added by default
        $(this).find('div.tablesorter-header-inner').addClass('roundedCorners');
    },

    // *** FUNCTIONALITY ***
    // prevent text selection in header
    cancelSelection: true,

    // other options: "ddmmyyyy" & "yyyymmdd"
    dateFormat: "mmddyyyy",

    // The key used to select more than one column for multi-column
    // sorting.
    sortMultiSortKey: "shiftKey",

    // key used to remove sorting on a column
    sortResetKey: 'ctrlKey',

    // false for German "1.234.567,89" or French "1 234 567,89"
    usNumberFormat: true,

    // If true, parsing of all table cell data will be delayed
    // until the user initializes a sort
    delayInit: false,

    // if true, server-side sorting should be performed because
    // client-side sorting will be disabled, but the ui and events
    // will still be used.
    serverSideSorting: false,

    // *** SORT OPTIONS ***
    // These are detected by default,
    // but you can change or disable them
    // these can also be set using data-attributes or class names
    headers: {
        // set "sorter : false" (no quotes) to disable the column
        0: {
            sorter: "digit"
        },
        1: {
            sorter: "text"
        },
        3: {
            sorter: "text"
        }
    },

    // ignore case while sorting
    ignoreCase: true,

    // forces the user to have this/these column(s) sorted first
    sortForce: null,
    // initial sort order of the columns, example sortList: [[0,0],[1,0]],
    // [[columnIndex, sortDirection], ... ]
    sortList: [
        [0,0]
    ],
    // default sort that is added to the end of the users sort
    // selection.
    sortAppend: null,

    // starting sort direction "asc" or "desc"
    sortInitialOrder: "asc",

    // Replace equivalent character (accented characters) to allow
    // for alphanumeric sorting
    sortLocaleCompare: false,

    // third click on the header will reset column to default - unsorted
    sortReset: false,

    // restart sort to "sortInitialOrder" when clicking on previously
    // unsorted columns
    sortRestart: false,

    // sort empty cell to bottom, top, none, zero
    emptyTo: "bottom",

    // sort strings in numerical column as max, min, top, bottom, zero
    stringTo: "max",

    // extract text from the table - this is how is
    // it done by default
    textExtraction: {
        0: function (node) {
            return $(node).text();
        },
        1: function (node) {
            return $(node).text();
        }
    },

    // use custom text sorter
    // function(a,b){ return a.sort(b); } // basic sort
    textSorter: null,

    // *** WIDGETS ***

    // apply widgets on tablesorter initialization
    initWidgets: true,

    // include zebra and any other widgets, options:
    // 'columns', 'filter', 'stickyHeaders' & 'resizable'
    // 'uitheme' is another widget, but requires loading
    // a different skin and a jQuery UI theme.
    widgets: ['zebra', 'columns'],

    widgetOptions: {

        // zebra widget: adding zebra striping, using content and
        // default styles - the ui css removes the background
        // from default even and odd class names included for this
        // demo to allow switching themes
        // [ "even", "odd" ]
        zebra: [
            "ui-widget-content even",
            "ui-state-default odd"],

        // uitheme widget: * Updated! in tablesorter v2.4 **
        // Instead of the array of icon class names, this option now
        // contains the name of the theme. Currently jQuery UI ("jui")
        // and Bootstrap ("bootstrap") themes are supported. To modify
        // the class names used, extend from the themes variable
        // look for the "$.extend($.tablesorter.themes.jui" code below
        uitheme: 'jui',

        // columns widget: change the default column class names
        // primary is the 1st column sorted, secondary is the 2nd, etc
        columns: [
            "primary",
            "secondary",
            "tertiary"],

        // columns widget: If true, the class names from the columns
        // option will also be added to the table tfoot.
        columns_tfoot: true,

        // columns widget: If true, the class names from the columns
        // option will also be added to the table thead.
        columns_thead: true,

        // filter widget: If there are child rows in the table (rows with
        // class name from "cssChildRow" option) and this option is true
        // and a match is found anywhere in the child row, then it will make
        // that row visible; default is false
        filter_childRows: false,

        // filter widget: If true, a filter will be added to the top of
        // each table column.
        filter_columnFilters: true,

        // filter widget: css class applied to the table row containing the
        // filters & the inputs within that row
        filter_cssFilter: "tablesorter-filter",

        // filter widget: Customize the filter widget by adding a select
        // dropdown with content, custom options or custom filter functions
        // see http://goo.gl/HQQLW for more details
        filter_functions: null,

        // filter widget: Set this option to true to hide the filter row
        // initially. The rows is revealed by hovering over the filter
        // row or giving any filter input/select focus.
        filter_hideFilters: false,

        // filter widget: Set this option to false to keep the searches
        // case sensitive
        filter_ignoreCase: true,

        // filter widget: jQuery selector string of an element used to
        // reset the filters.
        filter_reset: null,

        // Delay in milliseconds before the filter widget starts searching;
        // This option prevents searching for every character while typing
        // and should make searching large tables faster.
        filter_searchDelay: 300,

        // Set this option to true if filtering is performed on the server-side.
        filter_serversideFiltering: false,

        // filter widget: Set this option to true to use the filter to find
        // text from the start of the column. So typing in "a" will find
        // "albert" but not "frank", both have a's; default is false
        filter_startsWith: false,

        // filter widget: If true, ALL filter searches will only use parsed
        // data. To only use parsed data in specific columns, set this option
        // to false and add class name "filter-parsed" to the header
        filter_useParsedData: false,

        // Resizable widget: If this option is set to false, resized column
        // widths will not be saved. Previous saved values will be restored
        // on page reload
        resizable: true,

        // saveSort widget: If this option is set to false, new sorts will
        // not be saved. Any previous saved sort will be restored on page
        // reload.
        saveSort: true,

        // stickyHeaders widget: css class name applied to the sticky header
        stickyHeaders: "tablesorter-stickyHeader"

    },

    // *** CALLBACKS ***
    // function called after tablesorter has completed initialization
    initialized: function (table) {},

    // *** CSS CLASS NAMES ***
    tableClass: 'tablesorter',
    cssAsc: "tablesorter-headerSortUp",
    cssDesc: "tablesorter-headerSortDown",
    cssHeader: "tablesorter-header",
    cssHeaderRow: "tablesorter-headerRow",
    cssIcon: "tablesorter-icon",
    cssChildRow: "tablesorter-childRow",
    cssInfoBlock: "tablesorter-infoOnly",
    cssProcessing: "tablesorter-processing",

    // *** SELECTORS ***
    // jQuery selectors used to find the header cells.
    selectorHeaders: '> thead th, > thead td',

    // jQuery selector of content within selectorHeaders
    // that is clickable to trigger a sort.
    selectorSort: "th, td",

    // rows with this class name will be removed automatically
    // before updating the table cache - used by "update",
    // "addRows" and "appendCache"
    selectorRemove: "tr.remove-me",

    // *** DEBUGING ***
    // send messages to console
    debug: false

}).tablesorterPager({
    
    // target the pager markup - see the HTML block below
    container: $(".pager_available"),

    // use this url format "http:/mydatabase.com?page={page}&size={size}"
    ajaxUrl: null,

    // process ajax so that the data object is returned along with the
    // total number of rows; example:
    // {
    //   "data" : [{ "ID": 1, "Name": "Foo", "Last": "Bar" }],
    //   "total_rows" : 100
    // }
    ajaxProcessing: function(ajax) {
        if (ajax && ajax.hasOwnProperty('data')) {
            // return [ "data", "total_rows" ];
            return [ajax.data, ajax.total_rows];
        }
    },

    // output string - default is '{page}/{totalPages}';
    // possible variables:
    // {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
    output: '{startRow} to {endRow} ({totalRows})',

    // apply disabled classname to the pager arrows when the rows at
    // either extreme is visible - default is true
    updateArrows: true,

    // starting page of the pager (zero based index)
    page: 0,

    // Number of visible rows - default is 10
    size: 10,

    // if true, the table will remain the same height no matter how many
    // records are displayed. The space is made up by an empty
    // table row set to a height to compensate; default is false
    fixedHeight: true,

    // remove rows from the table to speed up the sort of large tables.
    // setting this to false, only hides the non-visible rows; needed
    // if you plan to add/remove rows with the pager enabled.
    removeRows: false,

    // css class names of pager arrows
    // next page arrow
    cssNext: '.next',
    // previous page arrow
    cssPrev: '.prev',
    // go to first page arrow
    cssFirst: '.first',
    // go to last page arrow
    cssLast: '.last',
    // select dropdown to allow choosing a page
    cssGoto: '.gotoPage',
    // location of where the "output" is displayed
    cssPageDisplay: '.pagedisplay',
    // dropdown that sets the "size" option
    cssPageSize: '.pagesize',
    // class added to arrows when at the extremes
    // (i.e. prev/first arrows are "disabled" when on the first page)
    // Note there is no period "." in front of this class name
    cssDisabled: 'disabled'

});

$('#results_preview').tablesorter({

    // *** APPEARANCE ***
    // Add a theme - try 'blackice', 'blue', 'dark', 'default'
    //  'dropbox', 'green', 'grey' or 'ice'
    // to use 'bootstrap' or 'jui', you'll need to add the "uitheme"
    // widget and also set it to the same name
    // this option only adds a table class name "tablesorter-{theme}"
    theme: 'blue',

    // fix the column widths
    widthFixed: false,

    // Show an indeterminate timer icon in the header when the table
    // is sorted or filtered
    showProcessing: false,

    // header layout template (HTML ok); {content} = innerHTML,
    // {icon} = <i/> (class from cssIcon)
    headerTemplate: '{content}',

    // return the modified template string
    onRenderTemplate: null, // function(index, template){ return template; },

    // called after each header cell is rendered, use index to target the column
    // customize header HTML
    onRenderHeader: function (index) {
        // the span wrapper is added by default
        $(this).find('div.tablesorter-header-inner').addClass('roundedCorners');
    },

    // *** FUNCTIONALITY ***
    // prevent text selection in header
    cancelSelection: true,

    // other options: "ddmmyyyy" & "yyyymmdd"
    dateFormat: "mmddyyyy",

    // The key used to select more than one column for multi-column
    // sorting.
    sortMultiSortKey: "shiftKey",

    // key used to remove sorting on a column
    sortResetKey: 'ctrlKey',

    // false for German "1.234.567,89" or French "1 234 567,89"
    usNumberFormat: true,

    // If true, parsing of all table cell data will be delayed
    // until the user initializes a sort
    delayInit: false,

    // if true, server-side sorting should be performed because
    // client-side sorting will be disabled, but the ui and events
    // will still be used.
    serverSideSorting: false,

    // *** SORT OPTIONS ***
    // These are detected by default,
    // but you can change or disable them
    // these can also be set using data-attributes or class names
    headers: {
        // set "sorter : false" (no quotes) to disable the column
        0: {
            sorter: "digit"
        },
        1: {
            sorter: "text"
        },
        3: {
            sorter: "text"
        }
    },

    // ignore case while sorting
    ignoreCase: true,

    // forces the user to have this/these column(s) sorted first
    sortForce: null,
    // initial sort order of the columns, example sortList: [[0,0],[1,0]],
    // [[columnIndex, sortDirection], ... ]
    sortList: [
        [0,0]
    ],
    // default sort that is added to the end of the users sort
    // selection.
    sortAppend: null,

    // starting sort direction "asc" or "desc"
    sortInitialOrder: "asc",

    // Replace equivalent character (accented characters) to allow
    // for alphanumeric sorting
    sortLocaleCompare: false,

    // third click on the header will reset column to default - unsorted
    sortReset: false,

    // restart sort to "sortInitialOrder" when clicking on previously
    // unsorted columns
    sortRestart: false,

    // sort empty cell to bottom, top, none, zero
    emptyTo: "bottom",

    // sort strings in numerical column as max, min, top, bottom, zero
    stringTo: "max",

    // extract text from the table - this is how is
    // it done by default
    textExtraction: {
        0: function (node) {
            return $(node).text();
        },
        1: function (node) {
            return $(node).text();
        }
    },

    // use custom text sorter
    // function(a,b){ return a.sort(b); } // basic sort
    textSorter: null,

    // *** WIDGETS ***

    // apply widgets on tablesorter initialization
    initWidgets: true,

    // include zebra and any other widgets, options:
    // 'columns', 'filter', 'stickyHeaders' & 'resizable'
    // 'uitheme' is another widget, but requires loading
    // a different skin and a jQuery UI theme.
    widgets: ['zebra', 'columns'],

    widgetOptions: {

        // zebra widget: adding zebra striping, using content and
        // default styles - the ui css removes the background
        // from default even and odd class names included for this
        // demo to allow switching themes
        // [ "even", "odd" ]
        zebra: [
            "ui-widget-content even",
            "ui-state-default odd"],

        // uitheme widget: * Updated! in tablesorter v2.4 **
        // Instead of the array of icon class names, this option now
        // contains the name of the theme. Currently jQuery UI ("jui")
        // and Bootstrap ("bootstrap") themes are supported. To modify
        // the class names used, extend from the themes variable
        // look for the "$.extend($.tablesorter.themes.jui" code below
        uitheme: 'jui',

        // columns widget: change the default column class names
        // primary is the 1st column sorted, secondary is the 2nd, etc
        columns: [
            "primary",
            "secondary",
            "tertiary"],

        // columns widget: If true, the class names from the columns
        // option will also be added to the table tfoot.
        columns_tfoot: true,

        // columns widget: If true, the class names from the columns
        // option will also be added to the table thead.
        columns_thead: true,

        // filter widget: If there are child rows in the table (rows with
        // class name from "cssChildRow" option) and this option is true
        // and a match is found anywhere in the child row, then it will make
        // that row visible; default is false
        filter_childRows: false,

        // filter widget: If true, a filter will be added to the top of
        // each table column.
        filter_columnFilters: true,

        // filter widget: css class applied to the table row containing the
        // filters & the inputs within that row
        filter_cssFilter: "tablesorter-filter",

        // filter widget: Customize the filter widget by adding a select
        // dropdown with content, custom options or custom filter functions
        // see http://goo.gl/HQQLW for more details
        filter_functions: null,

        // filter widget: Set this option to true to hide the filter row
        // initially. The rows is revealed by hovering over the filter
        // row or giving any filter input/select focus.
        filter_hideFilters: false,

        // filter widget: Set this option to false to keep the searches
        // case sensitive
        filter_ignoreCase: true,

        // filter widget: jQuery selector string of an element used to
        // reset the filters.
        filter_reset: null,

        // Delay in milliseconds before the filter widget starts searching;
        // This option prevents searching for every character while typing
        // and should make searching large tables faster.
        filter_searchDelay: 300,

        // Set this option to true if filtering is performed on the server-side.
        filter_serversideFiltering: false,

        // filter widget: Set this option to true to use the filter to find
        // text from the start of the column. So typing in "a" will find
        // "albert" but not "frank", both have a's; default is false
        filter_startsWith: false,

        // filter widget: If true, ALL filter searches will only use parsed
        // data. To only use parsed data in specific columns, set this option
        // to false and add class name "filter-parsed" to the header
        filter_useParsedData: false,

        // Resizable widget: If this option is set to false, resized column
        // widths will not be saved. Previous saved values will be restored
        // on page reload
        resizable: true,

        // saveSort widget: If this option is set to false, new sorts will
        // not be saved. Any previous saved sort will be restored on page
        // reload.
        saveSort: true,

        // stickyHeaders widget: css class name applied to the sticky header
        stickyHeaders: "tablesorter-stickyHeader"

    },

    // *** CALLBACKS ***
    // function called after tablesorter has completed initialization
    initialized: function (table) {},

    // *** CSS CLASS NAMES ***
    tableClass: 'tablesorter',
    cssAsc: "tablesorter-headerSortUp",
    cssDesc: "tablesorter-headerSortDown",
    cssHeader: "tablesorter-header",
    cssHeaderRow: "tablesorter-headerRow",
    cssIcon: "tablesorter-icon",
    cssChildRow: "tablesorter-childRow",
    cssInfoBlock: "tablesorter-infoOnly",
    cssProcessing: "tablesorter-processing",

    // *** SELECTORS ***
    // jQuery selectors used to find the header cells.
    selectorHeaders: '> thead th, > thead td',

    // jQuery selector of content within selectorHeaders
    // that is clickable to trigger a sort.
    selectorSort: "th, td",

    // rows with this class name will be removed automatically
    // before updating the table cache - used by "update",
    // "addRows" and "appendCache"
    selectorRemove: "tr.remove-me",

    // *** DEBUGING ***
    // send messages to console
    debug: false

}).tablesorterPager({
    
    // target the pager markup - see the HTML block below
    container: $(".pager_preview"),

    // use this url format "http:/mydatabase.com?page={page}&size={size}"
    ajaxUrl: null,

    // process ajax so that the data object is returned along with the
    // total number of rows; example:
    // {
    //   "data" : [{ "ID": 1, "Name": "Foo", "Last": "Bar" }],
    //   "total_rows" : 100
    // }
    ajaxProcessing: function(ajax) {
        if (ajax && ajax.hasOwnProperty('data')) {
            // return [ "data", "total_rows" ];
            return [ajax.data, ajax.total_rows];
        }
    },

    // output string - default is '{page}/{totalPages}';
    // possible variables:
    // {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
    output: '{startRow} to {endRow} ({totalRows})',

    // apply disabled classname to the pager arrows when the rows at
    // either extreme is visible - default is true
    updateArrows: true,

    // starting page of the pager (zero based index)
    page: 0,

    // Number of visible rows - default is 10
    size: 10,

    // if true, the table will remain the same height no matter how many
    // records are displayed. The space is made up by an empty
    // table row set to a height to compensate; default is false
    fixedHeight: true,

    // remove rows from the table to speed up the sort of large tables.
    // setting this to false, only hides the non-visible rows; needed
    // if you plan to add/remove rows with the pager enabled.
    removeRows: false,

    // css class names of pager arrows
    // next page arrow
    cssNext: '.next',
    // previous page arrow
    cssPrev: '.prev',
    // go to first page arrow
    cssFirst: '.first',
    // go to last page arrow
    cssLast: '.last',
    // select dropdown to allow choosing a page
    cssGoto: '.gotoPage',
    // location of where the "output" is displayed
    cssPageDisplay: '.pagedisplay',
    // dropdown that sets the "size" option
    cssPageSize: '.pagesize',
    // class added to arrows when at the extremes
    // (i.e. prev/first arrows are "disabled" when on the first page)
    // Note there is no period "." in front of this class name
    cssDisabled: 'disabled'

});

$('#results_rdi').tablesorter({

    // *** APPEARANCE ***
    // Add a theme - try 'blackice', 'blue', 'dark', 'default'
    //  'dropbox', 'green', 'grey' or 'ice'
    // to use 'bootstrap' or 'jui', you'll need to add the "uitheme"
    // widget and also set it to the same name
    // this option only adds a table class name "tablesorter-{theme}"
    theme: 'blue',

    // fix the column widths
    widthFixed: false,

    // Show an indeterminate timer icon in the header when the table
    // is sorted or filtered
    showProcessing: false,

    // header layout template (HTML ok); {content} = innerHTML,
    // {icon} = <i/> (class from cssIcon)
    headerTemplate: '{content}',

    // return the modified template string
    onRenderTemplate: null, // function(index, template){ return template; },

    // called after each header cell is rendered, use index to target the column
    // customize header HTML
    onRenderHeader: function (index) {
        // the span wrapper is added by default
        $(this).find('div.tablesorter-header-inner').addClass('roundedCorners');
    },

    // *** FUNCTIONALITY ***
    // prevent text selection in header
    cancelSelection: true,

    // other options: "ddmmyyyy" & "yyyymmdd"
    dateFormat: "mmddyyyy",

    // The key used to select more than one column for multi-column
    // sorting.
    sortMultiSortKey: "shiftKey",

    // key used to remove sorting on a column
    sortResetKey: 'ctrlKey',

    // false for German "1.234.567,89" or French "1 234 567,89"
    usNumberFormat: true,

    // If true, parsing of all table cell data will be delayed
    // until the user initializes a sort
    delayInit: false,

    // if true, server-side sorting should be performed because
    // client-side sorting will be disabled, but the ui and events
    // will still be used.
    serverSideSorting: false,

    // *** SORT OPTIONS ***
    // These are detected by default,
    // but you can change or disable them
    // these can also be set using data-attributes or class names
    headers: {
        // set "sorter : false" (no quotes) to disable the column
        0: {
            sorter: "digit"
        },
        1: {
            sorter: "text"
        },
        3: {
            sorter: "text"
        }
    },

    // ignore case while sorting
    ignoreCase: true,

    // forces the user to have this/these column(s) sorted first
    sortForce: null,
    // initial sort order of the columns, example sortList: [[0,0],[1,0]],
    // [[columnIndex, sortDirection], ... ]
    sortList: [
        [0,0]
    ],
    // default sort that is added to the end of the users sort
    // selection.
    sortAppend: null,

    // starting sort direction "asc" or "desc"
    sortInitialOrder: "asc",

    // Replace equivalent character (accented characters) to allow
    // for alphanumeric sorting
    sortLocaleCompare: false,

    // third click on the header will reset column to default - unsorted
    sortReset: false,

    // restart sort to "sortInitialOrder" when clicking on previously
    // unsorted columns
    sortRestart: false,

    // sort empty cell to bottom, top, none, zero
    emptyTo: "bottom",

    // sort strings in numerical column as max, min, top, bottom, zero
    stringTo: "max",

    // extract text from the table - this is how is
    // it done by default
    textExtraction: {
        0: function (node) {
            return $(node).text();
        },
        1: function (node) {
            return $(node).text();
        }
    },

    // use custom text sorter
    // function(a,b){ return a.sort(b); } // basic sort
    textSorter: null,

    // *** WIDGETS ***

    // apply widgets on tablesorter initialization
    initWidgets: true,

    // include zebra and any other widgets, options:
    // 'columns', 'filter', 'stickyHeaders' & 'resizable'
    // 'uitheme' is another widget, but requires loading
    // a different skin and a jQuery UI theme.
    widgets: ['zebra', 'columns'],

    widgetOptions: {

        // zebra widget: adding zebra striping, using content and
        // default styles - the ui css removes the background
        // from default even and odd class names included for this
        // demo to allow switching themes
        // [ "even", "odd" ]
        zebra: [
            "ui-widget-content even",
            "ui-state-default odd"],

        // uitheme widget: * Updated! in tablesorter v2.4 **
        // Instead of the array of icon class names, this option now
        // contains the name of the theme. Currently jQuery UI ("jui")
        // and Bootstrap ("bootstrap") themes are supported. To modify
        // the class names used, extend from the themes variable
        // look for the "$.extend($.tablesorter.themes.jui" code below
        uitheme: 'jui',

        // columns widget: change the default column class names
        // primary is the 1st column sorted, secondary is the 2nd, etc
        columns: [
            "primary",
            "secondary",
            "tertiary"],

        // columns widget: If true, the class names from the columns
        // option will also be added to the table tfoot.
        columns_tfoot: true,

        // columns widget: If true, the class names from the columns
        // option will also be added to the table thead.
        columns_thead: true,

        // filter widget: If there are child rows in the table (rows with
        // class name from "cssChildRow" option) and this option is true
        // and a match is found anywhere in the child row, then it will make
        // that row visible; default is false
        filter_childRows: false,

        // filter widget: If true, a filter will be added to the top of
        // each table column.
        filter_columnFilters: true,

        // filter widget: css class applied to the table row containing the
        // filters & the inputs within that row
        filter_cssFilter: "tablesorter-filter",

        // filter widget: Customize the filter widget by adding a select
        // dropdown with content, custom options or custom filter functions
        // see http://goo.gl/HQQLW for more details
        filter_functions: null,

        // filter widget: Set this option to true to hide the filter row
        // initially. The rows is revealed by hovering over the filter
        // row or giving any filter input/select focus.
        filter_hideFilters: false,

        // filter widget: Set this option to false to keep the searches
        // case sensitive
        filter_ignoreCase: true,

        // filter widget: jQuery selector string of an element used to
        // reset the filters.
        filter_reset: null,

        // Delay in milliseconds before the filter widget starts searching;
        // This option prevents searching for every character while typing
        // and should make searching large tables faster.
        filter_searchDelay: 300,

        // Set this option to true if filtering is performed on the server-side.
        filter_serversideFiltering: false,

        // filter widget: Set this option to true to use the filter to find
        // text from the start of the column. So typing in "a" will find
        // "albert" but not "frank", both have a's; default is false
        filter_startsWith: false,

        // filter widget: If true, ALL filter searches will only use parsed
        // data. To only use parsed data in specific columns, set this option
        // to false and add class name "filter-parsed" to the header
        filter_useParsedData: false,

        // Resizable widget: If this option is set to false, resized column
        // widths will not be saved. Previous saved values will be restored
        // on page reload
        resizable: true,

        // saveSort widget: If this option is set to false, new sorts will
        // not be saved. Any previous saved sort will be restored on page
        // reload.
        saveSort: true,

        // stickyHeaders widget: css class name applied to the sticky header
        stickyHeaders: "tablesorter-stickyHeader"

    },

    // *** CALLBACKS ***
    // function called after tablesorter has completed initialization
    initialized: function (table) {},

    // *** CSS CLASS NAMES ***
    tableClass: 'tablesorter',
    cssAsc: "tablesorter-headerSortUp",
    cssDesc: "tablesorter-headerSortDown",
    cssHeader: "tablesorter-header",
    cssHeaderRow: "tablesorter-headerRow",
    cssIcon: "tablesorter-icon",
    cssChildRow: "tablesorter-childRow",
    cssInfoBlock: "tablesorter-infoOnly",
    cssProcessing: "tablesorter-processing",

    // *** SELECTORS ***
    // jQuery selectors used to find the header cells.
    selectorHeaders: '> thead th, > thead td',

    // jQuery selector of content within selectorHeaders
    // that is clickable to trigger a sort.
    selectorSort: "th, td",

    // rows with this class name will be removed automatically
    // before updating the table cache - used by "update",
    // "addRows" and "appendCache"
    selectorRemove: "tr.remove-me",

    // *** DEBUGING ***
    // send messages to console
    debug: false

}).tablesorterPager({
    
    // target the pager markup - see the HTML block below
    container: $(".pager_rdi"),

    // use this url format "http:/mydatabase.com?page={page}&size={size}"
    ajaxUrl: null,

    // process ajax so that the data object is returned along with the
    // total number of rows; example:
    // {
    //   "data" : [{ "ID": 1, "Name": "Foo", "Last": "Bar" }],
    //   "total_rows" : 100
    // }
    ajaxProcessing: function(ajax) {
        if (ajax && ajax.hasOwnProperty('data')) {
            // return [ "data", "total_rows" ];
            return [ajax.data, ajax.total_rows];
        }
    },

    // output string - default is '{page}/{totalPages}';
    // possible variables:
    // {page}, {totalPages}, {startRow}, {endRow} and {totalRows}
    output: '{startRow} to {endRow} ({totalRows})',

    // apply disabled classname to the pager arrows when the rows at
    // either extreme is visible - default is true
    updateArrows: true,

    // starting page of the pager (zero based index)
    page: 0,

    // Number of visible rows - default is 10
    size: 10,

    // if true, the table will remain the same height no matter how many
    // records are displayed. The space is made up by an empty
    // table row set to a height to compensate; default is false
    fixedHeight: true,

    // remove rows from the table to speed up the sort of large tables.
    // setting this to false, only hides the non-visible rows; needed
    // if you plan to add/remove rows with the pager enabled.
    removeRows: false,

    // css class names of pager arrows
    // next page arrow
    cssNext: '.next',
    // previous page arrow
    cssPrev: '.prev',
    // go to first page arrow
    cssFirst: '.first',
    // go to last page arrow
    cssLast: '.last',
    // select dropdown to allow choosing a page
    cssGoto: '.gotoPage',
    // location of where the "output" is displayed
    cssPageDisplay: '.pagedisplay',
    // dropdown that sets the "size" option
    cssPageSize: '.pagesize',
    // class added to arrows when at the extremes
    // (i.e. prev/first arrows are "disabled" when on the first page)
    // Note there is no period "." in front of this class name
    cssDisabled: 'disabled'

});
$('table')
    .tablesorter()
// bind to sort events
    .bind('tablesorter-ready', function(e, table) {
        // do something after the 'refreshWidgets' has refreshed
        //drawPowerChart();
        if (typeof drawCharts === 'function') {
            drawCharts();
        }
        //drawCompareCharts();
    });


$(document).ready(function() {
    console.log('Document is ready');
    // if(!is_power) {
    //     $('.power-content').hide();
    // }
    $('#resultSelectionForm').submit(function(event) {
        event.preventDefault(); // This will cancel the form submission

        // Your custom logic here
        //console.log('Form submission canceled.');
        var category = $('#category option:selected').val();
        var division = $('#division option:selected').val();
        var with_power = $('#with_power option:selected').map(function() {
            return $(this).val();
        }).get();
        console.log(category);
        console.log(division);
        console.log(with_power[0]);
        var data;
        readAllData().then(function(allData) {
            console.log(allData);
            reConstructTables(category, division, with_power[0], allData);
        }).catch(function(error) {
            console.error(error);
        });
      }
    );

        fetchSummaryData();
});

function reConstructTables(category, division, with_power, data){
    availabilities = [ "Available", "Preview", "RDI" ]; 
    var html = ``;
    var tableposhtml = `
<!-- pager -->
<div class="pager PAGER_CLASS">
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
</div>`
    availabilities.forEach(function(availability) {
        // filtered data as per the user choice
        const filteredResults = filterData(category, division, with_power, availability, data);
        console.log(filteredResults.length);
        var html_table = constructTable(category, division, with_power, availability, data);
        // replacing the old table with the newly constructed one
        var elemId = `results_${availability.toLowerCase()}` 
        console.log(elemId)
        if (html_table) {
            document.getElementById(elemId).innerHTML = html_table;
            $('table').tablesorter();
            $("table").trigger("updateAll");
        }
        // let pager_class = `pager_${availability.toLowerCase()}`;
        // let tableposhtmlval = tableposhtml.replace("PAGER_CLASS", pager_class);
        // if (html_table) {
        //     html += `
        //     <h2>${category} Category: ${availability} submissions in ${division} division</h2>
        //     ${tableposhtmlval}
        //     ${html_table}
        //     ${tableposhtmlval}
        //     <hr>
        //     `;
        // }
    });
}

function constructTable(category, division, with_power, availability, data) {
    let html = ``;
    // Table header
    html += `<thead> <tr>`
    let tableheader = `
        <th id="col-id" class="headcol col-id">ID</th>
        <th id="col-system" class="headcol col-system">System</th>
        <th id="col-submitter" class="headcol col-submitter">Submitter</th>
        <th id="col-accelerator" class="headcol col-accelerator">Accelerator</th>
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
    </tr>
    <tr>
        <th class="headcol col-id"></th>
        <th class="headcol col-system"></th>
        <th class="headcol col-submitter"></th>
        <th class="headcol col-accelerator"></th>
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
    `;
    html += tableheader;
    html += `</tr></thead>`
    html += `<tfoot> <tr>${tableheader}</tr></tfoot>`;
    console.log("here")
    var mydata = processData(data, category, division, availability)
    if (!Object.keys(mydata).length) {
        return null; // return if mydata is null
    }

    let location_pre = `https://github.com/mlcommons/inference_results_v4.0/tree/main/`;
    let result_link_text = ``;

    for (let rid in mydata) {
        let extra_sys_info = `
            Processor: ${mydata[rid].Processor}
            Software: ${mydata[rid].Software}
            Cores per processor: ${mydata[rid].host_processor_core_count}
            Processors per node: ${mydata[rid].host_processors_per_node}
            Nodes: ${mydata[rid].Nodes}
            Notes: ${mydata[rid].Notes}
        `;

        let a_num = mydata[rid]['a#'] || '';
        let acc = a_num === '' ? "" : `${mydata[rid].Accelerator} x ${parseInt(a_num)}`;
        let system_json_link = mydata[rid].Details.replace("results", "systems").replace("submissions_inference_4.0", "inference_results_v4.0") + ".json";
        html += `
        <tr>
            <td class="col-id headcol"> ${rid} </td>
            <td class="col-system headcol" title="${extra_sys_info}"> <a target="_blank" href="${system_json_link}"> ${mydata[rid].System} </a> </td>
            <td class="col-submitter headcol"> ${mydata[rid].Submitter} </td>
            <td class="col-accelerator headcol"> ${acc} </td>
        `;
        const models = ["resnet", "retinanet", "bert-99", "bert-99.9", "gptj-99", "gptj-99.9", "llama2-70b-99", "llama2-70b-99.9", "stable-diffusion-xl", "dlrm-v2-99", "dlrm-v2-99.9", "3d-unet-99", "3d-unet-99.9"];
        models.forEach(m => {
            if (mydata[rid][m]) {
                if (mydata[rid][m].Server) {
                    let github_server_url = `${location_pre}${mydata[rid][m].Server.Location.replace("results", "measurements")}/`;
                    // A temporary key value from summary_results.json is taken as server_precision_info
                    // To be included in summary_results.json
                    let server_precision_info = mydata[rid][m].Server.compliance;
                    let extra_model_info = `Weight data types: ${server_precision_info}
Input data types: ${server_precision_info}`;
                    html += `
                        <td class="col-result"><a target="_blank" title="${result_link_text}${extra_model_info}" href="${location_pre}${mydata[rid][m].Server.Location}"> ${Math.round(mydata[rid][m].Server.Performance_Result * 10) / 10} </a> </td>
                    `;
                }
                let github_offline_url = `${location_pre}${mydata[rid][m].Offline.Location.replace("results", "measurements")}/`;
                // A temporary key value from summary_results.json is taken as server_precision_info
                // To be included in summary_results.json
                let offline_precision_info = mydata[rid][m].Offline.compliance;
                let extra_model_info = `Weight data types: ${offline_precision_info}
Input data types: ${offline_precision_info}`;
            
                html += `
                    <td class="col-result"><a target="_blank" title="${result_link_text}${extra_model_info}" href="${location_pre}${mydata[rid][m].Offline.Location}"> ${Math.round(mydata[rid][m].Offline.Performance_Result * 10) / 10} </a> </td>
                `;
            }else {
                html += `<td></td>`;
                if (!m.includes("3d-unet")) {
                    html += `<td></td>`;
                }
            }
        });
        html += `</tr>`;
    }
    // html += "</table>";
    
    console.log(html)

    return html
}



    
//     data.forEach(item => {
//         console.log(item.ID)
//         let extra_sys_info = `
//             Processor: ${item.Processor}
//             Software: ${item.Software}
//             Cores per processor: ${item.host_processor_core_count}
//             Processors per node: ${item.host_processors_per_node}
//             Nodes: ${item.Nodes}
//             Notes: ${item.Notes}
//         `;
//         let a_num = item['a#'] || '';
//         let acc = a_num === '' ? "" : `${item.Accelerator} x ${parseInt(a_num)}`;
//         let system_json_link = item.Details.replace("results", "systems").replace("submissions_inference_4.0", "inference_results_v4.0") + ".json";
//         html += `
//         <tr>
//             <td class="col-id headcol"> ${item.ID} </td>
//             <td class="col-system headcol" title="${extra_sys_info}"> <a target="_blank" href="${system_json_link}"> ${item.System} </a> </td>
//             <td class="col-submitter headcol"> ${item.Submitter} </td>
//             <td class="col-accelerator headcol"> ${acc} </td>
//         `;
//         const models = ["resnet", "retinanet", "bert-99", "bert-99.9", "gptj-99", "gptj-99.9", "llama2-70b-99", "llama2-70b-99.9", "stable-diffusion-xl", "dlrm-v2-99", "dlrm-v2-99.9", "3d-unet-99", "3d-unet-99.9"];
//         /////
//         models.forEach(m => {
//             if (item.Model === m) {
//                 if (item.Scenario === "Server") {
//                     let github_server_url = `${location_pre}${item.Location.replace("results", "measurements")}/`;
//                     // A temporary key value from summary_results.json is taken as server_precision_info
//                     // To be included in summary_results.json
//                     let server_precision_info = item.compliance;
//                     let extra_model_info = `Weight data types: ${server_precision_info}
// Input data types: ${server_precision_info}`;
                    
//                     html += `
//                         <td class="col-result"><a target="_blank" title="${result_link_text}${extra_model_info}" href="${location_pre}${item.Location}"> ${Math.round(item.Performance_Result * 10) / 10} </a> </td>
//                     `;
//                 }
//                 let github_offline_url = `${location_pre}${item.Location.replace("results", "measurements")}/`;
//                 // A temporary key value from summary_results.json is taken as server_precision_info
//                 // To be included in summary_results.json
//                 let offline_precision_info = item.compliance;
//                 let extra_model_info = `Weight data types: ${offline_precision_info}
// Input data types: ${offline_precision_info}`;
                
//                 html += `
//                 <td class="col-result"><a target="_blank" title="${result_link_text}${extra_model_info}" href="${location_pre}${item[m].Offline.Location}"> ${Math.round(item.Performance_Result * 10) / 10} </a> </td>
//                 `;
//             } else {
//                 html += `<td></td>`;
//                 if (!m.includes("3d-unet")) {
//                     html += `<td></td>`;
//                 }
//             }
//         });

//         html += `</tr>`;
//     });



function processData(data, category, division, availability) {
    const myData = {};
    const neededKeysModel = ["has_power", "Performance_Result", "Performance_Units", "Accuracy", "Location"];
    const neededKeysSystem = ["System", "Submitter", "Availability", "Category", "Accelerator", "a#", "Nodes", "Processor", "host_processors_per_node", "host_processor_core_count", "Notes", "Software", "Details", "Platform"];
    
    data.forEach(item => {
        if (item.Suite !== category.toLowerCase()) {
            return;
        }
        if (item.Category !== division.toLowerCase()) {
            return;
        }
        if (item.Availability !== availability.toLowerCase()) {
            return;
        }

        const myId = item.ID;
        if (!myData[myId]) {
            myData[myId] = {};
        }

        const model = item.Model;
        if (!myData[myId][model]) {
            myData[myId][model] = {};
        }

        const scenario = item.Scenario;
        if (!myData[myId][model][scenario]) {
            myData[myId][model][scenario] = {};
        }

        myData[myId][model][scenario].has_power = item.has_power;
        if (item.has_power && item.Power_Result) {
            myData[myId][model][scenario].Power_Result = item.Power_Result;
            myData[myId][model][scenario].Power_Units = item.Power_Units;
        }

        neededKeysModel.forEach(key => {
            myData[myId][model][scenario][key] = item[key];
        });

        neededKeysSystem.forEach(key => {
            myData[myId][key] = item[key];
        });
    });
    return myData;
}


// function to filter data in according to the user selection
function filterData(category, division, with_power, availability, data) {
    const result = []; // Initialize an empty object to hold the filtered results

    data.forEach(item => {
        // the key value pair mapping in summary_results.json is a bit different. please refer to it.
        console.log(`category is: ${item.Category} and division is ${typeof with_power}`);
        const categoryMatch = item.Category === division.toLowerCase();
        const divisionMatch = item.Suite === category.toLowerCase(); 
        const availabilityMatch = item.Availability == availability.toLowerCase();
        // Determine if the item should be included based on with_power
        let powerMatch;
        if (with_power === "true") {
            powerMatch = item.hasOwnProperty('Power_Result'); // Check for the key
        } else {
            powerMatch = !item.hasOwnProperty('Power_Result'); // Check for absence of the key
        }

        // If all conditions match, add the item to the result object
        if (categoryMatch && divisionMatch && powerMatch && availabilityMatch) {
            result.push({ ...item }); // Use spread operator to copy the item
        }
    });

    return result;
}

function fetchSummaryData() {
    // Open (or create) the database
    var request = indexedDB.open("MyDatabase", 1);

    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        // Create an object store named "myStore" with "Location" as the keyPath
        if (!db.objectStoreNames.contains("myStore")) {
            var objectStore = db.createObjectStore("myStore", { autoIncrement: true });
        }
        fetchAndStoreData(db);
    };

    request.onsuccess = function(event) {
        var db = event.target.result;

        // Fetch the JSON data from the URL and store it in IndexedDB
        //fetchAndStoreData(db);
    };

    request.onerror = function(event) {
        console.error("Error opening IndexedDB: " + event.target.errorCode);
    };
}

function fetchAndStoreData(db) {
    $.getJSON("https://raw.githubusercontent.com/GATEOverflow/inference_results_v4.0/main/summary_results.json", function(data) {
        // Begin a transaction to save data in IndexedDB
        var transaction = db.transaction(["myStore"], "readwrite");
        var objectStore = transaction.objectStore("myStore");

        var count = 0;
        for(i = 0; i < data.length; i++) {
            item = data[i];
            var request = objectStore.add(item);
            request.onsuccess = function(event) {
                if(i % 1000 === 0)
                console.log("Data has been added to your database, record:", i+1);
            };

            request.onerror = function(event) {
                //console.error("Error adding data: " + event.target.errorCode+ event.target);
                //console.log(item);
            };
        }

        transaction.oncomplete = function() {
            console.log("All data has been successfully added to IndexedDB.");
        };

        transaction.onerror = function(event) {
           // console.error("Transaction error: " + event.target.errorCode);
        };
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
    });
}

// read all data from database
function readAllData() {
    return new Promise((resolve, reject) => {
        // Open the database
        var request = indexedDB.open("MyDatabase", 1);

        request.onsuccess = function(event) {
            var db = event.target.result;
            var transaction = db.transaction(["myStore"], "readonly");
            var objectStore = transaction.objectStore("myStore");

            // Open a cursor to iterate through all records
            var data = [];
            var cursorRequest = objectStore.openCursor();

            cursorRequest.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    data.push(cursor.value); // Push each record to the data array
                    cursor.continue(); // Move to the next record
                } else {
                    resolve(data); // Resolve the promise with the data array when done
                }
            };

            cursorRequest.onerror = function(event) {
                reject("Error reading data: " + event.target.errorCode);
            };
        };

        request.onerror = function(event) {
            reject("Error opening IndexedDB: " + event.target.errorCode);
        };
    });
}

// Extend the themes to change any of the default class names ** NEW **
$.extend($.tablesorter.themes.jui, {
    // change default jQuery uitheme icons - find the full list of icons
    // here: http://jqueryui.com/themeroller/ (hover over them for their name)
    table: 'ui-widget ui-widget-content ui-corner-all', // table classes
    header: 'ui-widget-header ui-corner-all ui-state-default', // header classes
    icons: 'ui-icon', // icon class added to the <i> in the header
    sortNone: 'ui-icon-carat-2-n-s',
    sortAsc: 'ui-icon-carat-1-n',
    sortDesc: 'ui-icon-carat-1-s',
    active: 'ui-state-active', // applied when column is sorted
    hover: 'ui-state-hover', // hover class
    filterRow: '',
    even: 'ui-widget-content', // even row zebra striping
    odd: 'ui-state-default' // odd row zebra striping
});
