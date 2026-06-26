import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKkKDvS6C0kOjCaFS58tgbq1voDfV5QWg",
  authDomain: "portfolio-ede2b.firebaseapp.com",
  projectId: "portfolio-ede2b",
  storageBucket: "portfolio-ede2b.firebasestorage.app",
  messagingSenderId: "910692784804",
  appId: "1:910692784804:web:85da84c139b13afa7e2431",
  measurementId: "G-PKCC1248ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
