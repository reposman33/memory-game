import React, { useState, useEffect } from "react";
import { TCard } from "../types/Card";
import "./card.scss";

const Card = ({
	card,
	onHandleClick,
	updateCardReference
}: {
	card: TCard;
	onHandleClick: Function;
	updateCardReference: Function;
}) => {
	const [flippedState, setFlippedState] = useState(false);
	const [imagePath, setImagePath] = useState(card.imgPath);

	useEffect(() => {
		// give Board component a reference to the flipCard and setImagePath functions
		updateCardReference({ flipCard: flipCard, setImagePath: setImagePath });
	}, [imagePath, updateCardReference]);

	/**
	 * @function flipCard
	 * @description function to turn a card upside down
	 * @param {boolean} newState - true: card turned backside up, false card turned frontside up
	 * @return {void}
	 */
	function flipCard(newState: boolean) {
		setFlippedState(newState);
	}

	/**
	 * @function onClick
	 * @description function executed when clicked on a card.. Calls flipCard() to flip card and onHandleClick() to invoke Board component related functionality
	 */
	const onClick = () => {
		flipCard(false);
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
					{card.visible ? <img src={imagePath} alt='' /> : <img src={card.hiddenImgPath} alt='' />}
				</div>
				<div className='card__face card__face--back'>
					{!card.visible ? <img src={imagePath} alt='' /> : <img src={card.hiddenImgPath} alt='' />}
				</div>
			</div>
		</div>
	);
};
export { Card };
