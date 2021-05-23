function GetChart4_5(searchResult) {
	// -----------------------------------------計算x、y軸值--------------------------------------------
	//var list = [
	//	{ "category": "Strategy", "maximumInstalls": "2161778", "ratingcount": "17297", "price": "0" },//3
	//	{ "category": "Communication", "maximumInstalls": "351560", "ratingcount": "2848", "price": "2.6" },//2
	//	{ "category": "Educational", "maximumInstalls": "12520805", "ratingcount": "10990", "price": "0" },//10
	//	{ "category": "Tools", "maximumInstalls": "79304739", "ratingcount": "488639", "price": "0" },//4
	//	{ "category": "Educational", "maximumInstalls": "29969311", "ratingcount": "44700", "price": "0" },//9
	//	{ "category": "Srategy", "maximumInstalls": "2161778", "ratingcount": "17297", "price": "0" },//3
	//	{ "category": "Comunication", "maximumInstalls": "351560", "ratingcount": "2848", "price": "2.6" },//2
	//	{ "category": "Ectional", "maximumInstalls": "12520805", "ratingcount": "10990", "price": "0" },//10
	//	{ "category": "Tols", "maximumInstalls": "79304739", "ratingcount": "488639", "price": "0" },//4
	//	{ "category": "Educationl", "maximumInstalls": "29969311", "ratingcount": "44700", "price": "0" },//9
	//	{ "category": "Strtegy", "maximumInstalls": "2161778", "ratingcount": "17297", "price": "0" },//3
	//	{ "category": "Communication", "maximumInstalls": "351560", "ratingcount": "2848", "price": "2.6" },//2
	//	{ "category": "Educational", "maximumInstalls": "12520805", "ratingcount": "10990", "price": "0" },//10
	//	{ "category": "Tools", "maximumInstalls": "79304739", "ratingcount": "488639", "price": "0" },//4
	//]
	var list = searchResult;

	var result = [];
	var repeat = [];

	var count1_free = [];
	var summaximumInstalls_free = [];
	var avgmaximumInstalls_free = [];


	var count2_free = [];
	var sumratingcount_free = [];
	var avgratingcount_free = [];

	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i].price == 0) //免費的才計算
		{
			var item = list[i].category;
			if (result.includes(item)) //item在result中出現，放入repeat中，並增加count1與rating 及count2與ratingcount
			{
				repeat.push(item);
				// document.getElementById("try").innerHTML = item;
				var index = result.indexOf(item); //item是result中的第幾個
				summaximumInstalls_free[index] = parseFloat(summaximumInstalls_free[index]) + parseFloat(list[i].maximumInstalls);
				count1_free[index]++;

				sumratingcount_free[index] = parseFloat(sumratingcount_free[index]) + parseFloat(list[i].ratingcount);
				count2_free[index]++;
			}
			else {
				result.push(item);
				summaximumInstalls_free.push(list[i].maximumInstalls);
				count1_free.push(1);

				sumratingcount_free.push(list[i].ratingcount);
				count2_free.push(1);
			}
		}
	}

	for (var i = 0, len = count1_free.length; i < len; i++) {
		avgmaximumInstalls_free.push((parseFloat(summaximumInstalls_free[i]) / parseFloat(count1_free[i])).toFixed(0));
		avgratingcount_free.push((parseFloat(sumratingcount_free[i]) / parseFloat(count2_free[i])).toFixed(0));
	}

	var outputStr = "---notrepeat:" + result + "<br> repeat: " + repeat
		+ "<br><br> summaximumInstalls_free: " + summaximumInstalls_free
		+ "<br> count1_free: " + count1_free + "<br> ---avgmaximumInstalls_free: " + avgmaximumInstalls_free
		+ "<br><br> sumratingcount_free: " + sumratingcount_free
		+ "<br> count2_free: " + count2_free + "<br> ---avgratingcount_free: " + avgratingcount_free;

	// document.getElementById("chart4_5_data").innerHTML = outputStr;




	// -----------------------------------------作圖----------------------------------------------------



	// var maxValue2 = Math.max.apply(null, avgmaximumInstalls);
	var ctx = document.getElementById('chart4_5').getContext('2d');
	var chart4_5 = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: result, //label值(x軸)
			datasets: [{
				type: 'bar',
				label: 'Average ratingcount (free apps)', //標頭值
				yAxisID: 'A',
				data: avgratingcount_free, //資料值(y軸)
				thickness: 1,
				fill: false,
				backgroundColor: 'rgba(180,220,152,0.3)',
				borderColor: 'rgba(180,220,152,1)',
				borderWidth: 1,
			}
				, {
				type: 'bar',
				label: 'Average MaximumInstalls (free apps)', //標頭值
				yAxisID: 'B',
				data: avgmaximumInstalls_free, //資料值(y軸)
				fill: false,
				backgroundColor: 'rgba(21,118,110,0.3)',
				borderColor: 'rgba(21,118,110,1)',
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
						labelString: "Average ratingcount (free apps)",
						fontSize: 18,
						padding: 10
					}
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
						labelString: "Average MaximumInstalls (free apps)",
						fontSize: 18,
						padding: 10
					}
					// ticks: { 
					// max: maxValue2*1.05, 
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