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

globalConfig.attributeGroups = [
	{
		name: "Kotwice",
		value: "anchors"
	},
	{
		name: "Ogólne",
		value: "generic"
	}
];

globalConfig.attributeProperties = [
	// generic:
	{
		name: "Typ pola",
		group: "generic",
		codeName: "type",
		type: EditorType.Text
	},
	// anchors:
	{
		name: "Odnośnik",
		group: "anchors",
		codeName: "href",
		type: EditorType.Text
	}
];

globalConfig.styleProperties = [
	// Border:
	{
		name: "Styl",
		group: "border",
		codeName: "border-style",
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
		codeName: "border-width",
		type: EditorType.Text
	},
	{
		name: "Promień rogów",
		group: "border",
		codeName: "border-radius",
		type: EditorType.Text
	},
	{
		name: "Kolor",
		group: "border",
		codeName: "border-color",
		type: EditorType.Text
	},

	// Font:
	{
		name: "Rodzina",
		group: "font",
		codeName: "font-family",
		type: EditorType.Text
	},
	{
		name: "Rozmiar",
		group: "font",
		codeName: "font-size",
		type: EditorType.Text
	},
	{
		name: "Wariant",
		group: "font",
		codeName: "font-variant",
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
		codeName: "font-weight",
		type: EditorType.Slider,
		min: 100,
		max: 700,
		step: 100
	},

	// Positioning:
	{
		name: "Pływanie",
		group: "positioning",
		codeName: "float",
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