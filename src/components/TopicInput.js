import { useState } from 'react';
import styles from './TopicInput.module.css';
import { useGetIdea } from '../hooks/useGetIdea';
import { useRefreshValue } from '../hooks/useRefreshValue';
import LoadingSpinner from "./LoadingSpinner";

export default function TopicInput({ topic, topicSetter, output, outputSetter }) {
    const [keyword, setKeyword] = useState(topic);
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);

    const ideaOutput = useGetIdea(topic, isReady, setIsReady, setIsLoading);
    // force it to update the text output
    useRefreshValue(ideaOutput, output, outputSetter);

    const handleSubmit = () => {
        if(keyword){
            // set the topic
            topicSetter(keyword);
            // indicate that it is ready to update
            setIsReady(true);
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
              className='button'
              onClick={handleSubmit}
          >
              Submit
          </button>
        )}
      </>
    )
}
