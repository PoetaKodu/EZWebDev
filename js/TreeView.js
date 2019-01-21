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
		let text = document.createElement("p");
		text.innerHTML = node.tag;
		ctx.appendChild(text);

		this.addControlButtons(ctx, node);

		let this_ = this;
		text.addEventListener("click",
				function()
				{
					if (this_.onSelectTreeElement !== null)
						this_.onSelectTreeElement(node);
				}
			);

		if (node.children.length > 0)
		{
			let ul = document.createElement("ul");
			ctx.appendChild(ul);
			for(let i = 0; i < node.children.length; i++)
			{
				let nodeChild = node.children[i];
				let li = document.createElement("li");
				ul.appendChild(li);
				
				this.renderImpl(li, nodeChild);
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