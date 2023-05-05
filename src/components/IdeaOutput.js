import styles from './IdeaOutput.module.css';

export default function IdeaOutput({ ideaText }) {
    const copyText = () => {
        navigator.clipboard.writeText(ideaText);
    }
    
    return (
        <>
        <div className={styles.box}>{ideaText}</div>
        <button onClick={copyText} className={styles.button}>
            Copy
        </button>
        </>
    )
}
