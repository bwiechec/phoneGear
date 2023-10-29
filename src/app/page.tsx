import ProductSlider from "./components/productSlider/productSlider";
import styles from "./page.module.css";
import aboutUsText from "./utils/aboutSection";

interface IHomePageProps {
  test: string;
}

export default async function Home() {
  const { test }: IHomePageProps = await getData();
  return (
    <main className={styles.main}>
      <div className={styles.main_about}>
        {aboutUsText.map((section) => {
          return (
            <div>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          );
        })}
      </div>
      <ProductSlider title={"Bestsellers"} />
    </main>
  );
}

export const getData = async () => {
  const res = await fetch(
    "https://quiz-6dc78-default-rtdb.europe-west1.firebasedatabase.app/test.json"
  );
  const data = res.json();

  return data;
};
