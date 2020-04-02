import React from "react";
import { I18n } from "../services/I18n";
import styles from "./scoreBoard.module.scss";

const ScoreBoard = ({
	score,
	moveCount,
	scoreBoardVisibility,
	gameOverText
}: {
	score: number;
	moveCount: number;
	scoreBoardVisibility: boolean;
	gameOverText: string;
}) => {
	const scoreBoardContent = () =>
		scoreBoardVisibility
			? `${I18n.get("SCOREBOARD_CURRENTSCORE_LABEL")} ${score} ${I18n.get(
					"SCOREBOARD_CURRENTMOVE_LABEL"
			  )} ${moveCount}`
			: "";

	return (
		<React.Fragment>
			{gameOverText && (
				<div className={`${styles.gameOver} ${gameOverText ? styles.rotate : ""}`}>{gameOverText}</div>
			)}
			<div className={styles.header}>{scoreBoardContent()}</div>
		</React.Fragment>
	);
};

export { ScoreBoard };
