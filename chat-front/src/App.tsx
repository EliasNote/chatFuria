import { useState } from "react";
import Chat from "./chat/chat";
import Content from "./content/content";
import Top from "./top/top";
import InitialChat from "./chat/InitialChat";
import { sendMessage } from "./service/AiService";
import { SUGESTAO_MAP, SUGESTOES } from "./chat/prompt/Prompt";

export interface Message {
	text: string;
	urls?: Record<string, { imageUrl: string; lojaUrl: string }>;
	sender: "user" | "ai" | "loading";
}

export interface ChatProps {
	onResponse: (message: Message) => void;
	loading?: boolean;
}

function App() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [started, setStarted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleMessage = async (message: Message) => {
		const text = message.text.trim();
		if (!text) return;

		setMessages((prev) => [...prev, { text, sender: message.sender }]);

		if (message.sender === "user") {
			setStarted(true);

			if (text == "/help") {
				setMessages((prev) => [
					...prev,
					{ text: SUGESTOES.join("\n\n"), sender: "ai" },
				]);
				return;
			}

			const prompt = SUGESTAO_MAP[text] ?? text;

			setLoading(true);
			setMessages((prev) => [...prev, { text: "", sender: "loading" }]);
			const data = await sendMessage(prompt);
			console.log(data);
			setMessages((prev) => [...prev.slice(0, -1)]);
			setMessages((prev) => [
				...prev,
				{ text: data.response, urls: data.urls, sender: "ai" },
			]);
			setLoading(false);
		}
	};

	return (
		<>
			<Top />
			<Content content={messages} />
			{!started && <InitialChat onResponse={handleMessage} />}
			{started && <Chat onResponse={handleMessage} loading={loading} />}
		</>
	);
}

export default App;
