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
				() => {
					this.generateElementList(this.searchBox.value);
				}
			);

		this.cardTemplate = this.ctx.querySelector(".ez-template");
		this.cardsCtr = this.ctx.querySelector(".ez-element-cards-ctr");
		this.generateElementList();
	}

	setSearchText(text) {
		this.searchBox.value = text;
	}

	setVisible(visible) {
		super.setVisible(visible);
		this.generateElementList();
	}

	dropCards() {
		while (this.cardsCtr.firstChild) {
			this.cardsCtr.removeChild(this.cardsCtr.firstChild);
		}
	}

	generateElementList(filter="") {
		this.dropCards();

		let list = globalConfig.documentElements;

		if (filter != "") {
			let filterUpper = filter.toUpperCase();
			list = list.filter(e => {
				let keywords = [];
				if (e.name !== undefined)
					keywords.push(e.name);
				if (e.tag !== undefined)
					keywords.push(e.tag);
				if (e.keywords !== undefined)
					keywords = keywords.concat(e.keywords);

				for(let i = 0; i < keywords.length; ++i) {
					if (keywords[i].toUpperCase().indexOf(filterUpper) != -1)
						return true;
				}
				return false;
			});
		}
		

		for (let i = 0; i < list.length; ++i)
		{
			let card = this.cardTemplate.cloneNode(true);
			card.setAttribute("class", "ez-element-card");

			let cardTitle = card.querySelector("h1");
			let cardDesc = card.querySelector("p");
			if (list[i].name !== undefined)
				cardTitle.innerHTML = list[i].name;
			else if (list[i].tag !== undefined)
				cardTitle.innerHTML = "&lt;" + list[i].tag + "&gt;";
				
			if (list[i].desc !== undefined)
				cardDesc.innerHTML = list[i].desc;

			if (this.onAccept != null) {
				card.addEventListener("click", () => {
						this.onAccept(list[i].value !== undefined ? list[i].value : list[i].tag);
					});
			}
			

			this.cardsCtr.appendChild(card);
		}
	}
	
}