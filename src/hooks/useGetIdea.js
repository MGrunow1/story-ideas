import { useEffect, useState } from "react";

export function useGetIdea(topic, isReady, readySetter, loadingSetter) {
    const [idea, setIdea] = useState('');
    useEffect(() => {
        const prompt = `Silly story topic: helicopter.\nSilly story idea: A helicopter lands in a small town and the citizens think it's an creeature from outer space.\n\nSilly story topic: coffee breaks.\nSilly story idea: A group of office workers use paper airplanes to battle each other during their coffee breaks.\n\nSilly story topic: ${topic}.\nSilly story idea: `
        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        const body = {
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.8,
            max_tokens: 60,
            top_p: 0.9,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }

        async function getResponse() {
            loadingSetter(true);
            const url=`https://api.openai.com/v1/completions`
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify(body)
                });
                const data = await response.json();
                setIdea(data.choices[0].text);
                loadingSetter(false);
            } catch (error) {
                console.error(error);
                setIdea('Error encountered. Try again later')
                loadingSetter(false);
            }
        }

        // run only if ready, to avoid continuous refresh
        if(isReady) {
            getResponse();
            readySetter(false);
        }
    },[topic, isReady, readySetter, loadingSetter])

    return idea;
}
