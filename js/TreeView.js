// class TreeViewElement
// {
// 	constructor(tag, elemRef) {
// 		this.tag = tag;
// 		this.elemRef = elemRef;
// 		this.children = [];
// 	}

// 	dropChildren() {
// 		this.children = [];
// 	}
// 	addChild(child) {
// 		this.children.push(child);
// 	}
// }

// class TreeView extends UiWindow
// {
// 	constructor(srcNode)
// 	{
// 		super();
// 		this.srcNode = srcNode;
// 		this.rootNode = new TreeViewElement("body", null);
// 	}

// 	generate() {
// 		let v = document.createElement("div");
// 		this.render(v, this.rootNode);
// 		return v;
// 	}

// 	render(ctx, renderCfg)
// 	{
// 		this.renderImpl(ctx, undefined, renderCfg);
// 	}

// 	renderImpl(start, root, renderCfg)
// 	{
// 		if (root === undefined)
// 			root = this.rootNode;
// 		if (root.children.length > 0)
// 		{
// 			let ul = document.createElement("ul");
// 			start.appendChild(ul);
// 			for(let i = 0; i < root.children.length; i++)
// 			{
// 				let e = root.children[i];
// 				let li = document.createElement("li");
// 				ul.appendChild(li);
// 				let text = document.createElement("p");
// 				text.innerHTML = e.tag;
// 				li.appendChild(text);
				
// 				if (renderCfg !== undefined)
// 				{
// 					text.addEventListener("click",
// 							function() {
// 								console.log("click");
// 								renderCfg.clickFn(e);
// 							}
// 						);
// 				}
				
// 				this.renderImpl(li, e);
// 			}
// 		}
// 	}

// 	generateTreeElements(src, root)
// 	{
// 		if (src == undefined)
// 			src = this.srcNode;
			
// 		if (root == undefined)
// 		{
// 			root = this.rootNode;
// 			root.dropChildren();
// 		}

// 		for(let i = 0; i < src.children.length; i++)
// 		{
// 			let e = src.children[i];
// 			if (e.hasAttribute("ez")) {
// 				root.addChild(new TreeViewElement(e.tagName.toLowerCase(), e));
// 			}
// 		}

// 		for(let i = 0; i < root.children.length; i++)
// 		{
// 			let e = root.children[i];
// 			this.generateTreeElements(e.elemRef, e);
// 		}
// 	}

// }


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