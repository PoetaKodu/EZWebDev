class ModalWindowFlags {
	constructor()
	{
		this.hideTitle			= false;
		this.hideCloseBtn 		= false;
		this.hideOnFocusLost	= false;
	}
}

class ModalWindow
{
	constructor(ctx_)
	{
		this.ctx = ctx_;

		this.detectCtxElements();
	}

	setVisible(visible_)
	{
		this.ctx.style.display = visible_ ? "" : "none";
	}

	isVisible() {
		return !!this.ctx &&
		!!( this.ctx.offsetWidth ||
			this.ctx.offsetHeight ||
			this.ctx.getClientRects().length );
	}

	setLocation(x, y)
	{
		if (typeof x == "string")
			this.ctx.style.left = x;
		else
			this.ctx.style.left = x + "px";

		if (typeof x == "string")
			this.ctx.style.top = y;
		else
			this.ctx.style.top = y + "px";
	}

	detectCtxElements()
	{
		this.closeBtn = this.ctx.querySelector(".ez-modal-close-btn");
		this.title = this.ctx.querySelector("header");
	}

	setFlags(flags)
	{
		this.flags = flags;

		if (this.title)
			this.title.style.display = flags.hideTitle ? "none" : "";

		if (this.closeBtn)
		{
			this.closeBtn.style.display = flags.hideTitle ? "none" : "";
			if (!flags.hideTitle)
				this.closeBtn.addEventListener("click", () => { this.setVisible(false); });
		}

		if (flags.hideOnFocusLost)
			this.registerOutsideClickHandler();
	}

	registerOutsideClickHandler() {
		const handler = event => {
			if (!this.ctx.contains(event.target)) {
				if (this.isVisible()) {
					this.setVisible(false);
					removeHandler();
				}
			}
		}
		const removeHandler = () => {
			document.removeEventListener("click", handler);
		}
		document.addEventListener("click", handler);
	}
}