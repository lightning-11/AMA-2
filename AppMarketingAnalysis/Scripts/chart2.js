function GetChart2() {
    // -----------------------------------------計算x、y軸值--------------------------------------------
    var list = [
        { "category": "Strategy", "ratingcount": "17297" },//3
        { "category": "Communication", "ratingcount": "2848" },//2
        { "category": "Educational", "ratingcount": "10990" },//10
        { "category": "Tools", "ratingcount": "488639" },//4
        { "category": "Educational", "ratingcount": "44700" },//9
    ]


    var result = [];
    var repeat = [];

    var count2 = [];
    var sumratingcount = [];
    var avgratingcount = [];

    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i].category;
        if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
        {
            repeat.push(item);
            // document.getElementById("try").innerHTML = item;
            var index = result.indexOf(item); //item是result中的第幾個

            sumratingcount[index] = parseFloat(sumratingcount[index]) + parseFloat(list[i].ratingcount);
            count2[index]++;
        }
        else {
            result.push(item);

            sumratingcount.push(list[i].ratingcount);
            count2.push(1);
        }
    }

    for (var i = 0, len = count2.length; i < len; i++) {
        avgratingcount.push(parseFloat(sumratingcount[i]) / parseFloat(count2[i]));
    }

    var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
        + "<br><br> sumratingcount: " + sumratingcount
        + "<br> count2: " + count2 + "<br> ---avgratingcount: " + avgratingcount;

    // document.getElementById("chart2_data").innerHTML = outputStr;




    // -----------------------------------------作圖----------------------------------------------------
    var ctx = document.getElementById('chart2').getContext('2d');
    var chart2 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: result, //label值(x軸)
            datasets: [{
                label: 'Average ratingcount', //標頭值
                data: avgratingcount, //資料值(y軸)
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'linear',
                    position: 'left',
                    // ticks: { 
                    // max: 500000, 
                    // min: 0 
                    // } 
                }]
            },
            hover: {
                animationDuration: 0  // 防止鼠标移上去，数字闪烁
            },
            animation: {           // 这部分是数值显示的功能实现
                onComplete: function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                    // 以下属于canvas的属性（font、fillStyle、textAlign...）
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = "black";
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            }
        }
    });
}
