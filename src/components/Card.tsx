import React from "react";
import { TCard } from "../types/Card";
import "./card.scss";

const Card = ({ tile, onHandleClick }: { tile: TCard; onHandleClick: Function }) => {
	const onClick = () => {
		onHandleClick({
			row: tile.row,
			col: tile.col,
			id: tile.id
		});
	};

	return (
		<div
			data-id={tile.id}
			className={tile.visible ? "card" : "turnedOverCard"}
			data-row={tile.row}
			data-col={tile.col}
			onClick={onClick}>
			<img src={tile.visible ? tile.imgPath : tile.hiddenImgPath} alt='Memorycard' />
		</div>
	);
};
export { Card };
