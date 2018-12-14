class EzApp
{
	constructor(srcCtx, treeViewCtx, propertiesWindowCtx)
	{
		this.srcCtx 				= srcCtx;
		this.treeViewCtx 			= treeViewCtx;
		this.propertiesWindowCtx 	= propertiesWindowCtx;
		this.setup();
	}
	setup() {
		this.treeView 			= new TreeView(this.srcCtx);
		this.propertiesWindow 	= null;
	}
	run() {
		this.treeView.generateTreeElements();

		let this_ = this;
		let renderCfg = {
				clickFn: function(element) {
						this_.onSelectElementInTreeView(this_, element);
					}
			};

		this.treeView.render(this.treeViewCtx, renderCfg);
	}

	onSelectElementInTreeView(this_, element) {
		console.log(this);
		this_.propertiesWindowCtx.innerHTML = "";
		
		let defaultScheme = this_.getDefaultTagScheme(element.tag);
		this_.propertiesWindow = new PropertiesWindow(element, undefined, defaultScheme);
		this_.propertiesWindow.render(this_.propertiesWindowCtx);
	}
	getDefaultTagScheme(tag) {
		return eval("globalConfig.tagSchemes." + tag);
	}
}