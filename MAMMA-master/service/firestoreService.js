import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { firebaseConfig } from "./firebaseConfig.js";

// Initialize Firebase
const app_firebase = initializeApp(firebaseConfig);
const db = getFirestore();
//const analytics = getAnalytics(app);

//teamscontroller
//--------------------- Team -------------------
let teamsCollection = collection(db, 'teams')
async function getTeamsDB() {
    let teamsQueryDocs = await getDocs(teamsCollection)
    let teams = teamsQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return teams
}

async function getTeamDB(id) {
    const docRef = doc(teamsCollection, id);
    const teamQueryDoc = await getDoc(docRef);
    let team = teamQueryDoc.data();
    return team;
}

async function getStuerOnTeamDB(id){
    let result = []
    let team = await getTeamDB(id);
    for (const stue of team.stuer) {
        result.push(await getStueDB(stue.docID))
    }
    return result;
}

async function addTeamDB(team) {
    let teamDoc = {
        'farve': team.farve,
        'stuer': team.stuer,
        'fkode': team.fkode
    }
    const docRef = await addDoc(teamsCollection, teamDoc)
    return docRef.id
}

async function deleteTeamDB(id) {
    try {
        let docRef = await doc(teamsCollection, id)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement
    } catch (error) {
        console.error(error);
    }
}
// -------------- Stue ---------------------

let stuerCollection = collection(db, 'stue')
async function getStuerDB() {
    let stuerQueryDocs = await getDocs(stuerCollection)
    let stuer = stuerQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return stuer
}

async function addStueToTeamDB(teamID,stueID){
    
        let team = await getTeamDB(teamID)
        let result = []
        for (const stue of team.stuer) {
            console.log("stue.docid: " + stue.docID);
            result.push(stue.docID)
        }
        result.push(stueID)
        console.log("teamets stueIDs: " + result);

        let updatedItem = await updateDoc(team,{
            'fkode':team.fkode,
            'farve':team.farve,
            'stuer': result
        })
        return updatedItem
    
    
}
 
async function addStuerDB(stue) {
    let stueDoc = {
        'navn': stue.navn,
        'team': stue.teamID,
        'medarbejdere': stue.medarbejdere
    }
    const docRef = await addDoc(stuerCollection, stueDoc)
    return docRef
}

async function deleteStueDB(id) {
    try {
        let docRef = doc(stuerCollection, id)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement
    } catch (error) {
        console.error(error);
    }
}

async function getStueDB(id){
    const docRef = doc(stuerCollection, id);
    const stueQueryDoc = await getDoc(docRef);
    let stue = stueQueryDoc.data();
    stue.docID = stueQueryDoc.id;
    return stue;
}

async function addMedarbejderToStueDB(stueID, medarbejder){
    let stue = await getStueDB(stueID);
    let updatedMedarbejdere = stue.medarbejdere.push(medarbejder.docID)
    let result = await updateDoc(stue, {
        'medarbejdere': updatedMedarbejdere
    })
    return result;
}

async function getMedarbejdereOnStueDB(id){
    let result = []
    let stue = await getStue(id);
    for (const medarbejder of stue.medarbejdere) {
        result.push(await getStueDB(medarbejder.docID))
    }
    return result;
}

//----------------medarbejdercontroller--------------
//---------------------medarbejder -------------------
let MedarbejderCollection = collection(db, 'medarbejdere')
async function getMedarbejdereDB() {
    let medarbejdereQueryDocs = await getDocs(MedarbejderCollection);
    let medarbejdere = medarbejdereQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return medarbejdere
}
async function addMedarbejderDB(medarbejder, stue) {
    let tempBoolean = false;
    if (medarbejder.isPaedagog == 'on') {
        tempBoolean = true;
    }
    let medarbejderDoc = {
        'navn': medarbejder.navn,
        'stue': stue,
        'timeAntal': medarbejder.timeAntal,
        'isPaedagog': tempBoolean
    }
    const docRef = await addDoc(MedarbejderCollection, medarbejderDoc)
    return docRef.id;
}
async function deleteMedarbejderDB(id) {
    try {
        let docRef = doc(MedarbejderCollection, id)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement
    } catch (error) {
        console.error(error);
    }
}

async function setStueForMedarbejderDB(medarbejder, stue) {
    try {
        let docRef = doc(MedarbejderCollection,medarbejder)
        await updateDoc(medarbejder, {
            'stue': stue
        })
        return docRef;
    } catch (error) {
        console.error(error);
    }
}
//---------------------------vagter--------------------------
let VagtCollection = collection(db, 'vagter');
async function getVagterDB() {
    let vagtQueryDocs = await getDocs(VagtCollection)
    let vagter = vagtQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return vagter
}

