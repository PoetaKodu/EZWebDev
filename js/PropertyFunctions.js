// Sets attribute of the DOM element.
function applyAttribute(targetElement_, attributeProperty_)
{
	targetElement_.setAttribute(
			attributeProperty_.name,
			attributeProperty_.value
		);
}

// Sets attributes of the DOM element.
function applyAttributes(targetElement_, attributeProperties_)
{
	for(let i = 0; i < attributeProperties_.length; ++i)
		applyAttribute(targetElement_, attributeProperties_[i]);
}

// Evaluates single CSS rule to string.
function evaluateStyleRule(styleProperty_)
{
	return styleProperty_.name + ": " + styleProperty_.value;
}

// Evaluates multiple CSS rules to string.
function evaluateStyle(styleProperties_)
{
	let s = "";
	for(let i = 0; i < styleProperties_.length; ++i)
	{
		if (i != 0)
			s += ";";
		s += evaluateStyleRule(styleProperties_[i]);
	}
	return s;
}

// Applies style to DOM element (overrides previous style).
function applyStyle(targetElement_, styleProperties_)
{
	targetElement_.setAttribute("style", evaluateStyle(styleProperties_));
}
