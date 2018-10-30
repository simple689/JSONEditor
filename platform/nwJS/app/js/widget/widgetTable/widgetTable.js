function WidgetTable() {
}

WidgetTable.addLabelLabel = function (elementParent, key, value) {
    var nodeTable = WidgetTableHtml.addTable(elementParent);
    WidgetTableRow.addLabelLabel(nodeTable, key, value);
    return nodeTable;
}
WidgetTable.addLabelInput = function (elementParent, key, value, inputType) {
    var nodeTable = WidgetTableHtml.addTable(elementParent);
    WidgetTableRow.addLabelInput(nodeTable, key, value, inputType);
    return nodeTable;
}
// WidgetFileJson.prototype.readObject = function (jsonObj, keyParent, elementParent) {
//     var nodeTable = WidgetTableHtml.addTable(elementParent);
//     for (var o in jsonObj) {
//         var key = o;
//         var isStart = key.indexOf("$");
//         if (isStart == 0) {
//             continue;
//         }
//         var value = jsonObj[key];
//         if (typeof(value) == WidgetKey._object) {
//             var keyChild = keyParent;
//             keyChild += "->";
//             keyChild += key;
//             keyChild += "->";
//             var nodeRow = WidgetTableRow.addLabel(nodeTable, key, keyShow);
//             var nodeCell = nodeRow.insertCell();
//             this.readObject(value, keyChild, nodeCell);
//         } else if (typeof(value) == WidgetKey._string) {
//             WidgetTableRow.addLabelInput(nodeTable, key, value, WidgetTableHtml._inputType.textString);
//         } else if (typeof(value) == WidgetKey._number) {
//             WidgetTableRow.addLabelInput(nodeTable, key, value, WidgetTableHtml._inputType.textNumber);
//         } else if (typeof(value) == WidgetKey._boolean) {
//             WidgetTableRow.addLabelInput(nodeTable, key, value, WidgetTableHtml._inputType.checkbox);
//         } else {
//             var strType = typeof(value);
//             WidgetLog.log("[" + typeof(value) + "]" + keyParent + "->" + key + " = " + value);
//         }
//     }
// }
