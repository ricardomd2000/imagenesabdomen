// Firebase Configuration for 'imagenesabdomen'
// Replace placeholders with actual credentials from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyB9RH4bh84hPf9Wg4gvpKd9yOlieFvI2jw",
    authDomain: "imagenesabdomen.firebaseapp.com",
    projectId: "imagenesabdomen",
    storageBucket: "imagenesabdomen.firebasestorage.app",
    messagingSenderId: "1031130740002",
    appId: "1:1031130740002:web:1970139e41f08d0b2ae17b"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
