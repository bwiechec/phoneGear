import styles from "./loading.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className={styles.list}>
      <div className={styles.categories}>
        <h4>Categories</h4>
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      </div>
    </div>
  );
};

export default Loading;
