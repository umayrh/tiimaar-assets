
make_line_chart_fn = function(div_class_name, chart_labels, chart_series, chart_legend) {
    new Chartist.LineChart(
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
              legendNames: chart_legend,
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
}
