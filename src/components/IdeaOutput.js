export default function IdeaOutput({ ideaText }) {
    const copyText = () => {
        navigator.clipboard.writeText(ideaText);
    }
    
    return (
        <>
        <div>{ideaText}</div>
        <button onClick={copyText}>Copy</button>
        </>
    )
}
