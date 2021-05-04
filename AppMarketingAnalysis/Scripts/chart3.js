function GetChart3() {
    // -----------------------------------------計算x、y軸值--------------------------------------------
    var list = [
        { "category": "Strategy", "installs": "1,000,000+", "developerId": "Skizze Games" },//3
        { "category": "Communication", "installs": "100,000+", "developerId": "Xavier Roche" },//2
        { "category": "Educational", "installs": "10,000,000+", "developerId": "BabyBus" },//10
        { "category": "Tools", "installs": "50,000,000+", "developerId": "TheMauSoft" },//4
        { "category": "Educational", "installs": "10,000,000+", "developerId": "BabyBus2" },//9
        { "category": "Educational", "installs": "10,000,000+", "developerId": "BabyBus3" },//9
        { "category": "Stegy", "installs": "1,000,000+", "developerId": "Skizze Games" },//3
        { "category": "Commuication", "installs": "100,000+", "developerId": "Xavier Roche" },//2
        { "category": "Educaional", "installs": "10,000,000+", "developerId": "BabyBus" },//10
        { "category": "Tols", "installs": "50,000,000+", "developerId": "TheMauSoft" },//4
        { "category": "Educatal", "installs": "10,000,000+", "developerId": "BabyBus2" }//9
    ]


    var result = [];
    var repeat = [];

    var count1 = [];
    var suminstalls = [];
    var avginstalls = [];

    var developerIdvalue = [];
    var sumdeveloperId = [];
    var s = 0;

    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i].category;
        if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
        {
            repeat.push(item);
            // document.getElementById("try").innerHTML = item;
            var index = result.indexOf(item); //item是result中的第幾個
            suminstalls[index] = parseFloat(suminstalls[index]) + parseFloat(list[i].installs.replace(/[^\w\s]/g, ""));//replacereplace去除任何不是數字、字母的符號
            count1[index]++;
            developerIdvalue[index].push(list[i].developerId);//同category，developerId直接加，無論是否相同

        }
        else //未出現過的category
        {
            result.push(item);
            suminstalls.push(list[i].installs.replace(/[^\w\s]/g, ""));//replace去除任何不是數字、字母的符號
            count1.push(1);
            developerIdvalue[s] = new Array();//二維
            developerIdvalue[s][0] = item;
            developerIdvalue[s].push(list[i].developerId);//不同category，developerId還未有
            s++;
        }

    }

    for (var i = 0, len = count1.length; i < len; i++) {
        avginstalls.push(parseFloat(suminstalls[i]) / parseFloat(count1[i]));
    }

    for (var i = 0, len = developerIdvalue.length; i < len; i++) {
        var di = new Set(developerIdvalue[i]);
        console.log(di);
        sumdeveloperId.push(di.size - 1);
    }

    var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
        + "<br><br> sumrating: " + suminstalls
        + "<br> count1: " + count1 + "<br> ---avginstalls: " + avginstalls
        + "<br> developerIdvalue: " + developerIdvalue
        + "<br> ---sumdeveloperId: " + sumdeveloperId;

    // document.getElementById("chart3_data").innerHTML = outputStr;



    // -----------------------------------------作圖----------------------------------------------------

    var bor = [];//'rgba(172, 171, 170, 0.8)';
    var color = [];

    for (var i = 0; i < avginstalls.length; i++) {
        var r = Math.floor(Math.random() * 250);
        var g = Math.floor(Math.random() * 250);
        var b = Math.floor(Math.random() * 250);
        color[i] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.3 + ')';
        bor[i] = 'rgba' + '(' + r + ',' + g + ',' + b + ',' + 0.8 + ')';
    }

    var ctx = document.getElementById('chart3').getContext('2d');
    var chart3 = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: result, //label值(x軸)
            datasets: [{
                type: 'bar',
                label: 'Average Installs', //標頭值
                yAxisID: 'A',
                data: avginstalls, //資料值(y軸)
                thickness: 1,
                fill: false,
                backgroundColor: color,
                borderColor: bor,
                borderWidth: 1,
                pointRadius: 5,
                pointHoverRadius: 5, //觸碰點後的點的大小
                // pointHitRadius: 5,
                // pointBorderWidth: 2, //點的邊框
                pointStyle: 'rectRounded' //點的形狀
            }
                , {
                type: 'line',
                label: 'Diffirent_DeveloperID', //標頭值
                yAxisID: 'B',
                data: sumdeveloperId, //資料值(y軸)
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
                        labelString: "Average Installs (bar)",
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
                        labelString: "Diffirent DeveloperID (line)",
                        fontSize: 18,
                        padding: 10
                    },
                    ticks: {
                        // max: 5, 
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
