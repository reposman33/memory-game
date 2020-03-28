import React, { useState } from "react";
import { TCard } from "../types/Card";
import "./card.scss";

const Card = ({ tile, onHandleClick }: { tile: TCard; onHandleClick: Function }) => {
	const [flippedState, setFlippedState] = useState(false);

	const onClick = () => {
		setFlippedState(!flippedState);
		onHandleClick({
			row: tile.row,
			col: tile.col,
			id: tile.id
		});
	};

	return (
		<div className='scene' data-id={tile.id} data-row={tile.row} data-col={tile.col} onClick={onClick}>
			<div className={"card " + (flippedState ? "is-flipped" : "")}>
				<div className='card__face card__face--front'>
					<img src={tile.imgPath} alt='' />
				</div>
				<div className='card__face card__face--back'>
					<img src={tile.hiddenImgPath} alt='' />
				</div>
			</div>
		</div>
	);
};
export { Card };
