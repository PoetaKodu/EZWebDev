class PropertyWindowCategory
{
	constructor(name) {
		this.name = name;
		this.properties = [];
	}
}

class PropertiesWindow extends UiWindow
{
	constructor(element, currentConfig, scheme) {
		this.element = element;
		this.currentConfig = currentConfig;
		this.scheme = scheme;
		this.importScheme();
		this.importValues();
	}

	render(ctx)
	{
		if (this.scheme.categories.length > 0)
		{
			let ul = document.createElement("ul");
			for (let i = 0; i < this.scheme.categories; i++)
			{
				let cat = this.scheme.categories[i];


				let li = document.createElement("li");
				ul.appendChild(li);

				let header = document.createElement("h3");
				header.innerHTML = cat.name;
				li.appendChild(header);
			
				if (cat.properties.length > 0)
				{
					let propsUl = document.createElement("ul");
					li.appendChild(propsUl);

					for(let j = 0; j < cat.properties; j++)
					{
						let prop = cat.properties[j];

						let propLi = document.createElement("li");
						propsUl.appendChild(propLi);
						let propsNameNode = document.createElement("p");
						propsNameNode.innerHTML = prop.name;
						propLi.appendChild(propsNameNode);

						let editorContainer = document.createElement("div");
						editorContainer.className += " ez-prop-editor-container";
						propLi.appendChild(editorContainer);
						
						let editor = this.spawnEditor(prop);
						// TODO: remove this:
						if (editor != null)
							editor.render(editorContainer);
					}
				}
			}
			ctx.appendChild(ul);
		}	
	}

	spawnEditor(prop) {
		return null;
	}
}