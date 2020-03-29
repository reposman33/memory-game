import React, { useState, useEffect } from "react";
import { Row } from "./Row";
import { TCard } from "../types/Card";
import "./board.scss";

type TClickedcard = {
	row: number;
	col: number;
	id: number;
	flip: Function;
};

type cardReference = {
	flipCard: Function;
	setImagePath: Function;
};

const Board = () => {
	const [fileNamesArray, setFileNamesArray] = useState<string[]>([]);
	const nrOfColumns = 8;
	const assetsPath = "/assets/img";
	let turnedCards: TClickedcard[] = [];
	const cardReferences: cardReference[] = [];

	useEffect(() => {
		fetch(`${assetsPath}/cards/files.json`)
			.then(res => res.json())
			.then(res => {
				const _arr = Object.keys(res).concat(Object.keys(res));
				setFileNamesArray(_arr);
			})
			.catch(e => console.log("ERROR: ", e));
	}, []);

	/**
	 * @function getMemoryCards create an array of filenames
	 * @param {object} fileData - array containing filenames of cards: ["a04.jpg","b01.jpg",... ] from  filenames.json
	 * @param {string} imgPath - path to img folder
	 * @returns {array} - an array of TCard objects
	 */
	const getMemoryCards = (fileData: {}, imgPath: string): TCard[] => {
		return fileNamesArray.map((fileName: string, i: number) => ({
			col: i % nrOfColumns,
			id: i,
			hiddenImgPath: `${assetsPath}/hiddenImg.jpg`,
			imgPath: `${assetsPath}/cards/${fileName}`,
			onClickCard: onClickCard,
			row: Math.floor(i / nrOfColumns),
			visible: true
		}));
	};

	/**
	 * @function makeRows - make <nrOfColumns> Row components containing <nrOfColumns> cards
	 * @param {array} memoryCards - array of memorycards
	 * @param {number} nrOfColumns - the number of columns. Since the board is rectangular this is also equal to the number of rows.
	 * @param {Function} onClickCard - callback that a card executes when clicked.
	 * @returns an array with Row components
	 */
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

	/**
	 * @function onClickCard - Callback invoked by Card component. It invokes functionality such as flipping back cards when the 3d card is clicked, checking card equality etc
	 * @param {TClickedcard} the clickedCard containing the flip function to turn the card upside down.
	 * @returns {void}
	 */
	const onClickCard = (clickedCard: TClickedcard) => {
		if (turnedCards.some(card => card.id === clickedCard.id)) {
			return;
		}
		if (turnedCards.length === 2) {
			turnedCards.forEach(card => card.flip(true));
			turnedCards = [];
			turnedCards.push(clickedCard);
		} else if (turnedCards.length === 1) {
			turnedCards.push(clickedCard);
			// compare card equality
		} else {
			turnedCards.push(clickedCard);
		}
	};

	/**
	 * @function updateCardReference - callback for Card executed after rendering returning references to setState functions
	 * @param {object} refs - an object where each value refers to a function of the same name
	 * @returns {void}
	 */
	const updateCardReference = (refs: cardReference) => {
		cardReferences.push(refs);
	};

	/**
	 * @function onStart - executed when start button clicked. Hides and shuffles cards
	 */
	const onStart = () => {
		cardReferences.forEach(ref => ref.flipCard(true));
	};

	return (
		<div className='container'>
			<div className='board'>
				{fileNamesArray && makeRows(getMemoryCards(fileNamesArray, `${assetsPath}`), nrOfColumns, onClickCard)}
			</div>
			<button className='button' onClick={onStart}>
				Start
			</button>
		</div>
	);
};

export { Board };
