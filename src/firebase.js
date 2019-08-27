import { firebase } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBxA6K-NQe0wUitHWdGZmt5zr1tmDNITD4",
  authDomain: "todoist-clone-39cef.firebaseapp.com",
  databaseURL: "https://todoist-clone-39cef.firebaseio.com",
  projectId: "todoist-clone-39cef",
  storageBucket: "todoist-clone-39cef.appspot.com",
  messagingSenderId: "531007078529",
  appId: "1:531007078529:web:8ab6ca5c59da69f8"
});

export { firebaseConfig as firebase }