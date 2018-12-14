class StylePropertyEvaluator
	extends PropertyEvaluator
{
	evaluate(element, properties) {
		let s = "";
		if (typeof properties == "array")
		{	
			for(let i = 0; i < properties.length; i++)
			{
				if (i != 0)
					s += ";";
				let p = properties[i];
				s += p.name + ": " + p.value;
			}
			element.setAttribute("style", s);
		}
	}
}