import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7GJKIyL5FZaafxwMfwbY_6lZy74ax5Y4",
  authDomain: "colegio-bernardo-o-higgi-12d94.firebaseapp.com",
  projectId: "colegio-bernardo-o-higgi-12d94",
  storageBucket: "colegio-bernardo-o-higgi-12d94.firebasestorage.app",
  messagingSenderId: "622084273927",
  appId: "1:622084273927:web:1708036f6b830cd59437a2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
