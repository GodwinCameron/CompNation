import { addDoc, arrayUnion, collection, getDocs, updateDoc , doc} from "firebase/firestore";
import { db } from "../../firebase";

export const createNewCompetition = async (competition) => {
    try {
        const docRef = await addDoc(collection(db, "competitions"), competition);
        console.log("Document written with ID: ", docRef.id, " Competition: ", competition);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
}



export const getAllCompetitions = async () => {
  const competitions = [];
  const querySnapshot = await getDocs(collection(db, "competitions"));
  querySnapshot.forEach((doc) => {
    competitions.push(doc.data());
  });
  return competitions;
};


export const updatePlayers = async (competitionId, player) => {
  try {
    const competitionRef = doc(db, "competitions", competitionId);
    await updateDoc(competitionRef, {
      players: arrayUnion(player)
    });
    console.log("Player added to competition with ID: ", competitionId, " Player: ", player);
    return true;
  } catch (e) {
    console.error("Error updating players: ", e);
    return false;
  }
};

// export const handleCreateUser = (firstName, lastName, email, username, password) => {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Signed up
//       const currentUser = userCredential.user;
//       updateProfile(auth.currentUser, {
//         username: username,
//         firstName: firstName,
//         lastName: lastName,
//       })
//         .then(() => {
//           console.log(
//             "User signed up: ",
//             currentUser.email,
//             currentUser.username,
//             currentUser.firstName,
//             currentUser.lastName
//           );
//         })
//         .catch((error) => {
//           console.log(
//             "There was a problem while setting the displayName during sign up: ",
//             error
//           );
//         });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log("There was a problem signing up: ", errorCode, errorMessage);
//       console.log("user info: ", firstName, lastName, email, username, password);
//     });
// };