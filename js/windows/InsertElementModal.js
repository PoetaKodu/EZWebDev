class InsertElementModalWindow
	extends ModalWindow
{

	constructor(ctx_) {
		super(ctx_);
		this.onAccept = null;
	}

	detectCtxElements() {
		super.detectCtxElements();

		this.searchBox = this.ctx.querySelector(".ez-search-box");

		this.searchBox.addEventListener("keyup", 
				(event) => {
					if (this.onAccept && event.keyCode == 13)
						this.onAccept(this.searchBox.value);
				}
			);
	}

	setSearchText(text) {
		this.searchBox.value = text;
	}
	
}