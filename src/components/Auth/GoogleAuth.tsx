import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, createUserDocument } from '../../lib/firebase';

export const GoogleAuth = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await createUserDocument(result.user);
      }
    } catch (error: any) {
      if (error.code !== 'auth/cancelled-popup-request' && 
          error.code !== 'auth/popup-blocked') {
        console.error('Error signing in with Google:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 px-6 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
      Продолжить с Google
    </button>
  );
};