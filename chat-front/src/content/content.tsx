import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./content.css";

type Message = { text: string; sender: "user" | "ai" };
interface ContentProps {
	content: Message[];
}
const Content = ({ content }: ContentProps) => (
	<div id="container">
		<div id="content">
			{content.map((msg, idx) => (
				<div key={idx} className={`message ${msg.sender}`}>
					<ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
				</div>
			))}
		</div>
	</div>
);

export default Content;
