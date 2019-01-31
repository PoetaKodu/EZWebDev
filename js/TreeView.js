class TreeView extends UiWindow
{
	constructor(documentTree, ctx) {
		super();
		this.context = ctx;
		this.documentTree = documentTree;
		this.documentTree.onRebuildNeeded = () => { this.render(); };

		// Callbacks:
		this.onSelectTreeElement 			= null;
		this.onWantsToInsertNewTreeElement 	= null;
		this.onWantsToRemoveTreeElement 	= null;
	}

	render() {
		this.context.innerHTML = "";
		this.renderImpl(this.context, this.documentTree.root);
	}

	renderImpl(ctx, node)
	{
		//	<div (ndRowCtr)>
		//		<p (ndTagName)>Tag</p>
		//		<div>
		//			<button>+</button>
		//			<button>-</button>
		//			<!-- ... control buttons -->
		//		</div>
		//	</div>
		//	<ul (ndChildren)>
		//		<li (ndChild)>Child element 1 (recurse)</li>
		//		<li (ndChild)>Child element 2 (recurse)</li>
		//		<!-- ... other children -->
		//	</ul>

		if (node.collapsed)
			ctx.setAttribute("collapsed", "true");

		if (this.selectedNode == node)
			ctx.setAttribute("selected", "true");
		else
			ctx.removeAttribute("selected");

		// Setup ndRowCtr - the most outer div.
		let ndRowCtr = document.createElement("div");
		ctx.appendChild(ndRowCtr);

		// Setup ndTagName - the <p> with tag name.
		let ndTagName = document.createElement("p");
		ndTagName.innerHTML = node.tag;
		if (node.isTextNode()) {
			let textNodeContent = document.createElement("span");
			textNodeContent.setAttribute("class", "ez-node-meta");
			textNodeContent.innerHTML = stripHTML(node.text);
			ndTagName.appendChild(textNodeContent);
		}
		ndTagName.addEventListener("click",
				() => {
					if (this.onSelectTreeElement !== null)
						this.onSelectTreeElement(node);
				}
			);
		ndRowCtr.appendChild(ndTagName);

		
		// Setup control buttons:
		this.addControlButtons(ndRowCtr, node);
		
		// Setup children:
		if (node.children.length > 0)
		{
			let ndChildren = document.createElement("ul");
			ctx.appendChild(ndChildren);
			for(let i = 0; i < node.children.length; i++)
			{
				let ndChild = document.createElement("li");
				ndChildren.appendChild(ndChild);
				
				this.renderImpl(ndChild, node.children[i]);
			}
		}
	}

	addControlButtons(treeViewElement, node)
	{
		let ctrlsCnt = document.createElement("div");
		treeViewElement.appendChild(ctrlsCnt);

		if (node.children.length > 0)
		{
			let btn = document.createElement("button");
			btn.setAttribute("class", "ez-ctrl-btn");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = node.collapsed ? "v" : ">";
			
			btn.addEventListener("click",
			() => {
				if (!node.collapsed) {
					node.collapsed = true;
					btn.innerHTML = ">";
					treeViewElement.parentNode.setAttribute("collapsed", "true");
				}
				else {
					node.collapsed = false;
					btn.innerHTML = "v";
					treeViewElement.parentNode.removeAttribute("collapsed");
				}
			}
			);
		}
		
		if (node.isTagNode())
		{
			let btn = document.createElement("button");
			btn.setAttribute("class", "ez-ctrl-btn");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = "+";
			btn.addEventListener("click",
			() => {
				if(this.onWantsToInsertNewTreeElement)
				this.onWantsToInsertNewTreeElement(node);
			}
			);
		}
		
		{
			let btn = document.createElement("button");
			btn.setAttribute("class", "ez-ctrl-btn");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = "-";

			btn.addEventListener("click",
					() => {
						this.documentTree.erase(node);
						this.documentTree.rebuild();
					}
				);
		}
	}
}