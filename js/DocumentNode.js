class DocumentNode
{
    constructor(tag)
    {
        this.tag = tag;
        this.text = null;
        this.settings = {
            styles: [],
            attributes: []
        };
        this.children = [];
        this.ref = null;
        this.collapsed = false;
    }

    isTagNode() {
        return !this.isTextNode();
    }

    isTextNode() {
        return this.text != null;
    }
}