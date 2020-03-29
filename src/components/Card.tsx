import React, { useState } from "react";
import { TCard } from "../types/Card";
import "./card.scss";

const Card = ({ card, onHandleClick }: { card: TCard; onHandleClick: Function }) => {
	const [flippedState, setFlippedState] = useState(false);

	function flipCard(newState: boolean) {
		setFlippedState(newState);
	}

	const onClick = () => {
		flipCard(true);
		onHandleClick({
			row: card.row,
			col: card.col,
			id: card.id,
			flip: flipCard
		});
	};

	return (
		<div className='scene' data-id={card.id} data-row={card.row} data-col={card.col} onClick={onClick}>
			<div className={"card " + (flippedState ? "is-flipped" : "")}>
				<div className='card__face card__face--front'>
					{card.visible ? <img src={card.imgPath} alt='' /> : <img src={card.hiddenImgPath} alt='' />}
				</div>
				<div className='card__face card__face--back'>
					{!card.visible ? <img src={card.imgPath} alt='' /> : <img src={card.hiddenImgPath} alt='' />}
				</div>
			</div>
		</div>
	);
};
export { Card };
