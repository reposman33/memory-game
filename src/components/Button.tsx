import React, { useState } from "react";
import { I18n } from "../services/I18n";
import "./button.scss";

export const Button = ({ onStart }: { onStart: Function }) => {
	const [buttonStatus, setButtonStatus] = useState("active");

	return (
		<button
			disabled={buttonStatus === "inactive"}
			className='button'
			onClick={() => {
				onStart();
				setButtonStatus("inactive");
			}}>
			{buttonStatus === "active" ? I18n.get("BUTTON_START_ACTIVE") : I18n.get("BUTTON_START_INACTIVE")}
		</button>
	);
};