async function addVagterDB(vagt) {
    let vagterDoc = {
        'medarbejder': vagt.medarbejder,
        'dag': vagt.dag,
        'start': vagt.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'slut': vagt.slut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'isPaedagog': vagt.isPaedagog
    }
    const docRef = await addDoc(VagtCollection, vagterDoc)
    return docRef.id;
}
async function deleteVagtDB(id) {
    try {
        let nyVagtListe = []
        let principper = await this.getPrincipperDB();
        for (const princip of principper) {
            let principDoc = await doc(PrincipCollection, princip.docID)
            for (const vagt of princip.vagter) {
                if(vagt.docID != id){
                    nyVagtListe.push(vagt)
                }
            }
            await updateDoc(principDoc, {
                vagter: nyVagtListe
            })
        }

        let docRef = await doc(VagtCollection, id)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement
    } catch (error) {
        console.log(error);
    }
}

async function updateVagtDB(id,medarbejder){
    try {
        let docRef = doc(VagtCollection, id)
        let updatedItem = await updateDoc(docRef, {
            'medarbejder': medarbejder
        })
        return updatedItem
    } catch (error) {
        console.error(error);
    }

}
//------------------------ugeplan-------------------------
let UgeplanCollection = collection(db, 'ugeplaner')
async function getUgeplanerDB() {
    let ugeplanQueryDocs = await getDocs(UgeplanCollection)
    let ugeplaner = ugeplanQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return ugeplaner
}

async function getDageDB() {

    let dagDoc = null;
    let ugeplan = await getUgeplanerDB()
    let dage = [];
    for (const uge of ugeplan) {
        for (const iterator of uge.dage) {
            dage.push(iterator.dag)
        }
    }
    return dage
}

async function addUgeplanDB(ugeplan) {
    let ugeplanerDoc = {
        'ugeNr': ugeplan.ugeNr,
        'årstal': ugeplan.årstal,
        'dage': ugeplan.dage
    }
    const docRef = await addDoc(UgeplanCollection, ugeplanerDoc)
    return docRef.id
}

async function deleteUgeplanDB(id) {
    try {
        let docRef = doc(UgeplanCollection)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement;
    } catch (error) {
        console.log(error);
    }
}

//---------------------------principper--------------------------
let PrincipCollection = collection(db, 'principper');
async function getPrincipperDB() {
    let principQueryDocs = await getDocs(PrincipCollection)
    let principper = principQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return principper
}
async function addPrincipDB(princip) {
    let principperDoc = {
        'start': princip.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'slut': princip.slut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        'minAntalMedarbejdere': princip.minAntalMedarbejdere,
        'minAntalPædagoger': princip.minAntalPædagoger,
        'minAntalStue': princip.minAntalStue,
        'minAntalTeam': princip.minAntalTeam,
        'vagter': princip.vagter,
        'dage': princip.dage
    }
    const docRef = await addDoc(PrincipCollection, principperDoc)
    return docRef.id;
}

async function deletePrincipDB(id) {
    try {
        let docRef = doc(PrincipCollection, id)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement
    } catch (error) {
        console.error(error);
    }
}

async function updatePrincipDB(id, dage){
    try {
        let docRef = doc(PrincipCollection, id)
        let updatedItem = await updateDoc(docRef, {
            'dage': dage
        })
        return updatedItem
    } catch (error) {
        console.error(error);
    }
}

//---------------------medarbejder -------------------
let VikarCollection = collection(db, 'vikar')
async function getVikarDB() {
    let vikarQueryDocs = await getDocs(VikarCollection);
    let vikar = vikarQueryDocs.docs.map(doc => {
        let data = doc.data()
        data.docID = doc.id
        return data
    })
    return vikar
}
async function addVikarDB(vikar) {
    let vikarDoc = {
        'navn': vikar.navn,
        'mobil': vikar.mobil,
        'rating': vikar.rating,
    }
    const docRef = await addDoc(VikarCollection, vikarDoc)
    return docRef.id;
}
async function deleteVikarDB(id) {
    try {
        let docRef = doc(VikarCollection, id)
        let deletedElement = await deleteDoc(docRef)
        return deletedElement
    } catch (error) {
        console.error(error);
    }
}

async function updateVikarRatingDB(id, retning, rating){
    let vikar = await doc(VikarCollection, id);
    let gammelRating = parseInt(rating)
    let nyRating;
    let vikarChanged;
    if(retning == 'up'){
        nyRating = gammelRating + 1;
        vikarChanged = await updateDoc(vikar, {
            'rating': nyRating
        })
    } else {
        nyRating = gammelRating*1 - 1;
        vikarChanged = await updateDoc(vikar, {
            'rating': nyRating
        })
    }
    return vikarChanged

}

export {
    getTeamsDB, addTeamDB, deleteTeamDB, getStuerDB,getStueDB,
    addStuerDB, getUgeplanerDB, addUgeplanDB, addVagterDB, getVagterDB, updateVagtDB, addPrincipDB, getPrincipperDB, deletePrincipDB,
    getMedarbejdereDB, addMedarbejderDB, setStueForMedarbejderDB,getMedarbejdereOnStueDB, updatePrincipDB,
    deleteMedarbejderDB, deleteStueDB, deleteUgeplanDB, deleteVagtDB, getDageDB, addMedarbejderToStueDB, addStueToTeamDB, getStuerOnTeamDB,
    deleteVikarDB, addVikarDB, getVikarDB, updateVikarRatingDB
}
