import React from "react";
import { I18n } from "../services/I18n";
import "./button.scss";

export const Button = ({ status, onStart }: { status: string; onStart: Function }) => {
	return (
		<button
			disabled={status === "INACTIVE"}
			className='button'
			onClick={() => {
				onStart();
			}}>
			{status === "ACTIVE"
				? I18n.get("BUTTON_START_ACTIVE")
				: status === "DEMO"
				? I18n.get("BUTTON_START_DEMO")
				: I18n.get("BUTTON_START_INACTIVE")}
		</button>
	);
};
