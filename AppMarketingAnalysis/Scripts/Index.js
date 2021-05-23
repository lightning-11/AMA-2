document.write('<script src="/Scripts/AppGrid.js"></script>');
document.write('<script src="/Scripts/chart1.js"></script>');
document.write('<script src="/Scripts/chart2.js"></script>');
document.write('<script src="/Scripts/chart3.js"></script>');
document.write('<script src="/Scripts/chart4_1.js"></script>');
document.write('<script src="/Scripts/chart4_2.js"></script>');
document.write('<script src="/Scripts/chart4_3.js"></script>');
document.write('<script src="/Scripts/chart4_4.js"></script>');
document.write('<script src="/Scripts/chart4_5.js"></script>');
document.write('<script src="/Scripts/chart4_6.js"></script>');
document.write('<script src="/Scripts/chart5.js"></script>');
document.write('<script src="/Scripts/chart6.js"></script>');

//SelectedOpt的清單,要修改SelectedOpt的話記得這裡也要修改
var SelectedOpt = ["AppName", "Category", "Rating",
    "RatingCount", "InstallsRange", "InstallsCount",
    "Free", "Price", "Size", "MinAndroid", "DeveloperId",
    "Released", "LastUpdated", "ContentRating",
    "AdSupported", "InAppPurchases", "EditorChoice"];

//Table的清單,要修改Table的話記得這裡也要修改
var TableList = [
    {
        Table: "AppGrid", TableName: "表格",
        TableIntroduction: "<ul><li>秀出主要的APP欄位</li></ul>",
        SelectedOpt: ["AppName", "Category", "Rating",
            "RatingCount", "InstallsRange", "Free"]
    },
    {
        Table: "Chart1", TableName: "app類別的成功率",
        TableIntroduction: "<ul><li>透過平均評分分數來來表示未來各類別app成功率的比較，幫助開發者找到較容易成功的類別</li>" +
            "<li>並透過顯示付費及免費app的平均評分分數，讓開發者思考免費及付費app可能帶來的成功率的差異</li></ul>",
        SelectedOpt: ["Category", "RatingCount", "Price", "InstallsRange", "Free"]
    },
    {
        Table: "Chart2", TableName: "app類別的關注率及討論",
        TableIntroduction: "<ul><li>透過展現每一類別的評論數量，幫助開發者選擇較容易受到關注的類別，使開發完後的app能成為評論及更新互相正向影響的app</li></ul>",
        SelectedOpt: ["Category", "RatingCount", "Price", "InstallsRange", "Free"]
    },
    {
        Table: "Chart3", TableName: "每一類別的競爭程度與競爭對手的數量",
        TableIntroduction: "<ul><li>幫助開發者能夠了解各類別的競爭程度與競爭對手的數量</li>" +
            "<li>根據平均下載量可以看出哪些類別競爭程度較高，是否要進入競爭激烈的市場發展獨特的商品，還是進入進錚程度較低的市場，補足市場缺口，成為此市場中的佼佼者</li>" +
            "<li>而展現競爭對手的數量能讓開發者理解現有市場的競爭者，思考是否在未來的市場中能夠有一席之地</li></ul>",
        SelectedOpt: ["Category", "InstallsRange", "Price", "Free"]
    },
    {
        Table: "Chart4", TableName: "付費及免費app的討論熱度及民眾付費使用意願",
        TableIntroduction: "<ul><li>幫助APP開發者從營利取向角度來看哪些種類的APP討論熱度高且民眾付費使用意願高，較能賺錢</li>" +
            "<li>根據平均評分數量可以看出討論熱度，下載量可以看出民眾的接受度，加上付費APP的平均價格後可以得知APP大概要設定在多少價錢大家會接受，可以盈利</li></ul>",
        SelectedOpt: ["Category", "InstallsRange", "Price", "RatingCount"]
    },
    {
        Table: "Chart5", TableName: "近年來各類別有多少競爭者",
        TableIntroduction: "<ul><li>幫助APP開發者得知競爭激烈程度，列出各類別每年分別有多少發行數量，除了了解同業競爭對手的數量，也可以了解各類別近年趨勢</li>" +
            "<li>在開發APP前可以思考一下此類型APP值不值得開發，評估是否有機會超越業界龍頭廠商</li></ul>",
        SelectedOpt: ["Category", "InstallsRange", "Free", "Price", "Released"]
    },
    {
        Table: "Chart6", TableName: "app商機的考量",
        TableIntroduction: "<ul><li>透過列出免費APP和付費APP的平均下載量，可讓開發者把較大商機的種類納為一個APP的開發考量因素</li></ul>",
        SelectedOpt: ["Category", "InstallsRange","Price"]
    }
];

