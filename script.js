const API_KEY = "YOUR_GOOGLE_AI_STUDIO_API_KEY";

const chatBox = document.getElementById("chatBox");
const promptInput = document.getElementById("prompt");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const text = promptInput.value.trim();
  if (!text) return;

  chatBox.innerHTML += `<div class="user">${text}</div>`;
  promptInput.value = "";

  const loading = document.createElement("div");
  loading.className = "bot";
  loading.innerText = "Thinking...";
  chatBox.appendChild(loading);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: text
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();

    loading.innerText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";
  } catch (err) {
    loading.innerText = "Error: " + err.message;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
const API_KEY =
  "A
