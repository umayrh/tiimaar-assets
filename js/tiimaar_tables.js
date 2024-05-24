make_tabulator_table = function(divId, addRowButtonId) {
    var billTable = new Tabulator(divId, {
        height:"311px",
        layout: "fitDataStretch",
        addRowPos:"bottom",
        columns:[
            {title: "Serial No.", field: "id", editor: "input"},
            {title: "Service Category", field: "category", editor: "input"},
            {title: "Service Name", field: "name", editor: "input"},
            {title: "Rate", field: "rate",  editor: "input"},
            {title: "Total Quantity", field: "quantity",  editor: "input"},
            {title: "Total Cost", field: "cost", editor: "input"},
        ],
    });

    //Add row on "Add Row" button click
    document.getElementById(addRowButtonId).addEventListener("click", function(){
        billTable.addRow({});
    });
    return billTable;
}

make_active_table = function(activeTable, tableData) {
    activeTable.data = tableData;
    activeTable.setAttribute(
        "tableStyle",
        JSON.stringify({
            "width":"100%", "boxShadow": "rgb(172 172 172 / 17%) 0px 0.5px 1px 0px", "borderRadius":"2px",
        })
    );
    activeTable.setAttribute(
        "files",
        JSON.stringify({
            "buttons": [
              {
                "import": true,
                "styles": {
                  "default": {
                    "backgroundColor": "#46acff", "height": "19px", "padding": "7px 14px", "color": "white", "border": "unset"
                  },
                  "hover": {"backgroundColor": "#2b9cf8"}, "click": {"backgroundColor": "#198eef"}
                },
                "text": "Import File",
                "position": "top-left",
                "order": 1
              },
              {
                "export": true,
                "styles": {
                  "default": {
                    "backgroundColor": "#46acff", "height": "19px", "padding": "7px 14px", "color": "white", "border": "unset"
                  },
                  "hover": {"backgroundColor": "#2b9cf8"}, "click": {"backgroundColor": "#198eef"}
                },
                "text": "Export File",
                "position": "top-left",
                "order": 0
              }
            ]
        })
    );
    return activeTable;
}
