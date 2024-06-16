import { addDoc, arrayUnion, arrayRemove, collection, getDocs, updateDoc, doc } from "firebase/firestore";
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
};

export const getAllCompetitions = async () => {
    const competitions = [];
    const querySnapshot = await getDocs(collection(db, "competitions"));
    querySnapshot.forEach((doc) => {
        competitions.push(doc.data());
    });
    return competitions;
};

export const updatePlayers = async (competitionId, player, remove = false) => {
    try {
        const competitionRef = doc(db, "competitions", competitionId);
        if (remove) {
            await updateDoc(competitionRef, {
                players: arrayRemove(player)
            });
            console.log("Player removed from competition with ID: ", competitionId, " Player: ", player);
        } else {
            await updateDoc(competitionRef, {
                players: arrayUnion(player)
            });
            console.log("Player added to competition with ID: ", competitionId, " Player: ", player);
        }
        return true;
    } catch (e) {
        console.error("Error updating players: ", e);
        return false;
    }
};

export const updateWinners = async (competitionId, winners) => {
    try {
        const competitionRef = doc(db, "competitions", competitionId);
        await updateDoc(competitionRef, {
            winners: winners
        });
        console.log("Winners updated for competition with ID: ", competitionId, " Winners: ", winners);
        return true;
    } catch (e) {
        console.error("Error updating winners: ", e);
        return false;
    }
};

export const concludeEvent = async (competitionId) => {
    try {
        const competitionRef = doc(db, "competitions", competitionId);
        await updateDoc(competitionRef, {
            concluded: true
        });
        console.log("Competition concluded with ID: ", competitionId);
        return true;
    } catch (e) {
        console.error("Error concluding competition: ", e);
        return false;
    }
};