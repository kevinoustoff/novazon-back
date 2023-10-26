import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyB02JTxeMy__8JqdHrC-inQ_mWI6CYhM2U",
  projectId: "nova-b6a7f",
  storageBucket: "europe-west",
  appId: "1:935063982637:android:6ce744c42f28c4a1e49ea4"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export default db;