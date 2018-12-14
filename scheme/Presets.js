globalConfig.editors = {
	border: {
		type: EditorType.List,
		options: [
			{ name: "solid", value: "solid" },
			{ name: "dotted", value: "dotted" },
			{ name: "dashed", value: "dashed" }
		]
	},	
	fontWeight: {
		type: EditorType.Slider,
		min: 100,
		max: 700,
		step: 100
	},	
	fontFamily: {
		type: EditorType.Text
	}	
};