function GetChart5() {
    // -----------------------------------------計算x、y軸值--------------------------------------------
    var list = [
        { "category": "Strategy", "Released": "2018/7/19" },//3
        { "category": "Communication", "Released": "2013/8/12" },//2
        { "category": "Educational", "Released": "2020/4/27" },//10
        { "category": "Tools", "Released": "2016/3/7" },//4
        { "category": "Educational", "Released": "2018/8/16" },//9
        { "category": "Communication", "Released": "2012/5/31" },//17
        { "category": "Communication", "Released": "2018/10/3" },//78
        { "category": "Communication", "Released": "2012/9/26" },//184
        { "category": "Tools", "Released": "2020/9/14" },//84
        { "category": "Tools", "Released": "2018/12/9" }//50
    ]


    var result = [];
    var repeat = [];

    var Releasedvalue = [];
    var sumReleased = [];
    var s = 0;

    var minyear = list[0].Released.slice(0, 4);
    var maxyear = 0;

    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i].category;
        var year = list[i].Released.slice(0, 4);

        if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
        {
            repeat.push(item);
            var index = result.indexOf(item); //item是result中的第幾個
            Releasedvalue[index].push(year);//同category，year直接加，無論是否相同
        }
        else {
            result.push(item);
            Releasedvalue[s] = new Array();//二維
            Releasedvalue[s][0] = item;
            Releasedvalue[s].push(year);//不同category，year還未有
        }
        s++;

        if (year < minyear) {
            minyear = year;
        }

        if (year > maxyear) {
            maxyear = year;
        }
    }
    console.log(minyear);
    console.log(maxyear);

    var yearlist = [minyear];
    for (var i = parseInt(minyear) + 1; i <= parseInt(maxyear); i++) {
        yearlist.push(i.toString());
    }
    console.log(yearlist);


    for (var i = 0; i < Releasedvalue.length; i++) {
        sumReleased[i] = new Array(parseInt(maxyear) - parseInt(minyear) + 1);
        for (var zero = 0; zero < parseInt(maxyear) - parseInt(minyear) + 1; zero++) {
            sumReleased[i][zero] = 0;
        }
        console.log('i=');
        console.log(i);
        // Releasedvalue[i].shift();

        for (var j = 1; j < Releasedvalue[i].length; j++) {
            console.log(Releasedvalue[i][j]);
            sumReleased[i][parseInt(Releasedvalue[i][j]) - parseInt(minyear)]++;
        }
        console.log(sumReleased[i]);
    }


    var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
        + "<br> Releasedvalue: " + Releasedvalue;

    // document.getElementById("chart5_data").innerHTML = outputStr;



    // -----------------------------------------作圖----------------------------------------------------
    var ctx = document.getElementById('chart5').getContext('2d');
    var chart5 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearlist, //label值(x軸)
            datasets: [
                {
                    label: Releasedvalue[0][0], //標頭值
                    // yAxisID: 'A', 
                    data: sumReleased[0], //資料值(y軸)
                    thickness: 1,
                    // fill: false,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255,99,132,1)'],
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 5, //觸碰點後的點的大小
                    // pointHitRadius: 5,
                    // pointBorderWidth: 2, //點的邊框
                    pointStyle: 'rectRounded' //點的形狀
                }
                , {
                    label: Releasedvalue[1][0], //標頭值
                    // yAxisID: 'A', 
                    data: sumReleased[1], //資料值(y軸)
                    thickness: 1,
                    // fill: false,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 5, //觸碰點後的點的大小
                    // pointHitRadius: 5,
                    // pointBorderWidth: 2, //點的邊框
                    pointStyle: 'rectRounded' //點的形狀
                }
                , {
                    label: Releasedvalue[2][0], //標頭值
                    // yAxisID: 'A', 
                    data: sumReleased[2], //資料值(y軸)
                    thickness: 1,
                    // fill: false,
                    backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(255, 206, 86, 1)'],
                    borderWidth: 1,
                    pointRadius: 5,
                    pointHoverRadius: 5, //觸碰點後的點的大小
                    // pointHitRadius: 5,
                    // pointBorderWidth: 2, //點的邊框
                    pointStyle: 'rectRounded' //點的形狀
                }
                , {
                    label: Releasedvalue[3][0], //標頭值
                    // yAxisID: 'A', 
                    data: sumReleased[3], //資料值(y軸)
                    thickness: 1,
                    // fill: false,
                    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(75, 192, 192, 1)'],
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
                yAxes: [{
                    // id: 'A', 
                    type: 'linear',
                    position: 'left',
                    // ticks: { 
                    // max: 5, 
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