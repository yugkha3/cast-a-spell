require('dotenv').config()
const fetch = require("node-fetch-commonjs")


const bufferToBase64 = (buffer) => {
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
}

async function generateImage(req, res) {
    const input = req.body.input;
    const response = await fetch(
        `https://api-inference.huggingface.co/models/yugkha3/avatar`,
        {
            headers: {
                Authorization: `Bearer ${process.env.HF_AUTH_KEY}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                inputs: input,
            }),
        }
    );
    
    // Check for different statuses to send proper payload
    if (response.ok) {
        const buffer = await response.arrayBuffer();
        const base64 = bufferToBase64(buffer)
        res.status(200).json({ image: base64 })
    } else if (response.status === 503) {
        const json = await response.json();
        res.status(503).json(json);
    } else {
        const json = await response.json();
        res.status(response.status).json({ error: response.statusText });
    }
}

module.exports = {
    generateImage 
};