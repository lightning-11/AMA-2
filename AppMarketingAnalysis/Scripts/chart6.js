function GetChart6() {
    var list = [
        { "category": "Strategy", "free": "true", "install": "17297" },//3
        { "category": "Communication", "free": "false", "install": "2848" },//2
        { "category": "Educational", "free": "true", "install": "10990" },//10
        { "category": "Tools", "free": "false", "install": "488639" },//4
        { "category": "Strategy", "free": "false", "install": "12997" },//3
        { "category": "Communication", "free": "true", "install": "28848" },//2
        { "category": "Educational", "free": "false", "install": "19690" },//10
        { "category": "Tools", "free": "true", "install": "48039" },//4
        { "category": "Educational", "free": "true", "install": "44700" },//9
        { "category": "Educational", "free": "true", "install": "27480" },//9
        { "category": "Educat", "free": "false", "install": "1983" },//9
        { "category": "Education", "free": "true", "install": "2258" },//9
        { "category": "Educat", "free": "true", "install": "19443" },//9
        { "category": "Education", "free": "false", "install": "25528" },//9
        { "category": "Education", "free": "false", "install": "255728" },//9
        { "category": "Education", "free": "false", "install": "245528" },//9
        { "category": "Educational", "free": "false", "install": "37116" },//9
        { "category": "Tl", "free": "false", "install": "488639" },//4
        { "category": "Stegy", "free": "false", "install": "12997" },//3
        { "category": "Cunication", "free": "true", "install": "28848" },//2
    ]


    var isfreeresult = [];
    var notfreeresult = [];

    var count1 = [];
    var sumisfreeinstall = [];
    var avgisfreeinstall = [];

    var count2 = [];
    var sumnotfreeinstall = [];
    var avgnotfreeinstall = [];

    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i].category;

        if (isfreeresult.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
        {
            var index = isfreeresult.indexOf(item);
            if (list[i].free == "true") {
                sumisfreeinstall[index] = parseFloat(sumisfreeinstall[index]) + parseFloat(list[i].install);
                count1[index]++;
            }
            else {
                sumnotfreeinstall[index] = parseFloat(sumnotfreeinstall[index]) + parseFloat(list[i].install);
                count2[index]++;
            }
        }
        else {
            if (list[i].free == "true") {
                isfreeresult.push(item);
                sumisfreeinstall.push(list[i].install);
                sumnotfreeinstall.push(0);
                count1.push(1);
                count2.push(0);
            }
            else {
                isfreeresult.push(item);
                sumnotfreeinstall.push(list[i].install);
                sumisfreeinstall.push(0);
                count1.push(0);
                count2.push(1);
            }
        }
    }

    for (var i = 0, len = count1.length; i < len; i++) {
        if (sumisfreeinstall[i] == 0) {
            avgisfreeinstall.push(0);
        }
        else {
            avgisfreeinstall.push((parseFloat(sumisfreeinstall[i]) / parseFloat(count1[i])).toFixed(0));
        }
    }

    for (var i = 0, len = count2.length; i < len; i++) {
        if (sumnotfreeinstall[i] == 0) {
            avgnotfreeinstall.push(0);
        }
        else {
            avgnotfreeinstall.push((parseFloat(sumnotfreeinstall[i]) / parseFloat(count2[i])).toFixed(0));
        }
    }


    // document.getElementById("chart_6_1_data").innerHTML = isfreeresult + "<br>" +  sumisfreeinstall +
    // "<br>" +  count1 + "<br>" +  sumnotfreeinstall +
    // "<br>" +  count2 + "<br>" +  avgisfreeinstall+ "<br>" +  avgnotfreeinstall;


    // -----------------------------------------作圖----------------------------------------------------


    var ctx = document.getElementById('chart6').getContext('2d');
    var chart6 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: isfreeresult, //label值(x軸)
            datasets: [
                {
                    type: 'bar',
                    label: 'Average free apps installs', //標頭值
                    yAxisID: 'A',
                    data: avgisfreeinstall, //資料值(y軸)
                    thickness: 1,
                    fill: false,
                    backgroundColor: 'rgba(130,202,228,0.3)',
                    borderColor: 'rgba(130,202,228,1)',
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 5, //觸碰點後的點的大小
                    // pointHitRadius: 5,
                    // pointBorderWidth: 2, //點的邊框
                    pointStyle: 'rectRounded' //點的形狀
                },
                {
                    type: 'bar',
                    label: 'Average pay apps installs', //標頭值
                    yAxisID: 'B',
                    data: avgnotfreeinstall, //資料值(y軸)
                    thickness: 1,
                    fill: false,
                    backgroundColor: 'rgba(9,82,100,0.3)',
                    borderColor: 'rgba(9,82,100,1)',
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
                        labelString: "Average free apps installs",
                        fontSize: 18,
                        padding: 10
                    },
                    // ticks: { 
                    // max: 5, 
                    // min: 0 
                    // } 
                },
                {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: "Average pay apps installs",
                        fontSize: 18,
                        padding: 10
                    },
                    // ticks: { 
                    // max: 5, 
                    // min: 0 
                    // } 
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
