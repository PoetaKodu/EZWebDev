class NodeInserter extends UiWindow
{
    constructor(parent)
    {
        this.parent = parent;
    }

    insert(tag) {
        let node = document.createElement(tag);
        node.settings = {};
        node.setAttribute("ez", "");
        this.parent.appendChild(node);
    }
}