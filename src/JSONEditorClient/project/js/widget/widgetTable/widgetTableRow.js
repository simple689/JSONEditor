function WidgetTableRow() {
}

WidgetTableRow.addLabel = function (nodeTable, key, keyShow) {
    var nodeRow = WidgetTableHtml.addRow(nodeTable);
    WidgetTableHtml.addLabel(nodeRow, key, keyShow);
    return nodeRow;
}
WidgetTableRow.addLabelLabel = function (nodeTable, key, keyShow, value) {
    var nodeRow = WidgetTableHtml.addRow(nodeTable);
    WidgetTableHtml.addLabel(nodeRow, key, keyShow);
    WidgetTableHtml.addLabel(nodeRow, value, value);
    return nodeRow;
}
WidgetTableRow.addLabelInput = function (nodeTable, key, keyShow, value, inputType) {
    var nodeRow = WidgetTableHtml.addRow(nodeTable);
    WidgetTableHtml.addLabel(nodeRow, key, keyShow);
    WidgetTableHtml.addInput(nodeRow, value, inputType);
    return nodeRow;
}
