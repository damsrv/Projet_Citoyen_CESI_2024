import Image from "next/image";
import styles from "./page.module.css";
import { CredentialsForm } from "@/components/credentialsForm";

export default function Home() {
  return (
    <main className={styles.main}>
     <CredentialsForm/>
    </main>
  );
}
