class AttributePropertyEvaluator
	extends PropertyEvaluator
{
	evaluate(element, properties) {
		if (typeof properties == "array")
		{	
			for(let i = 0; i < properties.length; i++)
			{
				element.setAttribute(properties[i].name, properties[i].value);
			}
		}
	}
}