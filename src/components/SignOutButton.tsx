"use client"

import { signOut } from 'next-auth/react';

export const SignOutButton = () => {

    const handleSignOut = async () => {
      await signOut({ callbackUrl: '/' }); // Redirects to home after sign-out
    };
  
    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    );
  }