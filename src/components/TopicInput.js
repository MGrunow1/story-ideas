import { useState, useEffect } from 'react';
import styles from './TopicInput.module.css';
import LoadingSpinner from "./LoadingSpinner";

export default function TopicInput({ topic, topicSetter, output, outputSetter }) {
    const [keyword, setKeyword] = useState(topic);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
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
                outputSetter(data.choices[0].text);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                outputSetter('Error encountered. Try again later')
                setIsLoading(false);
            }
        }

        // run only if empty, to avoid continuous refresh
        if(topic!=='' && output==='') {getResponse()}
    },[topic, output, outputSetter])

    const handleSubmit = () => {
        if(keyword){
            // set the topic
            topicSetter(keyword);
            // clear output
            outputSetter('');
        }
    }

    return (
      <>
        <input
            type="text"
            aria-label="Enter topic here"
            placeholder="Enter topic here"
            className={styles.input}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
        />
        {isLoading ? (
            <div>
                <LoadingSpinner />
            </div>
        ) : (
          <button
              className={styles.submit}
              onClick={handleSubmit}
          >
              Submit
          </button>
        )}
      </>
    )
}
