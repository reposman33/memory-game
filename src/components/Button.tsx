import React, { useState, useEffect } from "react";
import { I18n } from "../services/I18n";
import "./button.scss";

export const Button = ({ updateButtonReference, onStart }: { updateButtonReference: Function; onStart: Function }) => {
	type TButtonStatus = "ACTIVE" | "INACTIVE" | "DEMO";
	const [buttonStatus, setButtonStatus] = useState<TButtonStatus>("ACTIVE");

	useEffect(() => updateButtonReference({ setButtonStatus: (status: TButtonStatus) => setButtonStatus(status) }), [
		updateButtonReference
	]);

	return (
		<button
			disabled={buttonStatus === "INACTIVE"}
			className='button'
			onClick={() => {
				onStart();
				setButtonStatus("INACTIVE");
			}}>
			{buttonStatus === "ACTIVE"
				? I18n.get("BUTTON_START_ACTIVE")
				: buttonStatus === "DEMO"
				? I18n.get("BUTTON_START_DEMO")
				: I18n.get("BUTTON_START_INACTIVE")}
		</button>
	);
};
