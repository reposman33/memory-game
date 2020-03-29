import React, { useState, useEffect } from "react";
import { Row } from "./Row";
import { TCard } from "../types/Card";
import "./board.scss";

type card = {
	row: number;
	col: number;
	id: number;
	flip: Function;
};
const Board = () => {
	const [fileList, setFileList] = useState<{}>();
	const nrOfColumns = 8;
	const assetsPath = "/assets/img";
	let turnedCards: card[] = [];
	const cards: Function[] = [];

	useEffect(() => {
		fetch(`${assetsPath}/cards/files.json`)
			.then(res => res.json())
			.then(res => {
				setFileList(res);
			})
			.catch(e => console.log("ERROR: ", e));
	}, []);

	const onClickCard = (clickedCard: card) => {
		if (turnedCards.some(card => card.id === clickedCard.id)) {
			return;
		}
		if (turnedCards.length === 2) {
			turnedCards.forEach(card => card.flip(false));
			turnedCards = [];
			turnedCards.push(clickedCard);
		} else if (turnedCards.length === 1) {
			turnedCards.push(clickedCard);
			// compare card equality
		} else {
			turnedCards.push(clickedCard);
		}
	};

	const getMemoryCards = (fileData: {}, imgPath: string) => {
		const fileNames: string[] = Object.keys(fileData).concat(Object.keys(fileData));
		return fileNames.map((fileName: string, i: number) => ({
			col: i % nrOfColumns,
			id: i,
			hiddenImgPath: `${assetsPath}/hiddenImg.jpg`,
			imgPath: `${assetsPath}/cards/${fileName}`,
			onClickCard: onClickCard,
			row: Math.floor(i / nrOfColumns),
			visible: false
		}));
	};

	const makeRows = (memoryCards: TCard[], nrOfColumns: number, onClickCard: Function) => {
		const rows = [];
		for (let i = 0; i < memoryCards.length; i++) {
			if (i % nrOfColumns === 0) {
				const memoryCard = memoryCards.slice(i, i + nrOfColumns);
				rows.push(
					<Row key={i} cards={memoryCard} onClick={onClickCard} updateCardReference={updateCardReference} />
				);
			}
		}
		return rows;
	};

	// add ref to flipCard function from cards
	const updateCardReference = (f: Function) => {
		cards.push(f);
	};

	const onStart = () => {
		const intervalId = setInterval(() => {
			cards.forEach((flipCard, i) => {
				flipCard(true);
				i === cards.length - 1 && clearInterval(intervalId);
			});
		}, 250);
	};

	return (
		<div className='container'>
			<div className='board'>
				{fileList && makeRows(getMemoryCards(fileList, `${assetsPath}`), nrOfColumns, onClickCard)}
			</div>
			<button className='button' onClick={onStart}>
				Start
			</button>
		</div>
	);
};

export { Board };
