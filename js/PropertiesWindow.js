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
		this.redrawNeeded = null;
		// TODO: //this.importValues();
	}

	render(ctx)
	{
		this.spawnedEditors = [];
		let categories = [];

		let ul = document.createElement("ul");
		ctx.appendChild(ul);
		
		for (let i = 0; i < this.currentConfig.length; i++)
		{
			let prop = getStyleProperty(this.currentConfig[i].name);

			let groupName = getStyleGroupName(prop.group);
			let group = categories.find(e => e.name == groupName);
			if (!group)
			{
				group = {};
				group.name = groupName;
				group.ref = document.createElement("li");
				
				let groupNameNode = document.createElement("h1");
				groupNameNode.innerHTML = groupName;
				group.ref.appendChild(groupNameNode);

				ul.appendChild(group.ref);

				group.childrenList = document.createElement("ul");
				group.ref.appendChild(group.childrenList);

				categories.push(group);
			}

			this.renderProperty(group.childrenList, prop);
		}
	}

	renderProperty(ctx, property)
	{
		let propLi = document.createElement("li");
		ctx.appendChild(propLi);

		let propsNameNode = document.createElement("p");
		propsNameNode.innerHTML = property.name + "<span class=\"ez-prop-style-name\">" + property.styleName + "</span>";

		propLi.appendChild(propsNameNode);
		this.addControlButtons(propLi, property);

		let editorContainer = document.createElement("div");
		editorContainer.className += " ez-prop-editor-container";
		propLi.appendChild(editorContainer);
		
		let editor = this.spawnEditor(property);
		//editor.setValue();
		
		editor.onValueChanged = (v) => {
			let found = false;

			if (this.element.settings === undefined)
				this.element.settings = [];
			for(let i = 0; i < this.element.settings.length; ++i) {
				if (this.element.settings[i].name == property.styleName)
				{
					this.element.settings[i].value = v;
					found = true;
					break;
				}
			}
			if (!found)
				this.element.settings.push({ name: property.styleName, value: v });

			applyStyle(this.element.ref, this.element.settings);
		}
		editor.render(editorContainer);
		this.spawnedEditors.push(editor);
	}

	addControlButtons(ctx, property)
	{
		let ctrlsCnt = document.createElement("div");
		ctx.appendChild(ctrlsCnt);

		{
			let btn = document.createElement("button");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = "-";

			btn.addEventListener("click",
					() => {
						let propIndex = this.element.settings.findIndex( e => e.name == property.styleName );
						if (propIndex != -1) {
							this.element.settings.splice(propIndex, 1);
							applyStyle(this.element.ref, this.element.settings);

							if (this.onRedrawNeeded != null)
								this.onRedrawNeeded();
						}
					}
				);
		}
	}

	spawnEditor(prop)
	{	
		let editorScheme = prop;
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