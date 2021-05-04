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
        TableIntroduction: "aaa",
        SelectedOpt: ["AppName", "Category", "Rating",
            "RatingCount", "InstallsRange", "Free",
            "Free", "Price", "DeveloperId", "Released",
            "Released", "LastUpdated", "ContentRating",
            "InAppPurchases", "EditorChoice"]
    },
    {
        Table: "AppGrid2", TableName: "第二個表格",
        TableIntroduction: "bbb",
        SelectedOpt: ["AppName", "Category", "Rating",
            "RatingCount", "InstallsRange", "Free"]
    },
    {
        Table: "Chart1", TableName: "圖表一",
        TableIntroduction: "哪些類別會得到更多評價<br>" + "可能使app更容易被看見<br>" +
            "有更高的成長率<br>" + "顯示類別的平均評價<br>" + "可能代表未來app完成後的成功率<br>",
        SelectedOpt: ["InstallsRange", "Free", "", ""]
    },
    {
        Table: "Chart2", TableName: "圖表二",
        TableIntroduction: "哪些類別平均下載量多<br>" + "可以看出競爭激烈的程度<br>" +
            "列出類別會有多少的開發商，了解競爭對手數量<br>",
        SelectedOpt: ["Category", "Rating", "", "", ""]
    },
    {
        Table: "Chart3", TableName: "圖表三",
        TableIntroduction: "哪些類別會得到更多評價<br>" + "可能使app更容易被看見<br>" +
            "有更高的成長率<br>" + "顯示類別的平均評價<br>" + "可能代表未來app完成後的成功率<br>",
        SelectedOpt: ["RatingCount", "InstallsRange", "", "", ""]
    },
    {
        Table: "Chart4", TableName: "圖表四",
        TableIntroduction: "哪些類別會得到更多評價<br>" + "可能使app更容易被看見<br>" +
            "有更高的成長率<br>" + "顯示類別的平均評價<br>" + "可能代表未來app完成後的成功率<br>",
        SelectedOpt: ["Price", "Released", "", "", ""]
    },
    {
        Table: "Chart5", TableName: "圖表五",
        TableIntroduction: "哪些種類app有內部購買<br>" + "可讓開發者把較大的商機種類納為一個開發app的考量因素<br>",
        SelectedOpt: ["Category", "InstallsRange", "Free", "Price", ""]
    },
    {
        Table: "Chart6", TableName: "圖表六",
        TableIntroduction: "哪些種類app有內部購買<br>" + "可讓開發者把較大的商機種類納為一個開發app的考量因素<br>",
        SelectedOpt: ["Category", "InstallsRange", "Free", "Price", ""]
    }
];

$(document).ready(function () {
    function Released_StartChange() {
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

    var DDL = ["InstallsRange"];     //下拉選單清單
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
        /*
        var CBC = $("#" + CB[c]).getKendoCheckBoxGroup();
        CBC.value(["True", "False"]);
        alert(CB[c] + ", " + CBC.value());*/
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

    /************ 範例End ***********/

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
            ///
            if ($("#Btn_Chart1").is(".beChosed")) {
                GetChart1();
            } else if ($("#Btn_Chart2").is(".beChosed")) {
                GetChart2();
            } else if ($("#Btn_Chart3").is(".beChosed")) {
                GetChart3();
            } else if ($("#Btn_Chart4").is(".beChosed")) {
                GetChart4_1();
                GetChart4_2();
                GetChart4_3();
                GetChart4_4();
                GetChart4_5();
                GetChart4_6();
            } else if ($("#Btn_Chart5").is(".beChosed")) {
                GetChart5();
            } else if ($("#Btn_Chart6").is(".beChosed")) {
                GetChart6();
            }
            ///
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
        INSTALLS_RANGE: $("#Div_InstallsRange:visible") ? $("#InstallsRange").data("kendoDropDownList").value() : "",   //string
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
    for (var z = 0; z < TableList.length; z++) {
        if ($("#Btn_" + TableList[0].Table).is(".beChosed")) {
            target = TableList[0].Table;
        }
    }
    /*
    console.log(target + "******APP_NAME*****" + amad.APP_NAME + "*****CATEGORY******" +
        amad.CATEGORY + "*****RATING******" +
        amad.RATING + "*****MIN_RATING_COUNT******" +
        amad.MIN_RATING_COUNT + "******MAX_RATING_COUNT*****" +
        amad.MAX_RATING_COUNT + "*****INSTALLS_RANGE******" +
        amad.INSTALLS_RANGE + "***MIN_INSTALLS_COUNT********" +
        amad.MIN_INSTALLS_COUNT + "******MAX_INSTALLS_COUNT*****" +
        amad.MAX_INSTALLS_COUNT + "****FREE*******" +
        amad.FREE + "*****MIN_PRICE******" +
        amad.MIN_PRICE + "******MAX_PRICE*****" +
        amad.MAX_PRICE + "*****MIN_SIZE******" +
        amad.MIN_SIZE + "****MAX_SIZE*******" +
        amad.MAX_SIZE + "*****DEVELOPER_ID******" +
        amad.DEVELOPER_ID + "*****MIN_RELEASED******" +
        amad.MIN_RELEASED + "*****MAX_RELEASED******" +
        amad.MAX_RELEASED + "****MIN_LAST_UPDATED*******" +
        amad.MIN_LAST_UPDATED + "*****MAX_LAST_UPDATED******" +
        amad.MAX_LAST_UPDATED + "*****CONTENT_RATING******" +
        amad.CONTENT_RATING + "*****AD_SUPPORTED******" +
        amad.AD_SUPPORTED + "*****IN_APP_PURCHASES******" +
        amad.IN_APP_PURCHASES + "*****EDITOR_CHOICE******" +
        amad.EDITOR_CHOICE
    );*/
    
    $.ajax({
        url: "/AppMarketingAnalysis/GetAppSearch",
        dataType: "json",
        data: { amad, target },    //將此資料傳入Models.AppMarketingAnalysisData
        type: "post",
    }).done(function (searchResult) {
        //有新增表格或表格名稱變動這裡要記得更改
        if ($("#Btn_AppGrid").is(".beChosed")) {
            GetAppGrid(searchResult);
        } else if ($("#Btn_AppGrid2").is(".beChosed")) {
            GetAppGrid2(searchResult);
        } else if ($("#Btn_Chart1").is(".beChosed")) {
            GetChart1(searchResult);
        } else if ($("#Btn_Chart2").is(".beChosed")) {
            GetChart2(searchResult);
        } else if ($("#Btn_Chart3").is(".beChosed")) {
            GetChart3(searchResult);
        } else if ($("#Btn_Chart4").is(".beChosed")) {
            GetChart4_1(searchResult);
            GetChart4_2(searchResult);
            GetChart4_3(searchResult);
            GetChart4_4(searchResult);
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
