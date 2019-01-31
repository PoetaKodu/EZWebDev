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
	constructor(scheme, defaultValue) {
		this.scheme = scheme;
		this.defaultValue = defaultValue;
		this.onValueChanged = null;
	}
	render(ctx) {
		let e = this.renderImpl(ctx);
		this.applySchemeStyle(e);
		ctx.appendChild(e);
		return e;
	}
	valueChanged(val) {
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
		if (this.defaultValue !== undefined)
			e.value = this.defaultValue;

		e.addEventListener("change", () => this.valueChanged(e.value) );
		e.addEventListener("keyup", () => this.valueChanged(e.value) );
		e.addEventListener("keydown", () => this.valueChanged(e.value) );

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
		if (this.defaultValue !== undefined)
			e.value = this.defaultValue;

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
		if (this.defaultValue !== undefined)
			slider.value = this.defaultValue;

		let valueIndicator = document.createElement("p");
		valueIndicator.className += "ez-slider-value";
		valueIndicator.innerHTML = slider.value;
		e.appendChild(valueIndicator);

		let onChange = () => {
			valueIndicator.innerHTML = slider.value;
			this.valueChanged(slider.valueAsNumber);
		};

		slider.addEventListener("change", () => onChange() );
		slider.addEventListener("mousemove", () => onChange() );
		
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
		if (this.defaultValue !== undefined)
			e.value = this.defaultValue;

		e.addEventListener("change", () => { this.valueChanged(e.value); } );
		return e;
	}
}

class ListPropertyEditor
	extends PredefinedPropertyEditor
{
}