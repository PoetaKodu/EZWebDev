globalConfig.styleGroups = [
	{
		name: "Obramowanie",
		value: "border"
	},
	{
		name: "Czcionka",
		value: "font"
	}
];
globalConfig.styleProperties = [
	// Border:
	{
		name: "Styl",
		group: "border",
		styleName: "border-style",
		type: EditorType.List,
		options: [
			{ name: "none", value: "none" },
			{ name: "solid", value: "solid" },
			{ name: "dotted", value: "dotted" },
			{ name: "dashed", value: "dashed" }
		]
	},

	// Font:
	{
		name: "Rodzina",
		group: "font",
		styleName: "font-family",
		type: EditorType.Text
	},
	{
		name: "Waga",
		group: "font",
		styleName: "font-weight",
		type: EditorType.Slider,
		min: 100,
		max: 700,
		step: 100
	}
]