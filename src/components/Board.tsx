import React, { useState, useEffect } from "react";
import { Row } from "./Row";
import { TCard } from "../types/Card";
import "./board.scss";

const Board = () => {
	const [fileList, setFileList] = useState<{}>();
	const nrOfColumns = 8;
	const assetsPath = "/assets/img";

	useEffect(() => {
		fetch(`${assetsPath}/cards/files.json`)
			.then(res => res.json())
			.then(res => {
				setFileList(res);
			})
			.catch(e => console.log("ERROR: ", e));
	}, []);

	const onClickCard = (card: {}): void => {};

	const getMemoryCards = (fileData: {}, imgPath: string) => {
		const fileNames: string[] = Object.keys(fileData).concat(Object.keys(fileData));
		return fileNames.map((fileName: string, i: number) => ({
			col: i % nrOfColumns,
			id: i,
			hiddenImgPath: `${assetsPath}/hiddenImg.jpg`,
			imgPath: `${assetsPath}/cards/${fileName}`,
			onClickCard: onClickCard,
			row: Math.floor(i / nrOfColumns),
			visible: true
		}));
	};

	const makeRows = (memoryCards: TCard[], nrOfColumns: number, onClickCard: Function) => {
		const rows = [];
		for (let i = 0; i < memoryCards.length; i++) {
			if (i % nrOfColumns === 0) {
				const memoryCard = memoryCards.slice(i, i + nrOfColumns);
				rows.push(<Row key={i} cards={memoryCard} onClick={onClickCard} />);
			}
		}
		return rows;
	};

	return (
		<div className='container'>
			<div className='board'>
				{fileList && makeRows(getMemoryCards(fileList, `${assetsPath}`), nrOfColumns, onClickCard)}
			</div>
		</div>
	);
};

export { Board };
