class TreeView extends UiWindow
{
	constructor(documentTree, ctx) {
		super();
		this.context = ctx;
		this.documentTree = documentTree;
		this.onSelectTreeElement = null;
		let this_ = this;
		this.documentTree.onRebuildNeeded = function() { this_.render(); };
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

		// Setup ndRowCtr - the most outer div.
		let ndRowCtr = document.createElement("div");
		ctx.appendChild(ndRowCtr);

		// Setup ndTagName - the <p> with tag name.
		let ndTagName = document.createElement("p");
		ndTagName.innerHTML = node.tag;
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
		let this_ = this;

		let ctrlsCnt = document.createElement("div");
		treeViewElement.appendChild(ctrlsCnt);

		{
			let btn = document.createElement("button");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = "+";
			btn.addEventListener("click",
					function()
					{
						this_.documentTree.insert("div", node);
						this_.documentTree.rebuild();
					}
				);
		}
		{
			let btn = document.createElement("button");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = "-";

			btn.addEventListener("click",
					function()
					{
						this_.documentTree.erase(node);
						this_.documentTree.rebuild();
					}
				);
		}
	}
}