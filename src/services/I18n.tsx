class I18n {
	static tokens: { [key: string]: any } = {
		HEADER: {
			en: "Test your short term memory! Find the pairs in the puzzle",
			nl: "Hoe goed is jouw geheugen? Vind de gelijke kaarten"
		},
		BUTTON_START: { en: "Start the puzzle", nl: "Start de test" },
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
			nl: "Bravo! Alle je vond alle dubbele kaarten op tijd!"
		}
	};
	static get(key: string) {
		return I18n["tokens"][key] ? this.tokens[key][navigator.language] : "";
	}
}

export { I18n };
