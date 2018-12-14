class TreeViewElement
{
	constructor(tag, elemRef) {
		this.tag = tag;
		this.elemRef = elemRef;
		this.children = [];
	}

	dropChildren() {
		this.children = [];
	}
	addChild(child) {
		this.children.push(child);
	}
}

class TreeView extends UiWindow
{
	constructor(srcNode)
	{
		this.srcNode = srcNode;
		this.rootNode = new TreeViewElement("body", null);
	}

	generate() {
		let v = document.createElement("div");
		this.render(v, this.rootNode);
		return v;
	}

	render(start, root)
	{
		if (root == undefined)
			root = this.rootNode;
		if (root.children.length > 0)
		{
			let ul = document.createElement("ul");
			start.appendChild(ul);
			for(let i = 0; i < root.children.length; i++)
			{
				let e = root.children[i];
				let li = document.createElement("li");
				ul.appendChild(li);
				let text = document.createTextNode(e.tag);
				li.appendChild(text);
				this.render(li, e);
			}
		}
	}

	generateTreeElements(src, root)
	{
		if (src == undefined)
			src = this.srcNode;
			
		if (root == undefined)
		{
			root = this.rootNode;
			root.dropChildren();
		}

		for(let i = 0; i < src.children.length; i++)
		{
			let e = src.children[i];
			if (e.hasAttribute("ez")) {
				root.addChild(new TreeViewElement(e.tagName.toLowerCase(), e));
			}
		}

		for(let i = 0; i < root.children.length; i++)
		{
			let e = root.children[i];
			this.generateTreeElements(e.elemRef, e);
		}
	}

}