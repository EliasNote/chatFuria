import React, { useState } from "react";
import SendImg from "./../assets/send.svg";
import { ChatProps } from "../App";

const InitialChat = ({ onResponse }: ChatProps) => {
	const [message, setMessage] = useState("");

	const handleButton = (e: React.FormEvent<HTMLButtonElement>) => {
		const text = e.currentTarget.textContent!;
		setMessage(text);
		onResponse({ text, sender: "user" });
		setMessage("");
	};

	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		setMessage(e.currentTarget.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!message) return;
		onResponse({ text: message, sender: "user" });
		setMessage("");
	};

	return (
		<div id="initial-chat">
			<form id="textarea-container" onSubmit={handleSubmit}>
				<textarea
					rows={1}
					onInput={handleInput}
					placeholder="Faça uma pergunta furiosa"
				/>
				<button type="submit" id="send">
					<img src={SendImg} />
				</button>
			</form>
			<div id="sugestoes">
				<button onClick={(e) => handleButton(e)}>/help</button>
				<button onClick={(e) => handleButton(e)}>/jogos</button>
				<button onClick={(e) => handleButton(e)}>/jogadores</button>
				<button onClick={(e) => handleButton(e)}>/loja</button>
			</div>
		</div>
	);
};

export default InitialChat;
