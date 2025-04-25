import { useState } from "react";
import Chat from "./chat/chat";
import Content from "./content/content";
import Top from "./top/top";
type Message = { text: string; sender: "user" | "ai" };
function App() {
	const [messages, setMessages] = useState<Message[]>([]);
	return (
		<>
			<Top />
			<Content content={messages} />
			<Chat onResponse={(msg) => setMessages((prev) => [...prev, msg])} />
		</>
	);
}

export default App;
