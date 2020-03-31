import React, { useState, useEffect } from "react";
import { Row } from "./Row";
import { TCard } from "../types/Card";
import { I18n } from "../services/I18n";
import { Button } from "./Button";
import { ScoreBoard } from "./ScoreBoard";
import "./board.scss";

type TClickedcard = {
	id: number;
	flip: Function;
	imgPath: string;
};

type cardReference = {
	flipCard: Function;
	setImagePath: Function;
};

type scoreBoardReference = {
	incrementScore: Function;
	incrementMoveCount: Function;
	setScoreBoardVisibility: Function;
	showGameOverText: Function;
};

const Board = () => {
	const [fileNamesArray, setFileNamesArray] = useState<string[]>([]);

	const nrOfColumns = 8;
	const assetsPath = "/assets/img";
	const cardReferences: cardReference[] = [];
	const scoreBoardReferences: scoreBoardReference = {
		incrementScore: Function,
		incrementMoveCount: Function,
		setScoreBoardVisibility: Function,
		showGameOverText: Function
	};
	let foundDuplicates: number = 0;
	let turnedCards: TClickedcard[] = [];
	// the board is unresponsive until 'Start' button is clicked
	let gameActive: boolean = false;

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
	 * @function getMemoryCards
	 * @description create an array of filenames
	 * @param {array} imgNames - array containing filenames of cards: ["a04.jpg","b01.jpg",... ] from  filenames.json
	 * @param {string} imgPath - path to img folder
	 * @returns {array} - an array of TCard objects
	 */
	const getMemoryCards = (imgNames: string[], imgPath: string): TCard[] => {
		return imgNames.map((fileName: string, i: number) => ({
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
	 * @function makeRows
	 * @description make <nrOfColumns> Row components containing <nrOfColumns> cards
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
	 * @function onClickCard
	 * @description Callback invoked by Card component. It invokes functionality such as flipping back cards when the 3d card is clicked, checking card equality etc
	 * @param {TClickedcard} the clickedCard containing the flip function to turn the card upside down.
	 * @returns {void}
	 */
	const onClickCard = (clickedCard: TClickedcard) => {
		// ignore multiple clicks on same card || clicks when the game has not been started yet
		if (turnedCards.some(card => card.id === clickedCard.id) || !gameActive) {
			return;
		}
		if (turnedCards.length === 2) {
			if (turnedCards[0].imgPath !== turnedCards[1].imgPath) {
				turnedCards.forEach(card => card.flip(true));
			}
			turnedCards = [];
			turnedCards.push(clickedCard);
		} else if (turnedCards.length === 1) {
			turnedCards.push(clickedCard);
			// compare card equality
			turnedCards[0].imgPath === turnedCards[1].imgPath && scoreBoardReferences.incrementScore();
			// keep tract of nrOfMoves
			scoreBoardReferences.incrementMoveCount();
			foundDuplicates++;
		} else {
			turnedCards.push(clickedCard);
		}
		if (foundDuplicates === fileNamesArray.length / 2) {
			scoreBoardReferences.showGameOverText(I18n.get("SCOREBOARD_WIN"));
		}
	};

	/**
	 * @function updateCardReference
	 * @description callback: after rendering Card returns references to Card functions
	 * @param {object} refs - an object where each value refers to a function
	 * @returns {void}
	 */
	const updateCardReference = (refs: cardReference) => {
		cardReferences.push(refs);
	};

	/**
	 * @function updateScoreBoardReference
	 * @description callback: after rendering the scoreBoard returns handlers to update score and move
	 * @param refs
	 */
	const updateScoreBoardReference = (refs: scoreBoardReference) => {
		scoreBoardReferences.incrementScore = refs.incrementScore;
		scoreBoardReferences.incrementMoveCount = refs.incrementMoveCount;
		scoreBoardReferences.setScoreBoardVisibility = refs.setScoreBoardVisibility;
		scoreBoardReferences.showGameOverText = refs.showGameOverText;
	};

	/**
	 * @function onStart
	 * @description executed when start button clicked. Hides and shuffles cards
	 */
	const onStart = () => {
		gameActive = true;
		// hide cards
		cardReferences.forEach(ref => ref.flipCard(true));
		// shuffle cards
		const _randomizedFileNamesArray: string[] = [];
		const _fileNamesArray = [...fileNamesArray];
		while (_fileNamesArray.length > 0) {
			let randomIndex = Math.floor(Math.random() * _fileNamesArray.length);
			_randomizedFileNamesArray.push(_fileNamesArray[randomIndex]);
			_fileNamesArray.splice(randomIndex, 1);
		}
		// change cards image
		cardReferences.forEach((ref, i) => ref.setImagePath(`${assetsPath}/cards/${_randomizedFileNamesArray[i]}`));
		scoreBoardReferences.setScoreBoardVisibility(true);
	};

	return (
		<div className='container'>
			<div className='header'>{I18n.get("HEADER")}</div>
			<ScoreBoard score={0} updateScoreBoardReference={updateScoreBoardReference} />
			<div className='board'>
				{fileNamesArray && makeRows(getMemoryCards(fileNamesArray, `${assetsPath}`), nrOfColumns, onClickCard)}
			</div>
			<Button onStart={onStart} />
		</div>
	);
};

export { Board };
