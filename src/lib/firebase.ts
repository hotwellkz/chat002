import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_QUHsdoimRSkOvpJh-I1KwSuXKWoJyK8",
  authDomain: "chatgpt-7411e.firebaseapp.com",
  projectId: "chatgpt-7411e",
  storageBucket: "chatgpt-7411e.firebasestorage.app",
  messagingSenderId: "553676468690",
  appId: "1:553676468690:web:d6cf2be511c5dc9977580b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserDocument = async (user: any) => {
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);
  
  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = user;
    const createdAt = new Date();
    
    try {
      await setDoc(userRef, {
        email,
        displayName,
        photoURL,
        createdAt,
        subscription: {
          status: 'free',
          validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1))
        }
      });
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  }
  
  return userRef;
};