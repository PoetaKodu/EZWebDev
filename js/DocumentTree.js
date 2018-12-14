class DocumentTree
{
    constructor(outputCtx) {
        this.root = null;
        this.outputCtx = outputCtx;
        this.onRebuildNeeded = null;
    }

    insert(tag, parent)
    {
        let node = new DocumentNode(tag);
        if (this.root === null) {
            this.root = node;
            node.parent = null;   
        }
        else {
            node.parent = parent;
            parent.children.push(node);
        }
        return node;
    }

    erase(node)
    {
        if (this.root == node)
            this.root = null;
        else
        {
            let parent = node.parent;
            let id = parent.children.findIndex(n => (n == node));
            if (id != -1)
                parent.children.splice(id, 1);
        }
    }

    rebuild(treeElement)
    {
        if (treeElement === undefined)
            treeElement = this.outputCtx;

        treeElement.innerHTML = "";
        if (this.root !== null)
            this.rebuildImpl(this.root, treeElement);

        if (this.onRebuildNeeded !== null)
            this.onRebuildNeeded();
    }

    rebuildImpl(treeNode, treeElement)
    {
        let childElement = this.buildElement(treeNode);
        treeNode.ref = childElement;
        treeElement.appendChild(childElement);
        for(let i = 0; i < treeNode.children.length; i++)
        {
            this.rebuildImpl(treeNode.children[i], childElement);
        }
    }

    buildElement(node)
    {
        let e = document.createElement(node.tag);
        e.setAttribute("ez", "");
        
        let s = node.settings;
        for(let i = 0; i < s.length; i++)
        {
            
        }

        return e;
    }
}