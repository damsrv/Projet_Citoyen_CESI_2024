"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { SignOutButton } from "@/components/SignOutButton";

export default async function Home() {

  return (
    <main className={styles.main}>
      <h1>HomePage</h1>
      <SignOutButton />
    </main>
  );
}
