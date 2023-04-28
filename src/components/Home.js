import IdeaOutput from "./IdeaOutput";
import TopicInput from "./TopicInput";

export default function Home() {
    //
    return (
        <>
        <h1>Silly Story Ideas</h1>
        <p>Input a simple subject for a topic (like "vacuum cleaner" or "cow"), and get a simple idea for a story.</p>
        <p>(This project accesses OpenAI's language models, but is not affiliated with OpenAI).</p>
        <TopicInput />
        <IdeaOutput />
        </>
    )
}
