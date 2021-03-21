//Table的清單,要修改Table的話修改這裡
var TableList = [
    { Table: "AppGrid", TableName: "表格" },
    { Table: "Chart1", TableName: "圖表一" },
    { Table: "Chart2", TableName: "圖表二" },
    { Table: "Chart3", TableName: "圖表三" },
    { Table: "Chart4", TableName: "圖表四" }
];

$(document).ready(function () {
    //初次產生AppGrid框架
    $("#AppGrid_Chart").kendoGrid({
        height: 540,
        sortable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "AppName", title: "APP名稱", width: "34%" },
            { field: "Category", title: "APP類別", width: "33%" },
            { field: "InstallsRange", title: "平均下載範圍", width: "33%" },
            /*
            { field: "Rating", title: "平均評分", hidden: true },
            { field: "RatingCount", title: "評分數量", width: "10%" },
            { field: "InstallsCount", title: "下載數量", width: "24%" },
            { field: "Free", title: "APP是免費還是付費", width: "10%" },
            { field: "Price", title: "APP價格", width: "8%" },
            { field: "Size", title: "APP檔案大小", width: "8%" },
            */
        ],
    });

    //一開始先隱藏圖表區塊
    for (var i = 0; i < TableList.length; i++) {
        $("#" + TableList[i].Table).hide();
    }
});

//產生AppNameAutoComplete
for (var i = 0; i < TableList; i++) {
    $("#AppName ." + TableList[i].Table).kendoAutoComplete({
        dataSource: {
            transport: {
                read: {
                    url: "/AppMarketingAnalysis/AutoCompleteAppName",
                    type: "post",
                    dataType: "json",
                }
            }
        },
        filter: "startswith",
        autoWidth: true,
        height: 100,
    });
}

//選擇圖表清單按鈕
function SelectedTable(table) {
    var TableId = table.id.substring(4, table.id.length);
    //選擇到的Table顯示,未選擇的Table隱藏
    for (var i = 0; i < TableList.length; i++) {
        if (TableList[i].Table == TableId) {
            $("#" + TableList[i].Table).show();
        } else {
            $("#" + TableList[i].Table).hide();
        }
    }
}

/////**AppGrid區 Start**/////
//AppGrid的查詢按鈕
$(".AppGrid #Search").click(function () {
    var amad = {   //整合輸入的資料
        APP_NAME: $("#AppName").val(), //命名須與model的名稱相同
        CATEGORY: $("#Category").data("kendoDropDownList").value(),
        INSTALLS_RANGE: $("#InstallsRange").data("kendoDropDownList").value(),
    };
    var target = "AppGrid";
    $.ajax({
        url: "/AppMarketingAnalysis/GetAppSearch",
        dataType: "json",
        data: { amad, target},    //將此資料傳入Models.AppMarketingAnalysisData
        type: "post",
    }).done(function (searchResult) { 
        //AppGrid接收資料
        alert("success");
        GetAppGrid(searchResult);
    });
});

//AppGrid接收資料
function GetAppGrid(searchResult) {
    var dataSource = new kendo.data.DataSource({
        data: searchResult,
        schema: {
            model: {
                fields: {
                    APP_NAME: { type: "string" },
                    CATEGIRY: { type: "string" },
                    INSTALLS_RANGE: { type: "string" },
                }
            }
        },
        pageSize: 20,
        sort: { field: "APP_NAME", dir: "desc" }   //排序
    });
    $("#AppGrid_Chart").data("kendoGrid").setDataSource(dataSource);

    //判斷是否有資料
    if ($("#AppGrid_Chart").data("kendoGrid").dataSource.data().length == 0) {
        $("#AppGrid_Chart").hide();  //隱藏Grid
    }
    else {
        $("#AppGrid_Chart").show();  //顯示Grid
    }
    $("#AppGrid_Chart").data("kendoGrid").refresh();  //刷新Grid
}

/*
//選取gridview function
function AppDetail(e) {
    var row = $(e.target).closest("tr"); //被選取的row
    var selectedId = $("#AppGrid").data("kendoGrid").dataItem(row).APP_SORT;//被選取的row的APP_SORT
    window.location.href = "/AppMarketingAnalysis/AppDetailView?id=" + selectedId;
};
*/
/////**AppGrid區 End**/////

/////**Chart1區 Start**/////
/////**Chart1區 End**/////

/////**Chart2區 Start**/////
/////**Chart2區 End**/////

/////**Chart3區 Start**/////
/////**Chart3區 End**/////

/////**Chart4區 Start**/////
/////**Chart4區 End**/////