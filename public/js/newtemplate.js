var orderData = [{
    "userId": "1X39AN4Z92Y",
    "userName": "John Smith",
    "accountType": "INDIVIDUAL",
    "orderTotal": 19.95,
    "orderDate": "2016-02-24"
}, {
    "userId": "1AC43L30HR8",
    "userName": "Alison Jones",
    "accountType": "BUSINESS",
    "orderTotal": 180.50,
    "orderDate": "2016-02-25"
}, {
    "userId": "1CM499NA94R",
    "userName": "Becky Sanderson",
    "accountType": "BUSINESS",
    "orderTotal": 85.00,
    "orderDate": "2016-02-27"
}];

var orderSchema = {
    fields: [{
        name: "userId",
        type: "text"
    }, {
        name: "userName",
        type: "text"
    }, {
        name: "accountType",
        type: "text"
    }, {
        name: "orderTotal",
        type: "number"
    }, {
        name: "orderDate",
        type: "date"
    }]
};

var data_sources = [{
    "id": "Orders",
    "name": "Orders",
    "data": orderData,
    "schema": orderSchema
}, {
    "id": "Rtos",
    "name": "Rtos",
    "data": GLOBAL_mockData['datas']['rto'],
    "schema": {
        fields: GLOBAL_mockData['schemas']['rto']
    }
}];

$(document).ready(function() {
    //RenderDefaultReport();
    InitialUI();
});

var InitialUI = function() {
    $('#selDatasources')
        .dropdown({
            allowAdditions: true
        });

    $("#btnDesigner").click(function() {
        var selectedDataSources = $('#selDatasources').dropdown('get value');
        //validate
        console.log(selectedDataSources);
        if (!validateSelectDataSources(selectedDataSources))
            return;

        $("#divDataSourceSection").css("display", "none");
        $("#divReportSection").css("display", "inline");


        RenderReportFromSelectDataSource(selectedDataSources);

    })
};

var validateSelectDataSources = function(selectedDataSources) {
    if (selectedDataSources == null)
        return false;

    if (selectedDataSources.length == 0)
        return false;

    for (var i = 0; i < selectedDataSources.length; i++) {
        if (selectedDataSources[i] != null)
            return true;
    }
    return false;
};

var RenderReportFromSelectDataSource = function(selectedDataSources) {
    var newDataSources = [];
    var defaultDataSource = '';
    for (var i = 0; i < selectedDataSources.length; i++) {
        if (isString(selectedDataSources[i])) {
            defaultDataSource = selectedDataSources[i];
            var newDataSource = {
                id: selectedDataSources[i] + 's',
                name: selectedDataSources[i] + 's',
                "data": GLOBAL_mockData['datas'][selectedDataSources[i]],
                "schema": {
                    fields: GLOBAL_mockData['schemas'][selectedDataSources[i]]
                }
            };
            newDataSources.push(newDataSource);
        }
    }
    console.log(newDataSources);
    var newJsonDesigner = GLOBAL_JsonReport;
    newJsonDesigner.body.data_source = defaultDataSource;
    console.log(newJsonDesigner);


    reportdef=newJsonDesigner;
    data_sources=newDataSources;


    renderNewDesigner(newDataSources, newJsonDesigner);
    refreshNewPreview(newJsonDesigner);
};


var renderNewDesigner = function(newDataSources, newJsonDesigner) {
    var designer = new jsreports.Designer({
        embedded: true,
        container: $(".report-designer"),
        data_sources: newDataSources,
        report_def: newJsonDesigner,
        layout: "horizontal"
    });

    $(designer).on("save", function(evt, reportdef) {
        console.log(reportdef);
        report_def = JSON.parse(reportdef);
        //TODO
        //POST TO WEB API
        //update preview
        refreshPreview(report_def);
    });
};




var RenderDefaultReport = function() {

    //$("#divDataSourceSection").css("display", "none");
    //$("#divReportSection").css("display", "inline");


    var report = jsreports.createReport()
        .data('orders')
        .header(1.0)
        .detail(0.3)
        .footer(1.0)
        .done();

    var designer = new jsreports.Designer({
        embedded: true,
        container: $(".report-designer"),
        data_sources: data_sources,
        report_def: report,
        layout: "horizontal"
    });


    $(designer).on("save", function(evt, reportdef) {
        console.log(reportdef)
        preview(reportdef);
    });
};

var refreshNewPreview = function(report_def) {

    $(".report_preview").empty();
    jsreports.render({
        report_def: report_def,
        target: $(".report_preview"),
        datasets: data_sources
    });
};

function isString(o) {
    return typeof o == "string";
}


function preview(reportdef) {
    report_def = JSON.parse(reportdef);
    jsreports.render({
        report_def: report_def,
        target: $(".report_preview"),
        datasets: data_sources
    });
}
