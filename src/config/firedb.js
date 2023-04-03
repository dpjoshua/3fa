import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


function startFirebase(){  
  const firebaseConfig = {
    // Your Credentials
    apiKey: "AIzaSyC-keomUXUClwMExZJgtrzPp39V4-p0wqQ",
    authDomain: "fauth-4be60.firebaseapp.com",
    databaseURL: "https://fauth-4be60-default-rtdb.firebaseio.com",
    projectId: "fauth-4be60",
    storageBucket: "fauth-4be60.appspot.com",
    messagingSenderId: "96361812486",
    appId: "1:96361812486:web:66f61a7cc4bb060c10a987",
    measurementId: "G-W70ZDGPQC5"
  };
  const app = initializeApp(firebaseConfig)
  return getDatabase(app);
}


    

  
export default startFirebase;