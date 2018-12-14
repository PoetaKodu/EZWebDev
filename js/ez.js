class EzApp
{
	constructor(srcCtx, treeViewCtx)
	{
		this.srcCtx = srcCtx;
		this.treeViewCtx = treeViewCtx;
		this.setup();
	}
	setup() {
		this.treeView = new TreeView(this.srcCtx);
	}
	run() {
		this.treeView.generateTreeElements();
		this.treeView.render(this.treeViewCtx);
	}
}