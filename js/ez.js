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

		document.addEventListener("keyup", (e) => { this.onKeyUp(e); });

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

			this.insertStyleModal = new InsertPropertyModalWindow(this.insertStyleModalCtx, globalConfig.styleProperties);
			let flags = new ModalWindowFlags();
			// flags.hideTitle 		= true;
			// flags.hideCloseBtn 	= true;
			flags.hideOnFocusLost = true;
			this.insertStyleModal.setFlags(flags);
			this.insertStyleModal.setVisible(false);
			this.insertStyleModal.onAccept = (text) => {
					console.log("accepted: " + text);
					if (text != "") {
						let opt = this.insertStyleModal.editedNode.settings.styles.find(s => s.name == text);
						console.log("opt: ", opt, ", settings: ", this.insertStyleModal.editedNode.settings);
						if (!opt) {
							opt = {};
							opt.name = text;
							opt.value = "none";

							this.insertStyleModal.editedNode.settings.styles.push(opt);
						}
						this.onSelectTreeElement(this.insertStyleModal.editedNode);
					}
					this.insertStyleModal.setVisible(false);
				};

			let insertStyleBtn = document.getElementById("insertStyleBtn");
			insertStyleBtn.addEventListener("click",
					() => {
						if (this.selectedNode) {
							console.log("Click ", this.selectedNode);
							this.insertStyleModal.editedNode = this.selectedNode;
							this.insertStyleModal.setSearchText("");
							this.insertStyleModal.setVisible(true);
						}
					}
				);
		}

		{

			this.insertAttributeModal = new InsertPropertyModalWindow(this.insertAttributeModalCtx, globalConfig.attributeProperties);
			let flags = new ModalWindowFlags();
			// flags.hideTitle 		= true;
			// flags.hideCloseBtn 	= true;
			flags.hideOnFocusLost = true;
			this.insertAttributeModal.setFlags(flags);
			this.insertAttributeModal.setVisible(false);
			this.insertAttributeModal.onAccept = (text) => {
					console.log("accepted: " + text);
					if (text != "") {
						let opt = this.insertAttributeModal.editedNode.settings.attributes.find(s => s.name == text);
						console.log("opt: ", opt, ", settings: ", this.insertAttributeModal.editedNode.settings);
						if (!opt) {
							opt = {};
							opt.name = text;
							opt.value = "none";

							this.insertAttributeModal.editedNode.settings.attributes.push(opt);
						}
						this.onSelectTreeElement(this.insertAttributeModal.editedNode);
					}
					this.insertAttributeModal.setVisible(false);
				};

			let insertAttributeBtn = document.getElementById("insertAttributeBtn");
			insertAttributeBtn.addEventListener("click",
					() => {
						if (this.selectedNode) {
							console.log("Click ", this.selectedNode);
							this.insertAttributeModal.editedNode = this.selectedNode;
							this.insertAttributeModal.setSearchText("");
							this.insertAttributeModal.setVisible(true);
						}
					}
				);
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
			this.selectedNode = node;
			this.treeView.selectedNode = node;

			this.propertiesWindowCtx.innerHTML = "";

			if (node.isTextNode()) {
				this.editContentModal.setContentText(node.text);
				this.editContentModal.setVisible(true);
				this.editContentModal.editedNode = node;
			}
			else {

				this.propertiesWindow = new PropertiesWindow(node, node.settings);
				this.propertiesWindow.render(this.propertiesWindowCtx);
				this.propertiesWindow.onRedrawNeeded = () => {
						this.propertiesWindowCtx.innerHTML = "";
						this.propertiesWindow.currentConfig = node.settings;
						this.propertiesWindow.render(this.propertiesWindowCtx);
					};
			}

			this.documentTree.rebuild();
		}
	}

	onKeyUp(event) {

		if (event.shiftKey && this.selectedNode) {
			// left
			if (event.keyCode == 37)
				this.documentTree.moveOuter(this.selectedNode);
			// Right arrow
			else if (event.keyCode == 39)
				this.documentTree.moveInner(this.selectedNode);
			// Up arrow
			else if (event.keyCode == 38)
				this.documentTree.moveUp(this.selectedNode);
			// Down arrow
			else if (event.keyCode == 40)
				this.documentTree.moveDown(this.selectedNode);

			this.documentTree.rebuild();
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