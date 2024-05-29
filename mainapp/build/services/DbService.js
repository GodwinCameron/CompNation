import { addDoc, collection, getDocs } from "firebase/firestore";
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