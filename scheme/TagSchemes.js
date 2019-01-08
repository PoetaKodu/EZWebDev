globalConfig.tagSchemes = {
	p: {
		categories: [
			{
				name: "Border",
				properties: [
					{ name: "Style", stylePropertyName: "border-style", editorPreset: "border" },
				]
			},
			{
				name: "Font",
				properties: [
					{ name: "Weight", stylePropertyName: "font-weight", editorPreset: "fontWeight" },
					{ name: "Family", stylePropertyName: "font-family", editorPreset: "fontFamily" }
				]
			}
		]
	},
	div: {
		categories: [
			{
				name: "Border",
				properties: [
					{ name: "Style", stylePropertyName: "border-style", editorPreset: "border" }
				]
			},
			{
				name: "Font",
				properties: [
					{ name: "Weight", editorPreset: "fontWeight" },
					{ name: "Family", editorPreset: "fontFamily" }
				]
			}
		]
	}
}