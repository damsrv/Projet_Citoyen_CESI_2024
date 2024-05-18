import { signOut } from 'next-auth/react';

export const SignOutButton = () => {

    const handleSignOut = () => {
      signOut({ callbackUrl: '/' }); // Redirects to home after sign-out
    };
  
    return (
        <button onClick={handleSignOut}>
            Sign Out
        </button>
    );
  }