
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC3Z6gt-cC8iqkv8RPJCVQ4lrKcWBfTsJg",
  authDomain: "test-front-3d360.firebaseapp.com",
  projectId: "test-front-3d360",
  storageBucket: "test-front-3d360.appspot.com",
  messagingSenderId: "950788420933",
  appId: "1:950788420933:web:0e6be952a3e94cec663a2c",
  measurementId: "G-9RSDZKLKSQ"
};


let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]


export const db = getFirestore(app);
export const storage = getStorage(app);

console.log(app)

export default app