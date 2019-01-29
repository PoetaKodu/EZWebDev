class EzApp
{
	constructor()
	{
	}

	run() {
		this.setup();
	}

	setup() {
		this.documentTree 			= new DocumentTree(this.outputCtx);
		this.treeView 				= new TreeView(this.documentTree, this.treeViewCtx);

		this.treeView.onSelectTreeElement = (node) => {
				this.onSelectTreeElement(node)
			};
		this.treeView.onWantsToInsertNewTreeElement = (node) => {
				this.insertElementModal.setSearchText("");
				this.insertElementModal.setVisible(true);
				this.insertElementModal.parentNode = node;
			};

		this.insertElementModal = new InsertElementModalWindow(this.insertElementModalCtx);
		let ieFlags = new ModalWindowFlags();
		// ieFlags.hideTitle 		= true;
		// ieFlags.hideCloseBtn 	= true;
		ieFlags.hideOnFocusLost = true;
		this.insertElementModal.setFlags(ieFlags);
		this.insertElementModal.onAccept = (text) => {
				if (text != "") {
					this.documentTree.insert(text, this.insertElementModal.parentNode);
					this.documentTree.rebuild();
				}
				this.insertElementModal.setVisible(false);
			};
		

		this.propertiesWindow = null;
	}

	onSelectTreeElement(node) {
		this.propertiesWindowCtx.innerHTML = "";
		let defaultScheme = this.getDefaultTagScheme(node.tag);

		this.propertiesWindow = new PropertiesWindow(node, node.settings, defaultScheme);
		this.propertiesWindow.render(this.propertiesWindowCtx);
	}

	getDefaultTagScheme(tag) {
		return eval("globalConfig.tagSchemes." + tag);
	}
}