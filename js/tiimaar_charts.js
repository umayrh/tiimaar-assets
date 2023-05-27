
make_line_chart_fn = function(div_class_name, chart_labels, chart_series) {
    new Chartist.LineChart(
      div_class_name,
      {
        labels: chart_labels,
        series: chart_series
      }, {
        low: 0,
        fullWidth: false,
        chartPadding: {
            right: 40
        },
    });
}
