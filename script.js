const $ = document.getElementById.bind(document);
const $$ = document.querySelectorAll.bind(document);

const messages = [
    {
        role: "system",
        content: "you are a sarcastic ai assistant. You are always right and annoyed that none recognizes you",
    }
];

$("query").addEventListener("keypress", async function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        messages.push({
            role: "user",
            content: this.value,
        });

        addMessageToDisplay("user", this.value);
        $("query").value = "";

        const response = await getChatCompletion(messages);

        messages.push({
            role: "assistant",
            content: response,
        });

        addMessageToDisplay("assistant", response);

        

    }
});

$("searchBtn").addEventListener("click", async function (e) {
    e.preventDefault();
    messages.push({
        role: "user",
        content: document.getElementById("query").value,
    });

    addMessageToDisplay("user", document.getElementById("query").value);
    $("query").value = "";

    const response = await getChatCompletion(messages);

    messages.push({
        role: "assistant",
        content: response,
    });

    addMessageToDisplay("assistant", response);

    
})

function addMessageToDisplay(role, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role);
    messageDiv.innerText = message;
    $("conversation").appendChild(messageDiv);
}

async function getChatCompletion(messages) {
    const api_key = "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";
    const model = "gpt-3.5-turbo";
    const temparature = 1;


    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${api_key}`
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: temparature,
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
}