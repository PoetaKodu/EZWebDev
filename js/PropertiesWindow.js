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
		

		{
			let categories = [];
			let stylesCtr = document.createElement("div");
			stylesCtr.setAttribute("class", "ez-prop-window-styles-ctr");
			ctx.appendChild(stylesCtr);
			
			let ul = document.createElement("ul");
			stylesCtr.appendChild(ul);
			
			for (let i = 0; i < this.currentConfig.styles.length; i++)
			{
				let prop = getStyleProperty(this.currentConfig.styles[i].name);

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

				this.renderProperty(group.childrenList, prop, this.currentConfig.styles[i].value);
			}
		}
		{
			let categories = [];
			let attribsCtr = document.createElement("div");
			attribsCtr.setAttribute("class", "ez-prop-window-attribs-ctr");
			ctx.appendChild(attribsCtr);
			
			let ul = document.createElement("ul");
			attribsCtr.appendChild(ul);
			
			for (let i = 0; i < this.currentConfig.attributes.length; i++)
			{
				let prop = getAttributeProperty(this.currentConfig.attributes[i].name);

				let groupName = getAttributeGroupName(prop.group);
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

				this.renderProperty(group.childrenList, prop, this.currentConfig.attributes[i].value, false);
			}
		}	
	}

	renderProperty(ctx, property, value, isStyle = true)
	{
		let propLi = document.createElement("li");
		ctx.appendChild(propLi);

		let propsNameNode = document.createElement("p");
		propsNameNode.innerHTML = property.name + "<span class=\"ez-prop-style-name\">" + property.codeName + "</span>";

		propLi.appendChild(propsNameNode);
		this.addControlButtons(propLi, property, isStyle);

		let editorContainer = document.createElement("div");
		editorContainer.className += " ez-prop-editor-container";
		propLi.appendChild(editorContainer);
		
		let editor = this.spawnEditor(property, value);
		//editor.setValue();
		
		editor.onValueChanged = (v) => {
			let found = false;

			let props = isStyle ? this.element.settings.styles : this.element.settings.attributes;

			if (props === undefined)
				props = [];
			for(let i = 0; i < props.length; ++i) {
				if (props[i].name == property.codeName)
				{
					props[i].value = v;
					found = true;
					break;
				}
			}
			if (!found)
				props.push({ name: property.codeName, value: v });

			if (isStyle)
				applyStyle(this.element.ref, props);
			else
				applyAttributes(this.element.ref, props);
		}
		editor.render(editorContainer);
		this.spawnedEditors.push(editor);
	}

	addControlButtons(ctx, property, isStyle=true)
	{
		let ctrlsCnt = document.createElement("div");
		ctx.appendChild(ctrlsCnt);

		{
			let btn = document.createElement("button");
			btn.setAttribute("class", "ez-ctrl-btn");
			ctrlsCnt.appendChild(btn);
			btn.innerHTML = "-";

			btn.addEventListener("click",
					() => {
						let props = isStyle ? this.element.settings.styles : this.element.settings.attributes;

						let propIndex = props.findIndex( e => e.name == property.codeName );
						if (propIndex != -1) {
							props.splice(propIndex, 1);
							if (isStyle)
								applyStyle(this.element.ref, props);
							else
								applyAttributes(this.element.ref, props);

							if (this.onRedrawNeeded != null)
								this.onRedrawNeeded();
						}
					}
				);
		}
	}

	spawnEditor(prop, value)
	{	
		let editorScheme = prop;
		switch(editorScheme.type)
		{
			case EditorType.Raw: 			return new RawPropertyEditor(editorScheme, value);
			case EditorType.Text: 			return new TextPropertyEditor(editorScheme, value);
			case EditorType.Number: 		return new NumberPropertyEditor(editorScheme, value);
			case EditorType.InputNumber: 	return new InputNumberPropertyEditor(editorScheme, value);
			case EditorType.Slider: 		return new SliderPropertyEditor(editorScheme, value);
			case EditorType.Predefined: 	return new PredefinedPropertyEditor(editorScheme, value);
			case EditorType.List: 			return new ListPropertyEditor(editorScheme, value);
			default: return null;
		}
	}
}