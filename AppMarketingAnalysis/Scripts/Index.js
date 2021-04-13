//SelectedOpt的清單,要修改SelectedOpt的話記得這裡也要修改
var SelectedOpt = ["AppName", "Category", "Rating",
    "RatingCount", "InstallsRange", "InstallsCount",
    "Free", "Price", "Size", "MinAndroid", "DeveloperId",
    "Released", "LastUpdated", "ContentRating",
    "AdSupported", "InAppPurchases", "EditorChoice"];

//Table的清單,要修改Table的話記得這裡也要修改
var TableList = [
    {
        Table: "AppGrid", TableName: "表格", SelectedOpt: ["AppName", "Category", "Rating",
            "RatingCount", "InstallsRange", "InstallsCount",
            "Free", "Price", "Size", "MinAndroid", "DeveloperId",
            "Released", "LastUpdated", "ContentRating",
            "AdSupported", "InAppPurchases", "EditorChoice"]},
    { Table: "Chart1", TableName: "圖表一", SelectedOpt: ["AppName", "InstallsRange", "Free", "", ""]},
    { Table: "Chart2", TableName: "圖表二", SelectedOpt: ["AppName", "Size", "", "", ""]},
    { Table: "Chart3", TableName: "圖表三", SelectedOpt: ["AppName", "InstallsRange", "", "", ""]},
    { Table: "Chart4", TableName: "圖表四", SelectedOpt: ["AppName", "Size", "", "", ""]},
    { Table: "Chart5", TableName: "圖表五", SelectedOpt: ["AppName", "InstallsRange", "Free", "Price", ""]}
];

$(document).ready(function () {
    /************ 範例Start ***********/
    var SU = ["MinSizeUnit", "MaxSizeUnit"];     //下拉選單清單
    for (var su_v = 0; su_v < SU.length; su_v++) {
        $("#" + SU[su_v]).kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: [
                { Text: "KB", Value: "k" },
                { Text: "MB", Value: "m" },
                { Text: "GB", Value: "g" }
            ],
            filter: "startswith",
            autoWidth: true,
        });
    }
    var DDL = ["Category", "InstallsRange"];     //下拉選單清單
    for (var b = 0; b < DDL.length; b++) {
        $("#" + DDL[b]).kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: [
                { Text: "Black", Value: "1" },
                { Text: "Orange", Value: "2" },
                { Text: "Grey", Value: "3" }
            ],
            filter: "startswith",
            optionLabel: '請選擇',
            autoWidth: true,
        });
    }
    var NTB1 = ["MinPrice", "MaxPrice"];
    for (var d = 0; d < NTB1.length; d++) {
        $("#" + NTB1[d]).kendoNumericTextBox({
            format: "c",
            min: 0,
            decimals: 2,
            step: 0.01,
        });
    }

    var NTB2 = ["MinSize", "MaxSize"];
    for (var e = 0; e < NTB2.length; e++) {
        $("#" + NTB2[e]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 1,
            step: 0.1,
        });
    }
    
    var CB = ["Free", "AdSupported", "InAppPurchases", "EditorChoice"];     //CheckBox清單
    for (var c = 0; c < CB.length; c++) {
        $("#" + CB[c]).kendoCheckBoxGroup({
            items: ["True", "False"],
            layout: "horizontal",
            labelPosition: "after",
            value: ["True", "False"]
        }).data("kendoCheckBoxGroup");
    }
    /************ 範例End ***********/
    //初次產生AppGrid框架
    $("#AppGrid").kendoGrid({
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

    //一開始先隱藏圖表區塊與篩選條件區塊
    for (var i = 0; i < TableList.length; i++) {
        $("#" + TableList[i].Table).hide();
        $("#SelectedOption").hide();
        $("#Chart_Selected").hide();
    }
});

//篩選條件縮放按鈕
$("#Btn_SelectedOption").click(function () {
    if ($("#Chart_Selected").is(":visible")) {
        $("#Btn_SelectedOptionIcon").html("&#9660");
        $("#Chart_Selected").hide();
    } else {
        $("#Btn_SelectedOptionIcon").html("&#9650");
        $("#Chart_Selected").show();
    }
});

//選擇圖表清單按鈕
function SelectedTable(table) {
    $(".bb").css("background-color", "#F0F0F0");
    $("#" + table.id).css("background-color", "#97CBFF");
    $("#SelectedOption").show();
    var TableId = table.id.substring(4, table.id.length);
    //選擇到的Table顯示,未選擇的Table隱藏
    for (var i = 0; i < TableList.length; i++) {
        if (TableList[i].Table == TableId) {
            $("#" + TableList[i].Table).show();
            //選擇到的Table需要的篩選條件顯示, 不需要的篩選條件隱藏
            for (var j = 0; j < SelectedOpt.length; j++) {
                if ($.inArray(SelectedOpt[j], TableList[i].SelectedOpt) > -1) {
                    $("#Div_" + SelectedOpt[j]).show();
                } else {
                    $("#Div_" + SelectedOpt[j]).hide();
                }
            }
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
    $("#AppGrid").data("kendoGrid").setDataSource(dataSource);

    //判斷是否有資料
    if ($("#AppGrid").data("kendoGrid").dataSource.data().length == 0) {
        $("#AppGrid").hide();  //隱藏Grid
    }
    else {
        $("#AppGrid").show();  //顯示Grid
    }
    $("#AppGrid").data("kendoGrid").refresh();  //刷新Grid
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

//APPNAME Cate Rating Ratingcount InstallsRange free