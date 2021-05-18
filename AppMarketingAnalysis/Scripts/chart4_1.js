function GetChart4_1(searchResult) {
    // -----------------------------------------計算x、y軸值--------------------------------------------
    var list = [
        { "category": "Strategy", "maximumInstalls": "2161778", "ratingcount": "17297" },//3
        { "category": "Communication", "maximumInstalls": "351560", "ratingcount": "108408" },//2
        { "category": "Educational", "maximumInstalls": "12520805", "ratingcount": "10990" },//10
        { "category": "Tools", "maximumInstalls": "79304739", "ratingcount": "488639" },//4
        { "category": "Educational", "maximumInstalls": "29969311", "ratingcount": "44700" },//9
        { "category": "Strategy", "maximumInstalls": "2161778", "ratingcount": "17947" },//3
        { "category": "cation", "maximumInstalls": "351560", "ratingcount": "28748" },//2
        { "category": "Educational", "maximumInstalls": "12520805", "ratingcount": "10990" },//10
        { "category": "Tools", "maximumInstalls": "79304739", "ratingcount": "488639" },//4
        { "category": "Eduonal", "maximumInstalls": "29969311", "ratingcount": "4700" },//9
        { "category": "tegy", "maximumInstalls": "2161778", "ratingcount": "1797" },//3
        { "category": "caon", "maximumInstalls": "351560", "ratingcount": "28748" },//2
        { "category": "nal", "maximumInstalls": "12520805", "ratingcount": "400990" },//10
        { "category": "Tls", "maximumInstalls": "79304739", "ratingcount": "488639" },//4
        { "category": "Eal", "maximumInstalls": "29969311", "ratingcount": "473300" },//9
    ]


    var result = [];
    var repeat = [];

    // var count1 = [];
    // var summaximumInstalls = [];
    // var avgmaximumInstalls = [];

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
            // summaximumInstalls[index] = parseFloat(summaximumInstalls[index]) + parseFloat(list[i].maximumInstalls);
            // count1[index]++;

            sumratingcount[index] = parseFloat(sumratingcount[index]) + parseFloat(list[i].ratingcount);
            count2[index]++;
        }
        else {
            result.push(item);
            // summaximumInstalls.push(list[i].maximumInstalls);
            // count1.push(1);

            sumratingcount.push(list[i].ratingcount);
            count2.push(1);
        }
    }

    for (var i = 0, len = count2.length; i < len; i++) {
        // avgmaximumInstalls.push(parseFloat(summaximumInstalls[i])/parseFloat(count1[i]));
        avgratingcount.push((parseFloat(sumratingcount[i]) / parseFloat(count2[i])).toFixed(0));
    }

    var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
        // + "<br><br> summaximumInstalls: " + summaximumInstalls
        // + "<br> count1: " + count1	+ "<br> ---avgmaximumInstalls: " + avgmaximumInstalls
        + "<br><br> sumratingcount: " + sumratingcount
        + "<br> count2: " + count2 + "<br> ---avgratingcount: " + avgratingcount;

    // document.getElementById("chart4_1_data").innerHTML = outputStr;




    // -----------------------------------------作圖----------------------------------------------------

    var bor = [];//'rgba(172, 171, 170, 0.8)';
    var color = [];

    for (var i = 0; i < avgratingcount.length; i++) {
        var r = Math.floor(Math.random() * 250);
        var g = Math.floor(Math.random() * 250);
        var b = Math.floor(Math.random() * 250);
        color[i] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.3 + ')';
        bor[i] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.8 + ')';
    }

    // var maxValue2 = Math.max.apply(null, avgmaximumInstalls);
    var ctx = document.getElementById('chart4_1').getContext('2d');
    var chart4_1 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: result, //label值(x軸)
            datasets: [{
                type: 'bar',
                label: 'Average ratingcount', //標頭值
                data: avgratingcount, //資料值(y軸)
                thickness: 1,
                fill: false,
                backgroundColor: color,
                borderColor: bor,
                borderWidth: 1,
            }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    // scaleLabel: {
                    // display: true,
                    // labelString: "Category",
                    // fontSize: 15
                    // padding: 0
                    // },
                    ticks: {
                        maxRotation: 90
                    }
                }],
                yAxes: [{
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: "Average ratingcount (free apps)",
                        fontSize: 18,
                        padding: 10
                    },
                    // ticks: { 
                    // max: 500000, 
                    // min: 0 
                    // } 
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
