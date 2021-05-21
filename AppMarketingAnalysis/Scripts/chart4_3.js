function GetChart4_3(searchResult) {
    // -----------------------------------------計算x、y軸值--------------------------------------------
    //var list = [
    //    { "category": "Strategy", "maximumInstalls": "2161778", "ratingcount": "17297", "price": "0" },//3
    //    { "category": "Communication", "maximumInstalls": "351560", "ratingcount": "2848", "price": "2.6" },//2
    //    { "category": "Educational", "maximumInstalls": "12520805", "ratingcount": "10990", "price": "1.5" },//10
    //    { "category": "Tools", "maximumInstalls": "79304739", "ratingcount": "488639", "price": "0" },//4
    //    { "category": "Educational", "maximumInstalls": "29969311", "ratingcount": "44700", "price": "2.2" },//9
    //    { "category": "Srategy", "maximumInstalls": "2161778", "ratingcount": "17297", "price": "4.4" },//3
    //    { "category": "Counication", "maximumInstalls": "351560", "ratingcount": "2848", "price": "2.6" },//2
    //    { "category": "ducational", "maximumInstalls": "12520805", "ratingcount": "10990", "price": "1.5" },//10
    //    { "category": "Too", "maximumInstalls": "79304739", "ratingcount": "488639", "price": "0" },//4
    //    { "category": "Ednal", "maximumInstalls": "29969311", "ratingcount": "44700", "price": "1.2" },//9
    //    { "category": "Strate", "maximumInstalls": "2161778", "ratingcount": "17297", "price": "0" },//3
    //    { "category": "Communication", "maximumInstalls": "351560", "ratingcount": "2848", "price": "3.6" },//2
    //    { "category": "Edational", "maximumInstalls": "12520805", "ratingcount": "10990", "price": "4.5" },//10
    //    { "category": "Tools", "maximumInstalls": "79304739", "ratingcount": "488639", "price": "0" },//4
    //    { "category": "Educational", "maximumInstalls": "29969311", "ratingcount": "44700", "price": "0.2" },//9
    //]
    var list = searchResult;


    var result = [];
    var repeat = [];

    var count1_pay = [];
    var summaximumInstalls_pay = [];
    var avgmaximumInstalls_pay = [];

    // var count2_pay = [];
    // var sumratingcount_pay = [];
    // var avgratingcount_pay = [];

    var count3_pay = [];
    var sumprice = [];
    var avgprice = [];


    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].price != 0) //付費的才計算
        {
            var item = list[i].category;
            if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
            {
                repeat.push(item);
                // document.getElementById("try").innerHTML = item;
                var index = result.indexOf(item); //item是result中的第幾個
                summaximumInstalls_pay[index] = parseFloat(summaximumInstalls_pay[index]) + parseFloat(list[i].maximumInstalls);
                count1_pay[index]++;

                // sumratingcount_pay[index] = parseFloat(sumratingcount_pay[index]) + parseFloat(list[i].ratingcount);
                // count2_pay[index]++;

                sumprice[index] = parseFloat(sumprice[index]) + parseFloat(list[i].price);
                count3_pay[index]++;
            }
            else {
                result.push(item);
                summaximumInstalls_pay.push(list[i].maximumInstalls);
                count1_pay.push(1);

                // sumratingcount_pay.push(list[i].ratingcount);
                // count2_pay.push(1);

                sumprice.push(list[i].price);
                count3_pay.push(1);
            }
        }
    }

    for (var i = 0, len = count1_pay.length; i < len; i++) {
        avgmaximumInstalls_pay.push((parseFloat(summaximumInstalls_pay[i]) / parseFloat(count1_pay[i])).toFixed(0));
        // avgratingcount_pay.push(parseFloat(sumratingcount_pay[i])/parseFloat(count2_pay[i]));
        avgprice.push((parseFloat(sumprice[i]) / parseFloat(count3_pay[i])).toFixed(2));
    }

    var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
        + "<br><br> summaximumInstalls_pay: " + summaximumInstalls_pay
        + "<br> count1_pay: " + count1_pay + "<br> ---avgmaximumInstalls_pay: " + avgmaximumInstalls_pay
        // + "<br><br> sumratingcount_pay: " + sumratingcount_pay
        // + "<br> count2_pay: " + count2_pay	+ "<br> ---avgratingcount_pay: " + avgratingcount_pay
        + "<br><br> sumprice: " + sumprice
        + "<br> count3_pay: " + count3_pay + "<br> ---avgprice: " + avgprice;

    // document.getElementById("chart4_3_data").innerHTML = outputStr;





    // -----------------------------------------作圖----------------------------------------------------


    var bor = [];//'rgba(172, 171, 170, 0.8)';

    var color = [];
    for (var i = 0; i < avgmaximumInstalls_pay.length; i++) {
        var r = Math.floor(Math.random() * 250);
        var g = Math.floor(Math.random() * 250);
        var b = Math.floor(Math.random() * 250);
        color[i] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.3 + ')';
        bor[i] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.8 + ')';
    }


    // var maxValue2 = Math.max.apply(null, avgmaximumInstalls);
    var ctx = document.getElementById('chart4_3').getContext('2d');
    var chart4_3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: result, //label值(x軸)
            datasets: [{
                type: 'bar',
                label: 'Average MaximumInstalls (pay apps)', //標頭值
                yAxisID: 'A',
                data: avgmaximumInstalls_pay, //資料值(y軸)
                thickness: 1,
                fill: false,
                backgroundColor: color,
                borderColor: bor,
                borderWidth: 1,
            }
                , {
                type: 'line',
                label: 'Average price (pay apps)', //標頭值
                yAxisID: 'B',
                data: avgprice, //資料值(y軸)
                fill: false,
                backgroundColor: 'rgba(34, 122, 142, 0.2)',
                borderColor: 'rgba(34, 122, 142, 1)',
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
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: "Average MaximumInstalls (pay apps)",
                        fontSize: 18,
                        padding: 10
                    },
                    // ticks: { 
                    // max: 5, 
                    // min: 0 
                    // } 
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: "Average price (pay apps)",
                        fontSize: 18,
                        padding: 10
                    },
                    ticks: {
                        // max: maxValue2*1.05, 
                        min: 0
                    }
                }]
            },
            title: {
                display: false,
                text: '',
                // position: 'left',
                fontSize: 15,
                padding: 0
            },
            legend: {
                display: true
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
