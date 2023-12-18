import styles from "./Loading.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
