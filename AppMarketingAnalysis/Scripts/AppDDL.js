$(document).ready(function () {
    ////****日期變化--START****////
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
    ////****日期變化--END****////

    //產生TextBox (AppName, DeveloperId)
    var TB = ["AppName", "DeveloperId"];     //TextBox清單
    //產生AutoComplete
    for (var tb_v = 0; tb_v < TB.length; tb_v++) {
        $("#" + TB[tb_v]).kendoAutoComplete({
            dataSource: {
                transport: {
                    read: {
                        url: "/AppMarketingAnalysis/AutoCompleteData",
                        type: "post",
                        dataType: "json",
                        data: { target: TB[tb_v] }
                    }
                }
            },
            filter: "startswith",
            autoWidth: true,
            height: 100,
        });
    }

    //產生MultiSelect (Category)
    var MS = ["Category"];     //MultiSelect清單
    for (var ms_v = 0; ms_v < MS.length; ms_v++) {
        $("#" + MS[ms_v]).kendoMultiSelect({
            placeholder: "Select Category...",
            autoClose: false,
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: {
                transport: {
                    read: {
                        url: "/AppMarketingAnalysis/GetDropDownListClassData",  //要加controller的位置
                        type: "post",
                        dataType: "json",
                        data: { target: MS[ms_v] }
                    }
                }
            },
        });
    }

    //產生DateRangePicker (Released, LastUpdated)
    /*var DRP = ["Released", "LastUpdated"];     //DateRangePicker清單
    for (var drp_v = 0; drp_v < DRP.length; drp_v++) {
        $("#" + DRP[drp_v]).kendoDateRangePicker({
            format: "yyyy/MM/dd",
            range: {
                start: new Date(1998, 9, 27),
                end: new Date()
            },
        }).data("kendoDatePicker");
    }*/

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

    ////*******************寫死************************////

    //產生下拉選單 (SizeUnit)
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

    //產生下拉選單 (InstallsRange)
    var MIR = ["MinInstallsRange", "MaxInstallsRange"];     //下拉選單清單
    var MIR_List = [
        { Text: "0", Value: "0+" },
        { Text: "1", Value: "1+" },
        { Text: "10", Value: "10+" },
        { Text: "100", Value: "100+" },
        { Text: "1,000", Value: "1,000+" },
        { Text: "10,000", Value: "10,000+" },
        { Text: "100,000", Value: "100,000+" },
        { Text: "1,000,000", Value: "1,000,000+" },
        { Text: "10,000,000", Value: "10,000,000+" },
        { Text: "100,000,000", Value: "100,000,000+" },
        { Text: "1,000,000,000", Value: "1,000,000,000+" },
    ]
    for (var b = 0; b < MIR.length; b++) {
        $("#" + MIR[b]).kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: MIR_List,
            filter: "startswith",
            optionLabel: '請選擇',
            autoWidth: true,
        });
    }

    //產生NumericTextBox (Price)
    var NTB_MP = ["MinPrice", "MaxPrice"];
    for (var ntb_mp_v = 0; ntb_mp_v < NTB_MP.length; ntb_mp_v++) {
        $("#" + NTB_MP[ntb_mp_v]).kendoNumericTextBox({
            format: "c",
            min: 0,
            decimals: 2,
            step: 0.01,
        });
    }

    //產生NumericTextBox (Size)
    var NTB_MS = ["MinSize", "MaxSize"];
    for (var ntb_ms_v = 0; ntb_ms_v < NTB_MS.length; ntb_ms_v++) {
        $("#" + NTB_MS[ntb_ms_v]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 1,
            step: 0.1,
        });
    }

    //產生NumericTextBox (RatingCount)
    var NTB_MRC = ["MinRatingCount", "MaxRatingCount"];
    for (var ntb_mrc_v = 0; ntb_mrc_v < NTB_MRC.length; ntb_mrc_v++) {
        $("#" + NTB_MRC[ntb_mrc_v]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 0,
            step: 1,
        });
    } 

    //產生NumericTextBox (InstallsCount)
    var NTB_MIC = ["MinInstallsCount", "MaxInstallsCount"];
    for (var ntb_mic_v = 0; ntb_mic_v < NTB_MIC.length; ntb_mic_v++) {
        $("#" + NTB_MIC[ntb_mic_v]).kendoNumericTextBox({
            format: "n",
            min: 0,
            decimals: 0,
            step: 1,
        });
    }

    //產生CheckBox (Free, AdSupported, InAppPurchases, EditorChoice)
    var CB = ["Free", "AdSupported", "InAppPurchases", "EditorChoice"];     //CheckBox清單
    for (var cb_v = 0; cb_v < CB.length; cb_v++) {
        $("#" + CB[cb_v]).kendoCheckBoxGroup({
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
            { label: "所有人", value: "Everyone" },
            { label: "10歲以上", value: "Everyone 10+" },
            { label: "13歲以上", value: "Teen" },
            { label: "17歲以上", value: "Mature 17+" },
            { label: "18歲以上", value: "Adults only 18+" }],
            layout: "horizontal",
            labelPosition: "after",
            value: ["Unrated", "Everyone", "Everyone 10+", "Teen", "Mature 17+", "Adults only 18+"],
        }).data("kendoCheckBoxGroup");
    }

    //產生RangeSlider (Rating, RatingCount)
    var SD = ["Rating"];     //Slider清單
    for (var sd_v = 0; sd_v < SD.length; sd_v++) {
        $("#" + SD[sd_v]).kendoRangeSlider({
            min: 0,
            max: 5,
            smallStep: 1,
            largeStep: 1,
        }).data("kendoRangeSlider");
    }

    $("#NoRating").kendoCheckBoxGroup({
        items: [{ label: "未評分", value: "true" }],
        layout: "horizontal",
        labelPosition: "after",
        value: ["true"]
    }).data("kendoCheckBoxGroup");
});