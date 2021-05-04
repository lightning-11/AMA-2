function GetChart1() {
    // -----------------------------------------計算x、y軸值--------------------------------------------
    var list = [
        { "category": "Strategy", "rating": "4.3" },//3
        { "category": "Communication", "rating": "3.6" },//2
        { "category": "Educational", "rating": "4.1" },//10
        { "category": "Tools", "rating": "4.3" },//4
        { "category": "Educational", "rating": "4" },//9
        { "category": "Straegy", "rating": "4.3" },//3
        { "category": "Comunication", "rating": "3.6" },//2
        { "category": "Edcational", "rating": "4.1" },//10
        { "category": "Tols", "rating": "4.3" },//4
        { "category": "ducational", "rating": "4" },//9
        { "category": "Strateg", "rating": "4.3" },//3
        { "category": "Communicaton", "rating": "3.6" },//2
        { "category": "Educationl", "rating": "4.1" },//10
        { "category": "Tool", "rating": "4.3" },//4
        { "category": "Educatioal", "rating": "4" },//9
    ]


    var result = [];
    var repeat = [];

    var count1 = [];
    var sumrating = [];
    var avgrating = [];

    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i].category;
        if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
        {
            repeat.push(item);
            // document.getElementById("try").innerHTML = item;
            var index = result.indexOf(item); //item是result中的第幾個
            sumrating[index] = parseFloat(sumrating[index]) + parseFloat(list[i].rating);
            count1[index]++;
        }
        else {
            result.push(item);
            sumrating.push(list[i].rating);
            count1.push(1);
        }
    }

    for (var i = 0, len = count1.length; i < len; i++) {
        avgrating.push(parseFloat(sumrating[i]) / parseFloat(count1[i]));
    }

    var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
        + "<br><br> sumrating: " + sumrating
        + "<br> count1: " + count1 + "<br> ---avgrating: " + avgrating;

    // document.getElementById("chart1_data").innerHTML = outputStr; 




    // -----------------------------------------作圖----------------------------------------------------

    function getcolor() {
        var color = [];
        var borderColor = [];
        var r = Math.floor(Math.random() * 250);
        var g = Math.floor(Math.random() * 250);
        var b = Math.floor(Math.random() * 250);
        color[0] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.3 + ')';
        return color;
    }

    var bor = 'rgba(172, 171, 170, 0.8)';

    var ctx = document.getElementById('chart1').getContext('2d');
    var chart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: result, //label值(x軸)
            datasets: [{
                label: 'Average rating', //標頭值
                data: avgrating, //資料值(y軸)
                fill: false,
                backgroundColor: 'rgba(255, 99, 0, 0.2)',
                borderColor: 'rgba(255, 99, 0, 1)',
                borderWidth: 1,
                pointRadius: 5,
                pointHoverRadius: 5, //觸碰點後的點的大小
                // pointHitRadius: 5,
                // pointBorderWidth: 2, //點的邊框
                pointStyle: 'rectRounded' //點的形狀
            }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    // scaleLabel: {
                    // display: true,
                    // labelString: "Category",
                    // fontSize: 15,
                    // padding: 15
                    // },
                    ticks: {
                        maxRotation: 90
                    }
                }]
                ,
                yAxes: [{
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        max: 5,
                        min: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Average rating score",
                        // lineHeight: 0.5,
                        fontSize: 18,
                        padding: 10
                    }
                }]
            },
            title: {
                display: true,
                text: '',
                // position: 'left',
                fontSize: 15,
                padding: 0
            },
            legend: {
                display: false
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
