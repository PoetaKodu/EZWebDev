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

		this.treeView.onSelectTreeElement = (node) => {
				this.onSelectTreeElement(node)
			};

		this.propertiesWindow = null;
	}

	onSelectTreeElement(node) {
		this.propertiesWindowCtx.innerHTML = "";
		let defaultScheme = this.getDefaultTagScheme(node.tag);

		this.propertiesWindow = new PropertiesWindow(node, node.settings, defaultScheme);
		this.propertiesWindow.render(this.propertiesWindowCtx);
	}

	run () {

	}

	getDefaultTagScheme(tag) {
		return eval("globalConfig.tagSchemes." + tag);
	}
}