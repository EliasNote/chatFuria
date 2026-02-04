import React, { useState } from "react";
import "./chat.css";
import SendImg from "./../assets/send.svg";
import StopImg from "./../assets/stop.svg";
import { ChatProps } from "../App";

const Chat = ({ onResponse, loading }: ChatProps) => {
	const [message, setMessage] = useState("");
	const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
		const ta = e.currentTarget;
		ta.style.height = "auto";
		ta.style.height = `${ta.scrollHeight}px`;
		setMessage(ta.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!message) return;
		onResponse({ text: message, sender: "user" });
		setMessage("");
	};

	return (
		<div id="chat">
			<form id="textarea-container" onSubmit={handleSubmit}>
				<textarea
					rows={1}
					value={message}
					onInput={handleInput}
					placeholder="Faça uma pergunta furiosa!"
				/>
				<button type="submit" id={loading ? "stop" : "send"} disabled={loading}>
					<img src={loading ? StopImg : SendImg} />
				</button>
			</form>
		</div>
	);
};

export default Chat;
