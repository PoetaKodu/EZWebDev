class EzApp
{
	constructor(outputCtx, treeViewCtx, propertiesWindowCtx)
	{
		this.outputCtx 				= outputCtx;
		this.treeViewCtx 			= treeViewCtx;
		this.propertiesWindowCtx 	= propertiesWindowCtx;
		this.setup();
	}
	setup() {
		this.documentTree 			= new DocumentTree(this.outputCtx);
		this.treeView 				= new TreeView(this.documentTree, this.treeViewCtx);

		let this_ = this;
		this.treeView.onSelectTreeElement = function(node) { this_.onSelectTreeElement(this_, node) };

		this.propertiesWindow 		= null;
	}

	onSelectTreeElement(this_, node) {
		this_.propertiesWindowCtx.innerHTML = "";
		let defaultScheme = this_.getDefaultTagScheme(node.tag);

		this_.propertiesWindow = new PropertiesWindow(node, node.settings, defaultScheme);
		this_.propertiesWindow.render(this_.propertiesWindowCtx);
	}

	run () {

	}
	// run() {
	// 	this.treeView.generateTreeElements();

	// 	let this_ = this;
	// 	let renderCfg = {
	// 			clickFn: function(element) {
	// 					this_.onSelectElementInTreeView(this_, element);
	// 				}
	// 		};

	// 	this.treeView.render(this.treeViewCtx, renderCfg);
	// }
	getDefaultTagScheme(tag) {
		return eval("globalConfig.tagSchemes." + tag);
	}
}