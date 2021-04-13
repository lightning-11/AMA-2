$(document).ready(function () {
    //產生TextBox (AppName, DeveloperId)
    var TB = ["AppName", "DeveloperId"];     //TextBox清單
    //產生AutoComplete
    for (var a = 0; a < TB.length; a++) {
        $("#" + TB[a]).kendoAutoComplete({
            dataSource: {
                transport: {
                    read: {
                        url: "/AppMarketingAnalysis/AutoCompleteData",
                        type: "post",
                        dataType: "json",
                        data: TB[a]
                    }
                }
            },
            filter: "startswith",
            autoWidth: true,
            height: 100,
        });
    }

    //產生下拉選單 (InstallsRange)
    var DDL = ["Category", "InstallsRange"];     //下拉選單清單
    for (var b = 0; b < DDL.length; b++) {
        $("#" + DDL[b]).kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: {
                transport: {
                    read: {
                        url: "/AppMarketingAnalysis/GetDropDownListClassData",  //要加controller的位置
                        type: "post",
                        dataType: "json",
                        data: DDL[b]
                    }
                }
            },
            filter: "startswith",
            optionLabel: '請選擇',
            autoWidth: true,
        });
    }

    //產生CheckBox (Free,ContentRating(+圖), AdSupported, InAppPurchases, EditorChoice)
    var CB = ["Free", "ContentRating", "AdSupported", "InAppPurchases", "EditorChoice"];     //CheckBox清單
    for (var c = 0; c < CB.length; c++) {
        $("#" + CB[c]).kendoCheckBoxGroup({
            items: ["True", "False"],
            layout: "horizontal",
            labelPosition: "after",
            value: ["True", "False"]
        }).data("kendoCheckBoxGroup");
    }

    //產生MultiSelect (Category)
    var MS = ["Category"];     //MultiSelect清單

    //產生Slider (Rating, RatingCount)
    var SD = ["Rating", "RatingCount"];     //Slider清單

    //產生DateRangePicker (Released, LastUpdated)
    var DRP = ["Released", "LastUpdated"];     //DateRangePicker清單

    ////*******************寫死************************////

    //產生下拉選單 (InstallsRange, MinAndroid)
    var SU = ["MinSizeUnit", "MaxSizeUnit"];   
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

    //產生NumericTextBox (Price, Size)
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
});