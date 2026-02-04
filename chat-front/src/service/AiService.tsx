const apiUrl = `${import.meta.env.VITE_API_URL}`;

export async function sendMessage(message: string) {
	const response = await fetch(`${apiUrl}/api/v1/chat`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ prompt: message }),
	});
	return response.json();
}
