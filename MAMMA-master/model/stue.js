class Stue {

  constructor(navn, teamID) {
    this.teamID = teamID;
    this.navn = navn;
    this.medarbejdere = [];
  }

  getNavn() {
    return this.navn;
  }

  setNavn(navn) {
    this.navn = navn;
  }

  toString() {
    return this.navn;
  }

  //Sammenhænge til andre klasser

  // Stue 0..* <--> 1 Team

  getTeam() {
    return this.teamID;
  }

  setTeam(teamID){
    this.teamID = teamID
    return teamID
  }

  // Stue 0..1 <--> 0..* Medarbejder

  getMedarbejdere() {
    return this.medarbejdere;
  }
  
  addMedarbejder(medarbejderID) {
    if (!this.medarbejdere.includes(medarbejderID)) {
      this.medarbejdere.push(medarbejderID);
      medarbejderID.setStue(this);
      return medarbejderID;
    }
  }

  removeMedarbejder(medarbejderID) {
    if (this.medarbejdere.includes(medarbejderID)) {
      let index = this.medarbejdere.indexOf(medarbejderID);
      if (index >= 0) {
        this.medarbejdere.splice(index, 1);
        medarbejderID.setStue(undefined);
      }
      return medarbejderID;
    }
  }

}

export default Stue;

