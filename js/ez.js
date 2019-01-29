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

		{

			this.insertElementModal = new InsertElementModalWindow(this.insertElementModalCtx);
			let flags = new ModalWindowFlags();
			// flags.hideTitle 		= true;
			// flags.hideCloseBtn 	= true;
			flags.hideOnFocusLost = true;
			this.insertElementModal.setFlags(flags);
			this.insertElementModal.setVisible(false);
			this.insertElementModal.onAccept = (text) => {
					if (text != "") {
						if (text != "text")
							this.documentTree.insert(text, this.insertElementModal.parentNode);
						else
							this.documentTree.insertText(this.insertElementModal.parentNode, "Wpisz tekst");
						
						this.documentTree.rebuild();
					}
					this.insertElementModal.setVisible(false);
				};
		}

		{
			this.editContentModal = new EditContentModalWindow(this.editContentModalCtx);
			let flags = new ModalWindowFlags();
			// flags.hideTitle 		= true;
			// flags.hideCloseBtn 	= true;
			flags.hideOnFocusLost = true;
			this.editContentModal.setFlags(flags);
			this.editContentModal.setVisible(false);
			this.editContentModal.onAccept = (value) => {
					if (this.editContentModal.editedNode) {
						this.editContentModal.editedNode.text = value;
					}
					this.editContentModal.setVisible(false);
					this.documentTree.rebuild();
				};
		}
		

		this.propertiesWindow = null;
	}

	onSelectTreeElement(node) {

		if (node) {
			this.propertiesWindowCtx.innerHTML = "";

			let defaultScheme = this.getDefaultTagScheme(node.tag);
			if (node.isTextNode()) {
				this.editContentModal.setContentText(node.text);
				this.editContentModal.setVisible(true);
				this.editContentModal.editedNode = node;
			}
			else if (defaultScheme.styleProperties.length > 0) {
				this.propertiesWindow = new PropertiesWindow(node, node.settings, defaultScheme);
				this.propertiesWindow.render(this.propertiesWindowCtx);
			}
		}
	}

	getDefaultTagScheme(tag) {
		let scheme = eval("globalConfig.tagSchemes." + tag);
		let result = {};
		result.styleProperties = [];
		if (scheme !== undefined) {
			for(let i = 0; i < scheme.length; ++i)
				result.styleProperties.push(getStyleProperty(scheme[i]));
		}
		return result;
	}
}