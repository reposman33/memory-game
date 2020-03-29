import React from "react";
import { Card } from "./Card";
import { TCard } from "../types/Card";
import "./row.scss";

const Row = ({
	cards,
	onClick,
	updateCardReference
}: {
	cards: TCard[];
	onClick: Function;
	updateCardReference: Function;
}) => {
	const makeCards = (row: TCard[], onClick: Function) =>
		row.map((card, i) => (
			<Card key={i} card={card} onHandleClick={onClick} updateCardReference={updateCardReference} />
		));

	return <div className='row'>{makeCards(cards, onClick)}</div>;
};

export { Row };
