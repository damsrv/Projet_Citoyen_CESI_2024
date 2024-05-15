"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
        router.push("/home");
    } else {
      console.log("Error: ", signInResponse);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      {error && (
        <span>
          {error}
        </span>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
      />

      <button
        type="submit"
      >
        Log in
      </button>
    </form>
  );
}