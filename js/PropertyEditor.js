let ValueType = {
	Raw: 0,
	Text: 1,
	Number: 2,
	Color: 3,
	Predefined: 4
};

let EditorType = {
	Raw: 0,
	Text: 1,
	Number: 2,
	InputNumber: 3,
	Slider: 4,
	Predefined: 5,
	List: 6
};

class PropertyEditor {
	constructor(scheme) {
		this.scheme = scheme;
		this.onValueChanged = null;
	}
	render(ctx) {
		let e = this.renderImpl(ctx);
		this.applySchemeStyle(e);
		ctx.appendChild(e);
		return e;
	}
	valueChanged(val) {
		console.log("On value changed: " + this.onValueChanged)
		if (this.onValueChanged != null)
			this.onValueChanged(val);
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
		e.addEventListener("change", () => this.valueChanged(e.value) );
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
		e.addEventListener("change", () => this.valueChanged(e.valueAsNumber) );
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
		slider.setAttribute("min", this.scheme.min);
		slider.setAttribute("max", this.scheme.max);
		slider.setAttribute("step", this.scheme.step);

		let valueIndicator = document.createElement("p");
		slider.addEventListener("change",
				() => {
					valueIndicator.innerHTML = slider.value;
					this.valueChanged(slider.valueAsNumber);
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
		for(let i = 0; i < this.scheme.options.length; i++)
		{
			let opt = this.scheme.options[i];
			let optNode = document.createElement("option");
			optNode.innerHTML = opt.name;
			optNode.setAttribute("value", opt.value);
			e.appendChild(optNode);
		}
		e.addEventListener("change",
				() => {
					console.log("New value: " + e.value)
					this.valueChanged(e.value);
				}
			);
		return e;
	}
}

class ListPropertyEditor
	extends PredefinedPropertyEditor
{
}