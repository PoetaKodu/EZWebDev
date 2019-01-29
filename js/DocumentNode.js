class DocumentNode
{
    constructor(tag)
    {
        this.tag = tag;
        this.text = null;
        this.settings = [];
        this.children = [];
        this.ref = null;
    }

    isTagNode() {
        return !this.isTextNode();
    }

    isTextNode() {
        return this.text != null;
    }
}