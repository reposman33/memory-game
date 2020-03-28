import React from "react";
import { Card } from "./Card";
import { TCard } from "../types/Card";
import "./row.scss";

const Row = ({ cards, onClick }: { cards: TCard[]; onClick: Function }) => {
	const makeCards = (row: TCard[], onHandleClick: Function) =>
		row.map((card, i) => <Card key={i} tile={card} onHandleClick={onHandleClick} />);

	return <div className='row'>{makeCards(cards, onClick)}</div>;
};

export { Row };
