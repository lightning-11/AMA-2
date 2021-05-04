$(document).ready(function () {
    /*{
        Table: "AppGrid2", TableName: "第二個表格", SelectedOpt: ["AppName", "Category", "Rating",
            "RatingCount", "InstallsRange", "Free"]
    }*/
    //初次產生AppGrid2框架
    $("#AppGrid2").kendoGrid({
        height: 540,
        sortable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            { field: "AppName", title: "APP名稱", width: "16.66%" },
            { field: "Category", title: "APP類別", width: "16.66%" },
            { field: "Rating", title: "平均評分", width: "16.66%" },
            { field: "RatingCount", title: "評分數量", width: "16.66%" },
            { field: "InstallsRange", title: "平均下載範圍", width: "16.66%" },
            { field: "Free", title: "APP是免費還是付費", width: "16.66%" },
        ],
    });
});

//AppGrid2接收資料
function GetAppGrid2(searchResult) {
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
                    FREE: {type: "bool"},
                }
            }
        },
        pageSize: 20,
        sort: { field: "APP_NAME", dir: "desc" }   //排序
    });
    $("#AppGrid2").data("kendoGrid").setDataSource(dataSource);

    //判斷是否有資料
    if ($("#AppGrid2").data("kendoGrid").dataSource.data().length == 0) {
        $("#AppGrid2").hide();  //隱藏Grid
    }
    else {
        $("#AppGrid2").show();  //顯示Grid
    }
    $("#AppGrid2").data("kendoGrid").refresh();  //刷新Grid
}