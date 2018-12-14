let ezTreeView = document.getElementById("ezTreeView");
let ezViewContext = document.getElementById("ezViewContext");

let treeView = new TreeView(ezViewContext);
treeView.generateTreeElements();
treeView.populate(ezTreeView);