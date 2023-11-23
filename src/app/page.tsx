import styles from "./page.module.css";
import aboutUsText from "./utils/aboutSection";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.main_about}>
        {aboutUsText.map((section) => {
          return (
            <div key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          );
        })}
      </div>
      {/* <ProductSlider title={"Bestsellers"} /> */}
    </main>
  );
}
