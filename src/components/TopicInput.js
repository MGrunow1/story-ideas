import { useState } from 'react';
import styles from './TopicInput.module.css';
import LoadingSpinner from "./LoadingSpinner";

export default function TopicInput({ topic, topicSetter, outputSetter }) {
    const [keyword, setKeyword] = useState(topic);
    const isLoading = true;//TODO: delete and replace with props
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
