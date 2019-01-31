class DocumentTree
{
    constructor(outputCtx) {
        this.root = null;
        this.outputCtx = outputCtx;
        this.onRebuildNeeded = null;
    }

    reparent(node, newParent) {
        if (this.root != node) {
            let p = node.parent;
            let idx = p.children.findIndex(c => c == node);
            
            node.parent.children.splice(idx, 1);
            newParent.children.push(node);
            node.parent = newParent;
        }
    }

    moveUp(node) {
        if (node.parent) {
            let p = node.parent;
            let idx = p.children.findIndex(c => c == node);
            if (idx > 0)
            {
                let temp = p.children[idx - 1];
                p.children[idx - 1] = node;
                p.children[idx] = temp;
            }
        }
    }

    moveDown(node) {
        if (node.parent) {
            let p = node.parent;
            let idx = p.children.findIndex(c => c == node);
            if (idx + 1 < p.children.length)
            {
                let temp = p.children[idx + 1];
                p.children[idx + 1] = node;
                p.children[idx] = temp;
            }
        }
    }

    moveInner(node) {
        if (node.parent)
        {
            let p = node.parent;
            let idx = p.children.findIndex(c => c == node);
            if (idx > 0 && p.children[idx - 1].isTagNode()) {
                this.reparent(node, p.children[idx - 1]);
            }
        }
    }


    moveOuter(node) {
        if (node.parent && node.parent.parent)
        {
            let prevParent = node.parent;
            this.reparent(node, node.parent.parent);

            let pIdx = prevParent.parent.children.findIndex(c => c == prevParent);
            let idx = prevParent.parent.children.findIndex(c => c == node);
            while (idx != pIdx + 1) {
                this.moveUp(node);
                idx = prevParent.parent.children.findIndex(c => c == node);
            }
        }
    }

    insert(tag, parent)
    {
        if (!parent || parent.isTagNode())
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
        return null;
    }

    insertText(parent, text) {
        let node = this.insert("text", parent);
        node.text = text;
        return node;
    }

    erase(node)
    {
        if (this.root != node)
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
        if (treeNode.isTagNode())
        {
            let childElement = this.buildElement(treeNode);
            treeNode.ref = childElement;
            treeElement.appendChild(childElement);
            for(let i = 0; i < treeNode.children.length; i++)
            {
                this.rebuildImpl(treeNode.children[i], childElement);
            }
        }
        else {
            treeElement.insertAdjacentHTML("beforeend", treeNode.text);
        }
    }

    buildElement(node)
    {
        let e = document.createElement(node.tag);
        e.setAttribute("ez", "");
        applyStyle(e, node.settings.styles);
        applyAttributes(e, node.settings.attributes);

        return e;         
    }
}