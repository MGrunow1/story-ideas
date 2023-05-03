import spinner from '../spinner.svg';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner() {
    //
    return (
        <div className={styles.container}>
            <img src={spinner} alt="" className={styles.spinner} />
            Processing
            <img src={spinner} alt="" className={styles.spinner} />
        </div>
    )
}
