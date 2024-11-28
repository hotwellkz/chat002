import { db } from '../lib/firebase';
import { collection, addDoc, query, where, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ChatSession, Message } from '../types';

export const createChatSession = async (userId: string) => {
  try {
    const sessionRef = await addDoc(collection(db, 'chatSessions'), {
      userId,
      title: 'Новый чат',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: []
    });
    
    return sessionRef.id;
  } catch (error) {
    console.error('Error creating chat session:', error);
    throw error;
  }
};

export const getChatSessions = async (userId: string) => {
  try {
    const sessionsQuery = query(
      collection(db, 'chatSessions'),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    
    const snapshot = await getDocs(sessionsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ChatSession[];
  } catch (error) {
    console.error('Error getting chat sessions:', error);
    throw error;
  }
};

export const addMessageToSession = async (sessionId: string, message: Message) => {
  try {
    const sessionRef = doc(db, 'chatSessions', sessionId);
    await updateDoc(sessionRef, {
      messages: arrayUnion(message),
      updatedAt: Date.now()
    });
  } catch (error) {
    console.error('Error adding message to session:', error);
    throw error;
  }
};