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
		super();
		this.element = element;
		this.currentConfig = currentConfig;
		this.scheme = scheme;
		this.spawnedEditors = [];
		// TODO: //this.importValues();
	}

	render(ctx)
	{
		this.spawnedEditors = [];
		if (this.scheme.categories.length > 0)
		{
			let ul = document.createElement("ul");
			ctx.appendChild(ul);
			for (let i = 0; i < this.scheme.categories.length; i++)
			{
				this.renderCategory(ul, this.scheme.categories[i]);
			}
		}	
	}

	renderCategory(ctx, category)
	{
		let li = document.createElement("li");
		ctx.appendChild(li);

		let header = document.createElement("h3");
		header.innerHTML = category.name;
		li.appendChild(header);
	
		if (category.properties.length > 0)
		{
			let propsUl = document.createElement("ul");
			li.appendChild(propsUl);

			for(let j = 0; j < category.properties.length; j++)
			{
				this.renderProperty(li, category.properties[j]);
			}
		}
	}

	renderProperty(ctx, property)
	{
		let propLi = document.createElement("li");
		ctx.appendChild(propLi);

		let propsNameNode = document.createElement("p");
		propsNameNode.innerHTML = property.name;

		propLi.appendChild(propsNameNode);

		let editorContainer = document.createElement("div");
		editorContainer.className += " ez-prop-editor-container";
		propLi.appendChild(editorContainer);
		
		let editor = this.spawnEditor(property);
		editor.onValueChanged = (v) => {
			let found = false;

			if (this.element.settings === undefined)
				this.element.settings = [];
			for(let i = 0; i < this.element.settings.length; ++i) {
				if (this.element.settings[i].name == property.stylePropertyName)
				{
					this.element.settings[i].value = v;
					found = true;
					break;
				}
			}
			if (!found)
				this.element.settings.push({ name: property.stylePropertyName, value: v });

			applyStyle(this.element.ref, this.element.settings);
		}
		editor.render(editorContainer);
		this.spawnedEditors.push(editor);
	}

	spawnEditor(prop)
	{	
		let editorScheme = eval("globalConfig.editors." + prop.editorPreset);
		switch(editorScheme.type)
		{
			case EditorType.Raw: 			return new RawPropertyEditor(editorScheme);
			case EditorType.Text: 			return new TextPropertyEditor(editorScheme);
			case EditorType.Number: 		return new NumberPropertyEditor(editorScheme);
			case EditorType.InputNumber: 	return new InputNumberPropertyEditor(editorScheme);
			case EditorType.Slider: 		return new SliderPropertyEditor(editorScheme);
			case EditorType.Predefined: 	return new PredefinedPropertyEditor(editorScheme);
			case EditorType.List: 			return new ListPropertyEditor(editorScheme);
			default: return null;
		}
	}
}