// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { collection, getFirestore } from "firebase/firestore";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "chatapp-reactnative-fb472.firebaseapp.com",
//     projectId: "chatapp-reactnative-fb472",
//     storageBucket: "chatapp-reactnative-fb472.appspot.com",
//     messagingSenderId: "195917150790",
//     appId: "1:195917150790:web:c25cb24e544125fb81e847",
//     measurementId: "G-GE66VPX9ZT",
// };

// // Khởi tạo Firebase app
// const app = initializeApp(firebaseConfig);

// // Khởi tạo Firebase Auth với persistence
// export const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage),
// });

// export const db = getFirestore(app);

// export const usersRef = collection(db, "users");
// export const roomsRef = collection(db, "rooms");
