import React, { useState, useEffect } from "react";
import { I18n } from "../services/I18n";
import styles from "./scoreBoard.module.scss";

const ScoreBoard = (props: { score: number; updateScoreBoardReference: Function }) => {
	const [score, setScore] = useState(props.score);
	const [moveCount, setMoveCount] = useState(0);
	const [scoreBoardVisibility, setScoreBoardVisibility] = useState(false);
	const [gameOverText, setGameOverText] = useState();

	useEffect(
		() =>
			props.updateScoreBoardReference({
				incrementScore: () => setScore(score + 1),
				incrementMoveCount: () => setMoveCount(moveCount + 1),
				setScoreBoardVisibility: (mode: boolean) => setScoreBoardVisibility(mode),
				showGameOverText: (text: string) => setGameOverText(text)
			}),
		[moveCount, props, score]
	);

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
