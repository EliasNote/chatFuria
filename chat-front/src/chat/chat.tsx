import React, { useState } from "react";
import "./chat.css";
import SendImg from "./../assets/send.svg";

const apiUrl = `${import.meta.env.BASE_URL}:${import.meta.env.PORT}`;

interface ChatProps {
	onResponse: (message: { text: string; sender: "user" | "ai" }) => void;
}

const Chat = ({ onResponse }: ChatProps) => {
	const [message, setMessage] = useState("");
	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const ta = e.currentTarget;
		ta.style.height = "auto";
		ta.style.height = `${ta.scrollHeight}px`;
		setMessage(ta.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const tempMessage = message;
		setMessage("");
		onResponse({ text: tempMessage, sender: "user" });
		const response = await fetch(`${apiUrl}/api/v1/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ prompt: tempMessage }),
		});
		const data = await response.json();
		onResponse({ text: data.response, sender: "ai" });
	};

	return (
		<div id="chat">
			<form id="textarea-container" onSubmit={handleSubmit}>
				<textarea
					rows={1}
					value={message}
					onInput={handleInput}
					placeholder="Faça uma pergunta furiosa"
				/>
				<button type="submit">
					<img src={SendImg} />
				</button>
			</form>
		</div>
	);
};

export default Chat;
