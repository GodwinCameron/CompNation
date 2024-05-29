import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  
} from "firebase/auth";
import { auth } from "../../firebase";

export const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User logged in: ", user.email);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("There was a problem logging in: ", errorCode, errorMessage);
    });
};

export const handleLogout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User logged out");
    })
    .catch((error) => {
      // An error happened.
      console.log("There was a problem logging out: ", error);
    });
};

export const handleCreateUser = (firstName, lastName, email, username, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const currentUser = userCredential.user;
      updateProfile(auth.currentUser, {
        username: username,
        firstName: firstName,
        lastName: lastName,
      })
        .then(() => {
          console.log(
            "User signed up: ",
            currentUser.email,
            currentUser.username,
            currentUser.firstName,
            currentUser.lastName
          );
        })
        .catch((error) => {
          console.log(
            "There was a problem while setting the displayName during sign up: ",
            error
          );
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("There was a problem signing up: ", errorCode, errorMessage);
      console.log("user info: ", firstName, lastName, email, username, password);
    });
};
