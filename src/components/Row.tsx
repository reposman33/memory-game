import React from "react";
import { Card } from "./Card";
import { TCard } from "../types/Card";
import "./row.scss";

const Row = ({ cards, onClick }: { cards: TCard[]; onClick: Function }) => {
	const makeCards = (row: TCard[], onClick: Function) =>
		row.map((card, i) => <Card key={i} card={card} onHandleClick={onClick} />);

	return <div className='row'>{makeCards(cards, onClick)}</div>;
};

export { Row };
