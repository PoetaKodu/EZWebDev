globalConfig.styleGroups = [
	{
		name: "Obramowanie",
		value: "border"
	},
	{
		name: "Czcionka",
		value: "font"
	},
	{
		name: "Pozycjonowanie",
		value: "positioning"
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
	{
		name: "Szerokość",
		group: "border",
		styleName: "border-width",
		type: EditorType.Text
	},
	{
		name: "Promień rogów",
		group: "border",
		styleName: "border-radius",
		type: EditorType.Text
	},
	{
		name: "Kolor",
		group: "border",
		styleName: "border-color",
		type: EditorType.Text
	},

	// Font:
	{
		name: "Rodzina",
		group: "font",
		styleName: "font-family",
		type: EditorType.Text
	},
	{
		name: "Rozmiar",
		group: "font",
		styleName: "font-size",
		type: EditorType.Text
	},
	{
		name: "Wariant",
		group: "font",
		styleName: "font-variant",
		type: EditorType.List,
		options: [
			{ name: "unset", value: "unset" },
			{ name: "normal", value: "normal" },
			{ name: "small-caps", value: "small-caps" },
			{ name: "inherit", value: "inherit" },
			{ name: "initial", value: "initial" }
		]
	},
	{
		name: "Waga",
		group: "font",
		styleName: "font-weight",
		type: EditorType.Slider,
		min: 100,
		max: 700,
		step: 100
	},

	// Positioning:
	{
		name: "Pływanie",
		group: "positioning",
		styleName: "float",
		type: EditorType.List,
		options: [
			{ name: "left", value: "unset" },
			{ name: "right", value: "normal" },
			{ name: "none", value: "small-caps" },
			{ name: "inherit", value: "inherit" },
			{ name: "initial", value: "initial" }
		]
	},
]