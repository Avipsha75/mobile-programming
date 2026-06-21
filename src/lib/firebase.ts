import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAiIKFkiaLenQ28q96CtJgHAd5KhssURQQ",
  authDomain: "avi-s-medifinder.firebaseapp.com",
  databaseURL: "https://avi-s-medifinder-default-rtdb.firebaseio.com",
  projectId: "avi-s-medifinder",
  storageBucket: "avi-s-medifinder.firebasestorage.app",
  messagingSenderId: "663614490425",
  appId: "1:663614490425:web:45d606b6d99c13f57ecae8"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