$(document).ready(function () {
    /*function Released_StartChange() {
        var startDate = Released_Start.value(),
            endDate = Released_End.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            Released_End.min(startDate);
        } else if (endDate) {
            Released_Start.max(new Date(endDate));
        } else {
            endDate = new Date();
            Released_Start.max(endDate);
            Released_End.min(endDate);
        }
    }
    function Released_EndChange() {
        var endDate = Released_End.value(),
            startDate = Released_Start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            Released_Start.max(endDate);
        } else if (startDate) {
            Released_End.min(new Date(startDate));
        } else {
            endDate = new Date();
            Released_Start.max(endDate);
            Released_End.min(endDate);
        }
    }
    function LastUpdated_StartChange() {
        var startDate = LastUpdated_Start.value(),
            endDate = LastUpdated_End.value();

        if (startDate) {
            startDate = new Date(startDate);
            startDate.setDate(startDate.getDate());
            LastUpdated_End.min(startDate);
        } else if (endDate) {
            LastUpdated_Start.max(new Date(endDate));
        } else {
            endDate = new Date();
            LastUpdated_Start.max(endDate);
            LastUpdated_End.min(endDate);
        }
    }
    function LastUpdated_EndChange() {
        var endDate = LastUpdated_End.value(),
            startDate = LastUpdated_Start.value();

        if (endDate) {
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate());
            LastUpdated_Start.max(endDate);
        } else if (startDate) {
            LastUpdated_End.min(new Date(startDate));
        } else {
            endDate = new Date();
            LastUpdated_Start.max(endDate);
            LastUpdated_End.min(endDate);
        }
    }

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

    var MS = ["Category"];     //MultiSelect清單
    for (var ms_v = 0; ms_v < MS.length; ms_v++) {
        $("#" + MS[ms_v]).kendoMultiSelect({
            placeholder: "Select Category...",
            autoClose: false,
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: [
                { Text: "apple", Value: "1" },
                { Text: "banana", Value: "2" },
                { Text: "grave", Value: "3" }
            ],
        });
    }

    var DDL = ["MinInstallsRange", "MaxInstallsRange"];     //下拉選單清單
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

    var NTB_MP = ["MinPrice", "MaxPrice"];
    for (var ntb_mp_v = 0; ntb_mp_v < NTB_MP.length; ntb_mp_v++) {
        $("#" + NTB_MP[ntb_mp_v]).kendoNumericTextBox({
            format: "c",
            min: 0,
            decimals: 2,
            step: 0.01,
        });
    }

    var NTB_MS = ["MinSize", "MaxSize"];
    for (var ntb_ms_v = 0; ntb_ms_v < NTB_MS.length; ntb_ms_v++) {
        $("#" + NTB_MS[ntb_ms_v]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 1,
            step: 0.1,
        });
    }

    var NTB_MRC = ["MinRatingCount", "MaxRatingCount"];
    for (var ntb_mrc_v = 0; ntb_mrc_v < NTB_MRC.length; ntb_mrc_v++) {
        $("#" + NTB_MRC[ntb_mrc_v]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 0,
            step: 1,
        });
    }

    var NTB_MIC = ["MinInstallsCount", "MaxInstallsCount"];
    for (var ntb_mic_v = 0; ntb_mic_v < NTB_MIC.length; ntb_mic_v++) {
        $("#" + NTB_MIC[ntb_mic_v]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 0,
            step: 1,
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

    var CB2 = ["ContentRating"]
    for (var cb2_v = 0; cb2_v < CB2.length; cb2_v++) {
        $("#" + CB2[cb2_v]).kendoCheckBoxGroup({
            items: [{ label: "未分級", value: "Unrated" },
                { label: "所有人", value: "EveryOne" },
                { label: "10歲以上", value: "10+" },
                { label: "13歲以上", value: "13+" },
                { label: "17歲以上", value: "17+" },
                { label: "18歲以上", value: "18+" }],
            layout: "horizontal",
            labelPosition: "after",
            value: ["Unrated", "EveryOne", "10+", "13+", "17+", "18+"],
        }).data("kendoCheckBoxGroup");
    }

    //DatePicker
    var Released_Start = $("#MinReleased").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: new Date("1998/01/01"),
        change: Released_StartChange
    }).data("kendoDatePicker");

    var Released_End = $("#MaxReleased").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: new Date(),
        change: Released_EndChange
    }).data("kendoDatePicker");

    var LastUpdated_start = $("#MinLastUpdated").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: new Date("1998/01/01"),
        change: LastUpdated_StartChange
    }).data("kendoDatePicker");

    var LastUpdated_End = $("#MaxLastUpdated").kendoDatePicker({
        format: "yyyy/MM/dd",
        value: new Date(),
        change: LastUpdated_EndChange
    }).data("kendoDatePicker");

    Released_Start.max(Released_End.value());
    Released_End.min(Released_Start.value());
    LastUpdated_start.max(LastUpdated_End.value());
    LastUpdated_End.min(LastUpdated_start.value());

    var SD = ["Rating"];     //Slider清單
    for (var sd_v = 0; sd_v < SD.length; sd_v++) {
        $("#" + SD[sd_v]).kendoRangeSlider({
            min: 0,
            max: 5,
            smallStep: 0.5,
            largeStep: 0.5,
        }).data("kendoRangeSlider");
    }

    $("#NoRating").kendoCheckBoxGroup({
        items: [{ label: "未評分", value: -1 }],
        layout: "horizontal",
        labelPosition: "after",
        value: [-1]
    }).data("kendoCheckBoxGroup");
    */

    //一開始先隱藏圖表區塊與篩選條件區塊
    for (var i = 0; i < TableList.length; i++) {
        $("#" + TableList[i].Table).hide();
        $("#SelectedOption").hide();
        $("#Chart_Selected").hide();
    }
    $("#Btn_AppGrid").click();
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

//圖表簡介
function Zoom_Chart_Introduction() {
    if ($("#Chart_Introduction").is(":visible")) {
        $("#Btn_Chart_Introduction").html("圖<br>表<br>簡<br>介<br>&#8617");
        $("#Chart_Introduction").hide();
    } else {
        $("#Btn_Chart_Introduction").html("圖<br>表<br>簡<br>介<br>&#8618");
        $("#Chart_Introduction").show();
    }
}

//選擇圖表清單按鈕
function SelectedTable(table) {
    $(".bb").css("background-color", "#F0F0F0");
    $(".bb").removeClass("beChosed");
    $("#" + table.id).css("background-color", "#97CBFF");
    $("#" + table.id).addClass("beChosed");
    $("#SelectedOption").show();
    var TableId = table.id.substring(4, table.id.length);
    //選擇到的Table顯示,未選擇的Table隱藏
    for (var i = 0; i < TableList.length; i++) {
        if (TableList[i].Table == TableId) {
            $("#Chart_Introduction").html(TableList[i].TableIntroduction);
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

//查詢按鈕
$("#Search").click(function () {
    var target = "";
    var released_start = $("#Div_Released:visible") ? $("#MinReleased").data("kendoDatePicker").value() : "";
    var released_end = $("#Div_Released:visible") ? $("#MaxReleased").data("kendoDatePicker").value() : "";
    var lastupdated_start = $("#Div_LastUpdated:visible") ? $("#MinLastUpdated").data("kendoDatePicker").value() : "";
    var lastupdated_end = $("#Div_LastUpdated:visible") ? $("#MaxLastUpdated").data("kendoDatePicker").value() : "";
    //整合輸入的資料
    var amad = {   
        APP_NAME: $("#Div_AppName:visible") ? $("#AppName").val() : "", //命名須與model的名稱相同    //string
        CATEGORY: $("#Div_Category:visible") ? $("#Category").data("kendoMultiSelect").value() : "",  //array
        RATING: $("#Div_Rating:visible") ? $("#Rating").getKendoRangeSlider().value() : "", //array
        NO_RATING: $("#Div_Rating:visible") ? $("#NoRating").getKendoCheckBoxGroup().value() : "",   //array
        MIN_RATING_COUNT: $("#Div_RatingCount:visible") ? $("#MinRatingCount").data("kendoNumericTextBox").value() : "",    //int
        MAX_RATING_COUNT: $("#Div_RatingCount:visible") ? $("#MaxRatingCount").data("kendoNumericTextBox").value() : "",    //int
        MIN_INSTALLS_RANGE: $("#Div_InstallsRange:visible") ? $("#MinInstallsRange").data("kendoDropDownList").value() : "",   //string
        MAX_INSTALLS_RANGE: $("#Div_InstallsRange:visible") ? $("#MaxInstallsRange").data("kendoDropDownList").value() : "",   //string
        //MIN_INSTALLS_COUNT: $("#Div_InstallsCount:visible") ? $("#MinInstallsCount").data("kendoNumericTextBox").value() : "",
        //MAX_INSTALLS_COUNT: $("#Div_InstallsCount:visible") ? $("#MaxInstallsCount").data("kendoNumericTextBox").value() : "",
        FREE: $("#Div_Free:visible") ? $("#Free").getKendoCheckBoxGroup().value() : "",   //array
        MIN_PRICE: $("#Div_Price:visible") ? $("#MinPrice").data("kendoNumericTextBox").value() : "",   //float
        MAX_PRICE: $("#Div_Price:visible") ? $("#MaxPrice").data("kendoNumericTextBox").value() : "",   //float
        //MIN_SIZE: $("#Div_Size:visible") ? ($("#MinSize").data("kendoNumericTextBox").value() + $("#MinSizeUnit").data("kendoDropDownList").value()) : "",
        //MAX_SIZE: $("#Div_Size:visible") ? ($("#MaxSize").data("kendoNumericTextBox").value() + $("#MaxSizeUnit").data("kendoDropDownList").value()) : "",
        DEVELOPER_ID: $("#Div_DeveloperId:visible") ? $("#DeveloperId").val() : "", //string
        MIN_RELEASED: released_start != "" ? (released_start.getFullYear() + "/" + (released_start.getMonth() + 1) + "/" + released_start.getDate()) : "",    //string
        MAX_RELEASED: released_end != "" ? (released_end.getFullYear() + "/" + (released_end.getMonth() + 1) + "/" + released_end.getDate()) : "",  //string
        MIN_LAST_UPDATED: lastupdated_start != "" ? (lastupdated_start.getFullYear() + "/" + (lastupdated_start.getMonth() + 1) + "/" + lastupdated_start.getDate()) : "",  //string
        MAX_LAST_UPDATED: lastupdated_end != "" ? (lastupdated_end.getFullYear() + "/" + (lastupdated_end.getMonth() + 1) + "/" + lastupdated_end.getDate()) : "", //string
        CONTENT_RATING: $("#Div_ContentRating:visible") ? $("#ContentRating").getKendoCheckBoxGroup().value() : "",   //array
        //AD_SUPPORTED: $("#Div_AdSupported:visible") ? $("#AdSupported").getKendoCheckBoxGroup().value() : "",   //array
        IN_APP_PURCHASES: $("#Div_InAppPurchases:visible") ? $("#InAppPurchases").getKendoCheckBoxGroup().value() : "",   //array
        EDITOR_CHOICE: $("#Div_EditorChoice:visible") ? $("#EditorChoice").getKendoCheckBoxGroup().value() : "",   //array
    };

    //換到所選取的TABLE
    for (var z = 0; z < TableList.length; z++) {
        if ($("#Btn_" + TableList[z].Table).is(".beChosed")) {
            target = TableList[z].Table;
        }
    }
    
    $.ajax({
        url: "/AppMarketingAnalysis/GetAppSearch",
        dataType: "json",
        data: {
            amad: amad,
            target: target
        },    //將此資料傳入Models.AppMarketingAnalysisData
        type: "post",
    }).done(function (searchResult) {
        //有新增表格或表格名稱變動這裡要記得更改
        if ($("#Btn_AppGrid").is(".beChosed")) {
            GetAppGrid(searchResult);
        } else if ($("#Btn_Chart1").is(".beChosed")) {
            GetChart1(searchResult);
        } else if ($("#Btn_Chart2").is(".beChosed")) {
            GetChart2(searchResult);
        } else if ($("#Btn_Chart3").is(".beChosed")) {
            GetChart3(searchResult);
        } else if ($("#Btn_Chart4").is(".beChosed")) {
            GetChart4_3(searchResult);
            GetChart4_4(searchResult);
            GetChart4_5(searchResult);
        } else if ($("#Btn_Chart5").is(".beChosed")) {
            GetChart5(searchResult);
        } else if ($("#Btn_Chart6").is(".beChosed")) {
            GetChart6(searchResult);
        }
    });
});

/*
//選取gridview function
function AppDetail(e) {
    var row = $(e.target).closest("tr"); //被選取的row
    var selectedId = $("#AppGrid").data("kendoGrid").dataItem(row).APP_SORT;//被選取的row的APP_SORT
    window.location.href = "/AppMarketingAnalysis/AppDetailView?id=" + selectedId;
};
*/
