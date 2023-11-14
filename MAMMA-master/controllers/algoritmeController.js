import Medarbejder from "../model/medarbejder.js";
import Vagt from "../model/vagt.js";
import Ugeplan from "../model/ugeplan.js";
import MedarbejderController from "../controllers/medarbejderController.js";
import UgeplanController from "../controllers/ugeplanController.js";
import VagtController from "../controllers/vagtController.js";
import PrincipController from "../controllers/principController.js";
import teamsController from "../controllers/teamsController.js";
import { addUgeplanDB, updateVagtDB, addPrincipDB, updatePrincipDB } from "../service/firestoreService.js";

// Col = dage
// Række = vagter

const medarbejderListe = await MedarbejderController.getMedarbejdere();
const ugeplan = new Ugeplan(1, 2023);
const alleVagter = await VagtController.getVagter();
let principper = await PrincipController.getPrincipper();
const stuer = await teamsController.getStuer();
const teams = await teamsController.getTeams();
let listeMedMedarbejderePåEnDag = [];
let indgårVagter = [];

//Sætter vagter på alle dage i ugeplanen og sætter medarbejder = null
function loop() {
  alleVagter.forEach(vagt => {
    if(vagt.dag == "mandag"){
      ugeplan.dage[0].vagter.push(vagt);
    }
    if(vagt.dag == "tirsdag"){
      ugeplan.dage[1].vagter.push(vagt);
    }
    if(vagt.dag == "onsdag"){
      ugeplan.dage[2].vagter.push(vagt);
    }
    if(vagt.dag == "torsdag"){
      ugeplan.dage[3].vagter.push(vagt);
    }
    if(vagt.dag == "fredag"){
      ugeplan.dage[4].vagter.push(vagt);
    }
  });
}

function sætterMedarbejderTilNullIPrincipper(){
  let tæller = 0;
  principper.forEach(princip => {
    let dage = [{dag:'mandag', vagter:[]},{dag:'tirsdag', vagter:[]},{dag:'onsdag', vagter:[]},{dag:'torsdag', vagter:[]},{dag:'fredag', vagter:[]}];
    princip.dage.forEach(dag => {
      dag.vagter.forEach(vagt => {
        vagt.medarbejder = null;
        dage[tæller].vagter.push(vagt);
      });
      tæller++;
    });
    tæller=0;
    updatePrincipDB(princip.docID, dage);
  });
}

function tilføjerVagterTilPrincipper(){
  principper.forEach(princip => {
    PrincipController.tilføjVagterTilPrincip(princip);
  });
}

function sætterMedarbejderTilNull() {
  principper.forEach((princip) => {
    alleVagter.forEach((vagt) => {
      //vagt.medarbejder = null;
      //updateVagtDB(vagt.docID, null);
      if(vagt.dag == "mandag"){
          princip.dage[0].vagter.push(vagt);
      }
      if(vagt.dag == "tirsdag"){
        princip.dage[1].vagter.push(vagt);
      }
      if(vagt.dag == "onsdag"){
        princip.dage[2].vagter.push(vagt);
      }
      if(vagt.dag == "torsdag"){
        princip.dage[3].vagter.push(vagt);
      }
      if(vagt.dag == "fredag"){
        princip.dage[4].vagter.push(vagt);
      }
    });
  });
}

function isSafe(princip, col, row, medarbejder, listeMedMedarbejdePåArbejdeDenDag) {
  if (princip.dage[col].vagter[row].isPaedagog == true) {
    if (medarbejder.isPaedagog == false) {
      return false;
    }
  }

    if (princip.minAntalMedarbejdere == listeMedMedarbejdePåArbejdeDenDag.length) {
      if (princip.minAntalTeam > 0) {
        for (let k = 0; k < teams.length; k++) {
          let tjek = 0;
          for (let j = 0; j < listeMedMedarbejdePåArbejdeDenDag.length; j++) {
            if (
              listeMedMedarbejdePåArbejdeDenDag[j].stue.team == teams[k].farve
            ) {
              tjek++;
            }
          }
          if (tjek < princip.minAntalTeam) {
            return false;
          }
        }
      }
      if (princip.minAntalStue > 0) {
        for (let k = 0; k < stuer.length; k++) {
          let tjek = 0;
          for (let j = 0; j < listeMedMedarbejdePåArbejdeDenDag.length; j++) {
            if (
              listeMedMedarbejdePåArbejdeDenDag[j].stue.navn == stuer[k].navn
            ) {
              tjek++;
            }
          }
          if (tjek < princip.minAntalStue) {
            return false;
          }
        }
      }
    }
  

  return true;
}

function solve(princip, col, row) {
  // Base case
  if (col == 4 && row == princip.dage[4].vagter.length) {
    return true;
  }

  // Hoppe col/dag hen, hvis man er noget til slutningen af dagen
  if (row == princip.dage[col].vagter.length) {
    row = 0;
    col++;
    // Nulstille liste når man skifter dag
    listeMedMedarbejderePåEnDag = [];
  }

  for (let i = 0; i < medarbejderListe.length; i++) {
    if (!listeMedMedarbejderePåEnDag.includes(medarbejderListe[i]) && listeMedMedarbejderePåEnDag.length <= princip.dage[col].vagter.length) {
      listeMedMedarbejderePåEnDag.push(medarbejderListe[i]);
      if (isSafe(princip, col, row, medarbejderListe[i], listeMedMedarbejderePåEnDag)) {
        princip.dage[col].vagter[row].medarbejder = medarbejderListe[i];
        if (solve(princip, col, row + 1)) {
          return true;
        }
        princip.dage[col].vagter[row].medarbejder = null;
        listeMedMedarbejderePåEnDag.pop(medarbejderListe[i]);
      } else {
        listeMedMedarbejderePåEnDag.pop(medarbejderListe[i]);
      }
    }
    if (listeMedMedarbejderePåEnDag.length == princip.dage[col].vagter.length) {
      return true;
    }
  }

  //console.log(princip);
  return false;
}



function sætMedarbejderPåVagt() {
  ugeplan.dage.forEach((dag) => {
    dag.vagter.forEach((vagt) => {
      updateVagtDB(vagt.docID, vagt.medarbejder);
    });
  });
}

function omdanPrincipper(){
  sætterMedarbejderTilNull();
  principper.forEach(princip => {
    console.log(princip.dage);
    let startTime = princip.start.split('.');
    let slutTime = princip.slut.split('.');
    PrincipController.createPrincip(startTime[0], startTime[1], slutTime[0], slutTime[1], princip.minAntalMedarbejdere, princip.minAntalPædagoger, princip.minAntalStue, princip.minAntalTeam, princip.dage);
    PrincipController.deletePrincip(princip.docID);
  });
}

function nySolve(){
  let tæller = 0;
  for (let i = 0; i < principper.length; i++) {
    solve(principper[i], 0, 0);
    //console.log(principper[i].dage[0].vagter);
    let dage = [{dag:'mandag', vagter:[]},{dag:'tirsdag', vagter:[]},{dag:'onsdag', vagter:[]},{dag:'torsdag', vagter:[]},{dag:'fredag', vagter:[]}];
    principper[i].dage.forEach(dag => {
      dag.vagter.forEach(vagt => {
        dage[tæller].vagter.push(vagt);
      });
      tæller++;
    });
    tæller=0;
    
    console.log(dage.vagter);
    updatePrincipDB(principper[i].docID, dage);
    
  }
}

console.log("-------------------- START --------------------");

sætterMedarbejderTilNullIPrincipper();
nySolve();
//console.log(principper[0].dage[0].vagter);
console.log("-------------------- SLUT --------------------");
