let ValueType = {
	Raw: 0,
	Text: 1,
	Number: 2,
	Color: 3,
	Predefined: 4
};

class PropertyEditor {
	constructor(scheme) {
		this.scheme = scheme;
		this.value = null;
	}
	render(ctx) {
		let e = this.renderImpl(ctx);
		this.applySchemeStyle(e);
		return e;
	}
	renderImpl(ctx) {}
	applySchemeStyle(rendered) {
		rendered.className += " " + this.scheme.styleClass;
	}
}

class RawPropertyEditor 
	extends PropertyEditor
{
	renderImpl(ctx) {
		let e = document.createElement("input");
		e.setAttribute("type", "text");
		return e;
	}
}

class TextPropertyEditor
	extends RawPropertyEditor
{
}

class NumberPropertyEditor extends PropertyEditor
{
}

class InputNumberPropertyEditor
	extends NumberPropertyEditor
{	
	renderImpl(ctx) {
		let e = document.createElement("input");
		e.setAttribute("type", "number");
		return e;
	}
}

class SliderPropertyEditor
	extends NumberPropertyEditor
{	
	renderImpl(ctx) {
		let e = document.createElement("div");

		let slider = document.createElement("input");
		e.appendChild(slider);
		slider.setAttribute("type", "range");
		slider.setAttribute("min", this.scheme.minValue);
		slider.setAttribute("max", this.scheme.maxValue);

		let valueIndicator = document.createElement("p");
		slider.addEventListener("change",
				function() {
					valueIndicator.innerHTML = slider.value;
				}
			);
		valueIndicator.className += "ez-slider-value";
		e.appendChild(valueIndicator);
		return e;
	}
}

class PredefinedPropertyEditor
	extends PropertyEditor
{
	renderImpl(ctx) {
		let e = document.createElement("select");

		for(let i = 0; i < this.scheme.options; i++)
		{
			let opt = this.scheme.options[i];
			let optNode = document.createElement("option");
			optNode.innerHTML = opt.content;
			optNode.setAttribute("value", opt.value);
			e.appendChild(optNode);
		}
		return e;
	}
}

class ListPropertyEditor
	extends PredefinedPropertyEditor
{
}