import { useState } from "react";
import IdeaOutput from "./IdeaOutput";
import TopicInput from "./TopicInput";

export default function Home() {
    const [ideaText, setIdeaText] = useState('');
    const [topic, setTopic] = useState('');
    //
    return (
        <>
        <h1>Silly Story Ideas</h1>
        <p>Input a simple subject for a topic (like "vacuum cleaner" or "cow"), and get a simple idea for a story.</p>
        <p>(This project accesses OpenAI's language models, but is not affiliated with OpenAI).</p>
        <TopicInput topic={topic} topicSetter={setTopic} outputSetter={setIdeaText} />
        {ideaText && (
            <IdeaOutput ideaText={ideaText}/>
          )}
        </>
    )
}
