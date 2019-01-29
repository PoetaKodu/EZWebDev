class EditContentModalWindow
	extends ModalWindow
{

	constructor(ctx_) {
		super(ctx_);
		this.onAccept = null;
	}

	detectCtxElements() {
		super.detectCtxElements();

		this.textArea = this.ctx.querySelector("textarea");
		this.cancelBtn = this.ctx.querySelector(".ez-cancel-btn");
		this.acceptBtn = this.ctx.querySelector(".ez-accept-btn");

		this.cancelBtn.addEventListener("click", 
				() => {
					this.setVisible(false);
				}
			);
		this.acceptBtn.addEventListener("click", 
				() => {
					if (this.onAccept != null)
						this.onAccept(this.textArea.value);
				}
			);
	}

	setContentText(text) {
		this.textArea.value = text;
	}

}