$(document).ready(function () {
    /*{
        Table: "AppGrid2", TableName: "第二個表格", SelectedOpt: ["AppName", "Category", "Rating",
            "RatingCount", "InstallsRange", "Free"]
    }*/
    /*{
    Table: "AppGrid", TableName: "表格", SelectedOpt: ["AppName", "Category", "Rating",
        "RatingCount", "InstallsRange", "InstallsCount",
        "Free", "Price", "Size", "MinAndroid", "DeveloperId",
        "Released", "LastUpdated", "ContentRating",
        "AdSupported", "InAppPurchases", "EditorChoice"]
    }*/
    //初次產生AppGrid框架
    $("#AppGrid").kendoGrid({
        height: 540,
        sortable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "AppName", title: "APP名稱", width: "16.66%" },
            { field: "Category", title: "APP類別", width: "16.66%" },
            { field: "Rating", title: "評分", width: "16.66%" },
            { field: "RatingCount", title: "評分數量", width: "16.66%" },
            { field: "InstallsRange", title: "平均下載範圍", width: "16.66%" },
            { field: "Free", title: "APP是免費還是付費", width: "16.66%" },
            //{ field: "AppName", title: "APP名稱", width: "5.8%" },
            //{ field: "Category", title: "APP類別", width: "5.8%" },
            //{ field: "Rating", title: "評分", width: "5.8%" },
            //{ field: "RatingCount", title: "評分數量", width: "5.8%" },
            //{ field: "InstallsRange", title: "平均下載範圍", width: "5.8%" },
            //{ field: "InstallsCount", title: "下載數量", width: "5.8%" },
            //{ field: "Free", title: "APP是否免費", width: "5.8%" },
            //{ field: "Price", title: "APP價格", width: "5.8%" },
            //{ field: "Size", title: "APP檔案大小", width: "5.8%" },
            //{ field: "MinAndroid", title: "最小支援安卓版本", width: "5.8%" },
            //{ field: "DeveloperId", title: "開發者名稱", width: "5.8%" },
            //{ field: "Released", title: "APP發行日期", width: "5.8%" },
            //{ field: "LastUpdated", title: "APP最後更新日期", width: "5.8%" },
            //{ field: "ContentRating", title: "APP分級", width: "5.8%" },
            //{ field: "AdSupported", title: "APP內廣告", width: "5.8%" },
            //{ field: "InAppPurchases", title: "APP內購買機制", width: "5.8%" },
            //{ field: "EditorChoice", title: "編輯精選", width: "5.8%" },
        ],
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
                    CATEGORY: { type: "string" },
                    RATING: { type: "int" },
                    RATING_COUNT: { type: "int" },
                    INSTALLS_RANGE: { type: "string" },
                    FREE: { type: "bool" },
                    //APP_NAME: { type: "string" },
                    //CATEGORY: { type: "string" },
                    //RATING: { type: "int" },
                    //RATING_COUNT: { type: "int" },
                    //INSTALLS_RANGE: { type: "string" },
                    //INSTALLS_COUNT: { type: "string" },
                    //FREE: { type: "bool" },
                    //PRICE: { type: "int" },
                    //SIZE: { type: "string" },
                    //MIN_ANDROID: { type: "string" },
                    //DEVELOPER_ID: { type: "string" },
                    //RELEASED: { type: "string" },
                    //LAST_UPDATED: { type: "string" },
                    //CONTENT_RATING: { type: "string" },
                    //AD_SUPPORTED: { type: "bool" },
                    //IN_APP_PURCHASES: { type: "bool" },
                    //EDITOR_CHOICE: { type: "bool" },
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
