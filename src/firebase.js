import { firebase } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({

});

export { firebaseConfig as firebase }