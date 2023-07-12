import { useEffect, useState } from "react";

export function useGetIdea(topic, isReady, readySetter, loadingSetter) {
    const [idea, setIdea] = useState('');
    useEffect(() => {
        const messages = [
            {"role": "system", "content": "You are a story idea generator"},
            {"role": "user", "content": "Suggest a silly story idea for the topic: helicopter"},
            {"role": "assistant", "content": "A helicopter lands in a small town and the citizens think it's an creature from outer space."},
            {"role": "user", "content": "Suggest a silly story idea for the topic: coffee breaks"},
            {"role": "assistant", "content": "A group of office workers use paper airplanes to battle each other during their coffee breaks."},
            {"role": "user", "content": `Suggest a silly story idea for the topic: ${topic}`},
        ]
        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        const body = {
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.8,
            top_p: 0.9,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        }

        async function getResponse() {
            loadingSetter(true);
            const url=`https://api.openai.com/v1/chat/completions`
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
                setIdea(data.choices[0].message.content);
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
