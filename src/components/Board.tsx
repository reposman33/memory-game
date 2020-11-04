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

type TButtonStatus = "ACTIVE" | "INACTIVE" | "DEMO";
// Size of board. nrOfColumns === nrOfRows, we have 4*4 and 6*6 matrix since total Nr OfCards has to be even to have pairs of equal cards
const nrOfColumns = 6; // === (4*4) / 2 unique cards; (6*6) / 2 = 18 unique cards; (8*8) / 2 = 32 unique cards
const assetsPath = "/assets/img";
let turnedCards: TClickedcard[] = [];

// the board is unresponsive until 'Start' button is clicked
let gameActive: boolean = false;

const Board = () => {
	const [fileNames, setFileNames] = useState<string[]>([]);
	// Scoreboard dependencies
	const [boardSize, setBoardSize] = useState(nrOfColumns);
	const [score, setScore] = useState(0);
	const [moveCount, setMoveCount] = useState(0);
	const [scoreBoardVisibility, setScoreBoardVisibility] = useState(false);
	const [gameOverText, setGameOverText] = useState("");
	// Button dependencies
	const [buttonStatus, setButtonStatus] = useState<TButtonStatus>("ACTIVE");
	const [language, setLanguage] = useState(I18n.language);
	const cardReferences: cardReference[] = [];

	const changeBoardSize = (boardSize: number) => {
		setBoardSize(boardSize);
		setButtonStatus('ACTIVE');
}

/**
 * @description 1a retrieve the names of all the _unique_ cardImages;
 * 				1b determine the number of unique images;
 * 				1c duplicate that so we have all the card images needed for the board;
 */
	useEffect(() => {
		setFileNames([]); // start with an empty board
		fetch(`${assetsPath}/cards/files.json`) //1
			.then((res) => res.json())
			.then((res) => {
				const nrOfUniqueCards = Math.pow(boardSize, 2) / 2; // 2
				const cardfileNames = Object.keys(res).slice(0, nrOfUniqueCards); // 2
				setFileNames(cardfileNames.concat(cardfileNames)); // 3
			})
			.catch((e) => console.log("ERROR: ", e));
	}, [boardSize]);

	/**
	 * @description - 2 convert the array of cardImage names to an objectarray 
	 * @function getMemoryCards
	 * @description create an array of filenames
	 * @param {array} imgNames - array containing filenames of cards: ["a04.jpg","b01.jpg",... ] from  filenames.json
	 * @param {string} imgPath - path to img folder
	 * @returns {array} - an array of TCard objects
	 */
	const getMemoryCards = (fileNames: string[], imgPath: string): TCard[] => 
		fileNames.map((fileName: string, i: number) => ({
			col: i % boardSize,
			id: i,
			hiddenImgPath: `${assetsPath}/hiddenImg.jpg`,
			imgPath: `${assetsPath}/cards/${fileName}`,
			onClickCard: onClickCard,
			row: Math.floor(i / boardSize),
			visible: true,
		}));

	/**
	 * @function makeRows
	 * @description 3 Initialize boardSize Row components containing each boardSize cards
	 * @param {array} memoryCards - array of memorycards
	 * @param {number} boardSize - the number of columns. Since the board is rectangular this is also equal to the number of rows.
	 * @param {Function} onClickCard - callback that a card executes when clicked.
	 * @returns an array with Row components
	 */
	const makeRows = (memoryCards: TCard[], boardSize: number, onClickCard: Function) => {
		const rows = [];
		for (let row = 0; row < boardSize; row++) {
				const _cards = memoryCards.slice(row * boardSize, row * boardSize + boardSize);
				rows.push(
					<Row key={row} cards={_cards} onClick={onClickCard} updateCardReference={updateCardReference} />
				);
		}
		return rows;
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

	const isCardTurned = (clickedCard: TClickedcard) => turnedCards.some((card) => card.id === clickedCard.id);
	const checkTurnedCards = (turnedCards: TClickedcard[]) => { 
		if (turnedCards[0].imgPath === turnedCards[1].imgPath) {
			setScore(score + 1);
		} else {
			turnBackCards(turnedCards);
		}
		turnedCards = [];
	}
	const turnBackCards = (turnedCards: TClickedcard[]) => turnedCards.forEach((card) => card.flip(true));
	const checkGameOver = () => {
		if (score === fileNames.length / 2 || score === (fileNames.length / 2) - 1 ) {
			setScore(score + 1);
			setGameOverText(I18n.get("SCOREBOARD_WIN"));
			setButtonStatus("ACTIVE");
		}
	}

	/**
	 * @function onClickCard
	 * @description Callback invoked by Card component. It invokes functionality such as flipping back cards when the 3d card is clicked, checking card equality etc
	 * @param {TClickedcard} the clickedCard containing the flip function to turn the card upside down.
	 * @returns {void}
	 */
	const onClickCard = (clickedCard: TClickedcard) => {
		// ignore multiple clicks on same card || clicks when the game has not been started yet
		if ( isCardTurned(clickedCard) || !gameActive) {
			return;
		}
		if (turnedCards.length === 2) {
			checkTurnedCards(turnedCards);
			turnedCards = [];
		} else if (turnedCards.length === 1) {
			setMoveCount(moveCount + 1);
			checkGameOver();
		}
		turnedCards.push(clickedCard);
	};

	/**
	 * @function onStart
	 * @description executed when start button clicked. Hides and shuffles cards
	 */
	const onShuffle = () => {
		gameActive = true;
		setGameOverText("");
		// hide cards
		cardReferences.forEach((ref) => ref.flipCard(true));
		// shuffle cards
		const _randomizedFileNames: string[] = [];
		const _fileNames = [...fileNames];
		while (_fileNames.length > 0) {
			let randomIndex = Math.floor(Math.random() * _fileNames.length);
			_randomizedFileNames.push(_fileNames[randomIndex]);
			_fileNames.splice(randomIndex, 1);
		}
		// change cards image
		cardReferences.forEach((ref, i) => {
			const imgFileName: String = `${assetsPath}/cards/${_randomizedFileNames[i]}`;
			ref.setImagePath(imgFileName);
		});
		setScoreBoardVisibility(true);
		setButtonStatus("INACTIVE");
	};

	const selectLanguage = (ev: any) => {
		I18n.selectLanguage(ev.currentTarget.getAttribute("data-lang"));
		// we need to re-render, therefore we invented prop language. A bit of a hack...
		setLanguage(ev.currentTarget.getAttribute("data-lang"));
	};

	return (
		<div className='container'>
			<span className='languageButtons'>
				<span onClick={selectLanguage} data-lang='nl' className={language === "nl" ? "selected" : ""}>
					nl
				</span>
				&nbsp; /&nbsp;
				<span onClick={selectLanguage} data-lang='en' className={language === "en" ? "selected" : ""}>
					en
				</span>
			</span>
			<div className='header'>{I18n.get("HEADER")}</div>
			<ScoreBoard
				score={score}
				moveCount={moveCount}
				scoreBoardVisibility={scoreBoardVisibility}
				gameOverText={gameOverText}
			/>
			<div className="subHeader">{I18n.get("BOARDSIZE_LABEL")}</div>
				<div>
					<input id="boardSize8" type="radio" name="boardsize" value="8" checked={boardSize===8} onChange={()=>changeBoardSize(8)} />
					<label htmlFor="boardSize8">8*8</label>
					<input id="boardSize6" type="radio" name="boardsize" value="6" checked={boardSize===6} onChange={()=>changeBoardSize(6)} />
					<label htmlFor="boardSize6">6*6</label>
					<input id="boardSize4" type="radio" name="boardsize" value="4" checked={boardSize===4} onChange={()=>changeBoardSize(4)} />
					<label htmlFor="boardSize4">4*4</label>
				</div>
			<div className='board'>
				{fileNames && makeRows(getMemoryCards(fileNames, `${assetsPath}`), boardSize, onClickCard)}
			</div>
			<Button status={buttonStatus} onClick={onShuffle} />
		</div>
	);
};

export { Board };
