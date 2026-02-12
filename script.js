const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('promptInput');
const resultImage = document.getElementById('resultImage');
const loadingText = document.getElementById('loading');

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
        {
            headers: { Authorization: "Bearer YOUR_API_TOKEN_HERE" }, // Replace with your token
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

generateBtn.addEventListener('click', () => {
    const text = promptInput.value;
    if (!text) return alert("Please enter a prompt!");

    loadingText.classList.remove('hidden');
    resultImage.classList.add('hidden');

    query({ "inputs": text }).then((response) => {
        const objectURL = URL.createObjectURL(response);
        resultImage.src = objectURL;
        resultImage.classList.remove('hidden');
        loadingText.classList.add('hidden');
    });
});