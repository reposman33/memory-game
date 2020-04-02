class I18n {
	static defaultLanguage: string = "en";
	static tokens: { [key: string]: any } = {
		HEADER: {
			en: "Test your short term memory! Find the pairs in the puzzle",
			nl: "Hoe goed is jouw geheugen? Vind de gelijke kaarten"
		},
		BUTTON_START_ACTIVE: { en: "Start the puzzle", nl: "Start de puzzel" },
		BUTTON_START_DEMO: { en: "Show demo", nl: "Klik voor een demo" },
		BUTTON_START_INACTIVE: { en: "puzzling...", nl: "puzzelen..." },

		BUTTON_START_TITLE: {
			en: "Click 'Start' to start the puzzle",
			nl: "Klik op 'Start' om de puzzel te beginnen"
		},
		SCOREBOARD_HEADER: { en: "Score", nl: "Stand" },
		SCOREBOARD_TIMEOUT: {
			en: "Bummer! You didn't finish in time",
			nl: "Helaas, je hebt het niet binnen de gestelde tijd gehaald"
		},
		SCOREBOARD_WIN: {
			en: "Great work! You discovered all pairs in time!",
			nl: "Bravo! Je hebt alle dubbele kaarten gevonden!"
		},
		SCOREBOARD_CURRENTSCORE_LABEL: { en: "Your current score:", nl: "Je score is:" },
		SCOREBOARD_CURRENTMOVE_LABEL: { en: "Used moves:", nl: "Aantal pogingen:" }
	};
	static get(key: string) {
		return I18n["tokens"][key][navigator.language.substr(0, 2)]
			? this.tokens[key][navigator.language.substr(0, 2)]
			: this.tokens[key][I18n.defaultLanguage];
	}
}

export { I18n };
