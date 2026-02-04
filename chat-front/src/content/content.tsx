import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import "./content.css";
import { Message } from "../App";
import Lottie from "lottie-react";
import loading from "../assets/loading.json";

interface ContentProps {
	content: Message[];
}

function getLastUrls(content: Message[]) {
	for (let i = content.length - 1; i >= 0; i--) {
		if (content[i].urls) return content[i].urls;
	}
	return undefined;
}

function fixImgs(html: string) {
	return html.replace(/(<img[^>]+)(?=<span|$)/g, "$1 />");
}

function renderProdutosBlock(
	html: string,
	key: number,
	urls?: Record<string, { imageUrl: string; lojaUrl: string }>
) {
	const fixed = fixImgs(html);
	const temp = document.createElement("div");
	temp.innerHTML = fixed;
	const produtosDiv = temp.querySelector("#produtos") || temp.firstElementChild;
	if (!produtosDiv) return null;

	produtosDiv.querySelectorAll("div.produto").forEach((p) => {
		const img = p.querySelector("img.imagem") as HTMLImageElement | null;
		if (img && urls) {
			const id = img.getAttribute("src") || "";
			const info = urls[id];
			const imageUrl = info.imageUrl.replace("id", id);
			if (info) img.src = imageUrl;
		}
		const btn = p.querySelector("button.lojaUrl");
		if (btn && urls) {
			const id = (btn.getAttribute("onclick")!.match(/'([^']+)'/) || [])[1];
			const info = urls[id];
			if (info) btn.setAttribute("onclick", `window.open('${info.lojaUrl}')`);
		}
	});

	return (
		<span
			key={key}
			dangerouslySetInnerHTML={{ __html: produtosDiv.outerHTML }}
		/>
	);
}

const Content = ({ content }: ContentProps) => {
	const urls = getLastUrls(content);
	return (
		<div id="container">
			<div id="content">
				{content.map((msg, idx) => (
					<div key={idx} className={`message ${msg.sender}`}>
						{msg.sender === "loading" ? (
							<Lottie
								animationData={loading}
								style={{ width: 60, height: 60 }}
								loop
							/>
						) : msg.text.includes('<div id="produtos">') ? (
							renderProdutosBlock(msg.text, idx, urls)
						) : (
							<ReactMarkdown
								remarkPlugins={[remarkGfm, remarkBreaks]}
								children={msg.text}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Content;
