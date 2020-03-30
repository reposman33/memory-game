import React, { useState, useEffect } from "react";
import { I18n } from "../services/I18n";
import styles from "./scoreBoard.module.scss";

const ScoreBoard = (props: { score: number; updateScoreBoardReference: Function }) => {
	const [score, setScore] = useState(props.score);
	const [moveCount, setMoveCount] = useState(0);
	useEffect(
		() =>
			props.updateScoreBoardReference({
				incrementScore: () => setScore(score + 1),
				incrementMoveCount: () => setMoveCount(moveCount + 1)
			}),
		[moveCount, props, score]
	);

	return (
		<div className={styles.header}>
			{I18n.get("SCOREBOARD_CURRENTSCORE_LABEL")} {score} {I18n.get("SCOREBOARD_CURRENTMOVE_LABEL")} {moveCount}
		</div>
	);
};

export { ScoreBoard };
