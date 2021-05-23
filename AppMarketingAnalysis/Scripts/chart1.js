function GetChart1(searchResult) {
	//var list = [
	//	{ "category": "Strategy", "rating": "4.3", "free": "true" },//3
	//	{ "category": "Communication", "rating": "3.6", "free": "true" },//2
	//	{ "category": "Educational", "rating": "4.1", "free": "true" },//10
	//	{ "category": "Tools", "rating": "4.3", "free": "true" },//4
	//	{ "category": "Educational", "rating": "4", "free": "true" },//9
	//	{ "category": "Straegy", "rating": "4.3", "free": "true" },//3
	//	{ "category": "Comunication", "rating": "1", "free": "true" },//2
	//	{ "category": "Edcational", "rating": "4.1", "free": "true" },//10
	//	{ "category": "Tols", "rating": "4.3", "free": "true" },//4
	//	{ "category": "ducational", "rating": "4", "free": "true" },//9
	//	{ "category": "Strateg", "rating": "4.3", "free": "true" },//3
	//	{ "category": "Communicaton", "rating": "2", "free": "true" },//2
	//	{ "category": "Educationl", "rating": "4.1", "free": "true" },//10
	//	{ "category": "Tool", "rating": "4.3", "free": "true" },//4
	//	{ "category": "Educatioal", "rating": "4", "free": "true" },//9
	//	{ "category": "EEE", "rating": "3.5", "free": "true" },//9
	//	{ "category": "EEE", "rating": "4", "free": "true" },//9
	//	{ "category": "EEE", "rating": "4", "free": "true" },//9

	//	{ "category": "Strategy", "rating": "4.3", "free": "false" },//3
	//	{ "category": "Communication", "rating": "3.6", "free": "false" },//2
	//	{ "category": "Educational", "rating": "4.1", "free": "false" },//10
	//	{ "category": "Tools", "rating": "4.3", "free": "false" },//4
	//	{ "category": "Educational", "rating": "2", "free": "false" },//9
	//	{ "category": "Straegy", "rating": "4.3", "free": "false" },//3
	//	{ "category": "Comunication", "rating": "3.6", "free": "false" },//2
	//	{ "category": "Edcational", "rating": "4.1", "free": "false" },//10
	//	{ "category": "Tols", "rating": "4.3", "free": "false" },//4
	//	{ "category": "x", "rating": "4", "free": "false" },//9
	//	{ "category": "Strateg", "rating": "1", "free": "false" },//3
	//	{ "category": "Communicaton", "rating": "1", "free": "false" },//2
	//	{ "category": "Educationl", "rating": "3", "free": "false" },//10
	//	{ "category": "Tool", "rating": "4.3", "free": "false" },//4
	//	{ "category": "Educatioal", "rating": "4", "free": "false" },//9
	//	{ "category": "EEE", "rating": "2", "free": "false" },//9
	//	{ "category": "EEE", "rating": "1", "free": "false" },//9
	//]
	var list = searchResult;

	var result = [];
	var repeat = [];

	var count1 = [];
	var sumrating1 = [];
	var avgrating1 = [];

	var count2 = [];
	var sumrating2 = [];
	var avgrating2 = [];

	for (var i = 0, len = list.length; i < len; i++) {
		var item = list[i].category;

		if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
		{
			var index = result.indexOf(item);
			if (list[i].free == "true") {
				sumrating1[index] = parseFloat(sumrating1[index]) + parseFloat(list[i].rating);
				count1[index]++;
			}
			else {
				sumrating2[index] = parseFloat(sumrating2[index]) + parseFloat(list[i].rating);
				count2[index]++;
			}
		}
		else {
			if (list[i].free == "true") {
				result.push(item);
				sumrating1.push(list[i].rating);
				sumrating2.push(0);
				count1.push(1);
				count2.push(0);
			}
			else {
				result.push(item);
				sumrating2.push(list[i].rating);
				sumrating1.push(0);
				count1.push(0);
				count2.push(1);
			}
		}
	}

	for (var i = 0, len = count1.length; i < len; i++) {
		if (sumrating1[i] == 0) {
			avgrating1.push(0);
		}
		else {
			var num = parseFloat(sumrating1[i]) / parseFloat(count1[i]);
			var precise = num.toPrecision(3);
			avgrating1.push(parseFloat(precise));
		}
	}

	for (var i = 0, len = count2.length; i < len; i++) {
		if (sumrating2[i] == 0) {
			avgrating2.push(0);
		}
		else {
			var num = parseFloat(sumrating2[i]) / parseFloat(count2[i]);
			var precise = num.toPrecision(3);
			avgrating2.push(parseFloat(precise));
		}
	}


	// document.getElementById("chart_6_1_data").innerHTML = result + "<br>" +  sumrating1 +
	// "<br>" +  count1 + "<br>" +  sumrating2 +
	// "<br>" +  count2 + "<br>" +  avgrating1+ "<br>" +  avgrating2;


	// -----------------------------------------作圖----------------------------------------------------

	var ctx = document.getElementById('chart1').getContext('2d');
	var chart1 = new Chart(ctx, {
		type: 'line',
		data: {
			labels: result, //label值(x軸)
			datasets: [
				{
					type: 'line',
					label: 'Average free apps ratings', //標頭值
					yAxisID: 'A',
					data: avgrating1, //資料值(y軸)
					thickness: 1,
					fill: false,
					backgroundColor: 'rgba(56,131,201,0.3)',
					borderColor: 'rgba(56,131,201,1)',
					borderWidth: 1,
					pointRadius: 5,
					pointHoverRadius: 5, //觸碰點後的點的大小
					// pointHitRadius: 5,
					// pointBorderWidth: 2, //點的邊框
					pointStyle: 'rectRounded' //點的形狀
				},
				{
					type: 'line',
					label: 'Average pay apps ratings', //標頭值
					yAxisID: 'B',
					data: avgrating2, //資料值(y軸)
					thickness: 1,
					fill: false,
					backgroundColor: 'rgba(210,116,139,0.3)',
					borderColor: 'rgba(210,116,139,1)',
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
						labelString: "Average free apps ratings",
						fontSize: 18,
						padding: 10
					},
					ticks: {
						max: 5,
						min: 0
					}
				},
				{
					id: 'B',
					type: 'linear',
					position: 'right',
					scaleLabel: {
						display: true,
						labelString: "Average pay apps ratings",
						fontSize: 18,
						padding: 10
					},
					ticks: {
						max: 5,
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