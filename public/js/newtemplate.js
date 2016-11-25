var data_sources = [];
var report_def = {};
$(document).ready(function() {
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
                id: selectedDataSources[i],
                name: selectedDataSources[i],
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


    report_def = newJsonDesigner;
    data_sources = newDataSources;


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
        refreshNewPreview(report_def);
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
