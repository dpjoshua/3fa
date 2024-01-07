import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


function startFirebase(){  
  const firebaseConfig = {
    // Your Credentials
    apiKey: "AIzaSyD6BjPrAHgknLvHHZtDBgNmHOJuC7IEu-Q",
  authDomain: "faproject-bc874.firebaseapp.com",
  databaseURL: "https://faproject-bc874-default-rtdb.firebaseio.com",
  projectId: "faproject-bc874",
  storageBucket: "faproject-bc874.appspot.com",
  messagingSenderId: "755901330586",
  appId: "1:755901330586:web:bc6da855d8f01669c39b23",
  measurementId: "G-WQ01X50JJF"
  };
  const app = initializeApp(firebaseConfig)
  return getDatabase(app);
}


    

  
export default startFirebase;