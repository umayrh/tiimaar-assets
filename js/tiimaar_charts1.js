
make_line_chart_fn = function(div_class_name, chart_labels, chart_series, chart_legend, legend_elem) {
   chart =  new Chartist.LineChart(
      div_class_name,
      {
        labels: chart_labels,
        series: chart_series
      }, {
        low: 0,
        fullWidth: false,
        chartPadding: {
          top: 20,
          right: 0,
          bottom: 20,
          left: 20
        },
        axisX: {
            // On the x-axis start means top and end means bottom
            position: 'end',
            showGrid: true
        },
        axisY: {
          onlyInteger: true,
          // On the y-axis start means left and end means right
        },
        plugins: [
          Chartist.plugins.legend({
              position: legend_elem != null ? legend_elem : 'top',
              legendNames: chart_legend,
          }),
          Chartist.plugins.ctPointLabels({
              textAnchor: 'middle',
              labelInterpolationFnc: function(value) {return value == null ? '' : value}
          }),
          /*
          Chartist.plugins.ctAxisTitle({
            axisX: {
              axisTitle: "", // Time period
              axisClass: "ct-axis-title",
              offset: {
                x: 0,
                y: 50
              },
              textAnchor: "middle"
            },
            axisY: {
              axisTitle: "", // # of visit documents"
              axisClass: "ct-axis-title",
              offset: {
                x: 0,
                y: -1
              },
              flipTitle: false
            }
          })
          */
        ]
    });
    $(window).on('resize', function() {
      chart.update();
    });
}

make_line_chart_fn2 = function(ct_chart_id, chart_labels, chart_series, chart_legend, legend_elem, document, chartContext) {
    for (let idx = 0; idx < chart_legend.length; idx++) {
        chart_series[idx]['name'] = chart_legend[idx];
    }
    var options = {
      colors: [
        '#d70206', '#f05b4f', '#f4c63d', '#d17905', '#453d3f', '#59922b', '#0544d3',
        '#6b0392', '#f05b4f', '#dda458', '#eacf7d', '#86797d', '#b2c326', '#6188e2',
        '#a748ca'],
      chart: {
        type: 'area',
        height: '400',
        background: '#feeed7',
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      series: chart_series,
      xaxis: {
        categories: chart_labels
      }
    }

    if (chartContext.has(ct_chart_id)) {
        oldChart = chartContext.get(ct_chart_id);
        if (oldChart instanceof ApexCharts) {
            oldChart.destroy();
        }
    }

    canvas_ctx = document.querySelector(ct_chart_id);
    var chart = new ApexCharts(canvas_ctx, options);
    chart.render();
    chartContext.set(ct_chart_id, chart);
}

make_line_chart_fn3 = function(canvas_ctx, chart_labels, chart_series, chart_legend, legend_elem, chartContext) {
    const plugin = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#feeed7';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      }
    };
    // Clear canvas
    chartId = canvas_ctx.id
    if (chartContext.has(chartId)) {
        oldChart = chartContext.get(chartId);
        if (oldChart instanceof Chart) {
            oldChart.destroy();
        }
    }

    for (let idx = 0; idx < chart_legend.length; idx++) {
        chart_series[idx]['label'] = chart_legend[idx];
    }

    chart = new Chart(canvas_ctx, {
        type: 'line',
        data: {
            labels: chart_labels,
            datasets: chart_series
        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              customCanvasBackgroundColor: {
                color: '#feeed7',
              }
            }
        },
    });
    chartContext.set(chartId, chart);
}

make_line_chart_fn4 = function(div_id_name, chart_labels, chart_series, chart_legend, legend_elem) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Time');
    for (let idx = 0; idx < chart_legend.length; idx++) {
        data.addColumn('number', chart_legend[idx]);
    }

    for (let idx = 0; idx < chart_labels.length; idx++) {
        row = [chart_labels[idx]]
        for (let s_idx = 0; s_idx < chart_series.length; s_idx++) {
            row.push(chart_series[s_idx]['data'][idx]);
        }
        data.addRow(row);
    }

    var options = {
        'colors': [
            '#d70206', '#f05b4f', '#f4c63d', '#d17905', '#453d3f', '#59922b', '#0544d3',
            '#6b0392', '#f05b4f', '#dda458', '#eacf7d', '#86797d', '#b2c326', '#6188e2',
            '#a748ca'],
        'backgroundColor': '#feeed7',
        'chartArea': {  width: "100%", height: "100%"},
        'width': 900,
        'height': 600,
        'animation': {
            startup : true,
            duration: 3000,
            easing: 'out'
        },
    };
    var chart = new google.charts.Line(document.getElementById(div_id_name));
    chart.draw(data, google.charts.Line.convertOptions(options));
}
