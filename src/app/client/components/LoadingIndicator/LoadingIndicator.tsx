import styles from './styles.module.css';
import { CircularProgress } from "@mui/material";

export function LoadingIndicator(): JSX.Element {
    return (
        <div className={styles.loadingIndicator}>
            <CircularProgress />
        </div>
    );
}
