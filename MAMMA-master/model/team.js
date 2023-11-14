class Team {

  constructor(farve, fkode) {
    this.farve = farve;
    this.stuer = [];
    this.fkode = fkode;
  }

  getFarve() {
    return this.farve;
  }

  setFarve(farve) {
    this.farve = farve;
  }

  toString() {
    return this.farve;
}

  //Sammenhænge til andre klasser

  // Team 1 <--> 0..* Stue

  getStuer() {
    return this.stuer;
  }

  addStue(stue) {
    if(!this.stuer.includes(stue)){
    this.stuer.push(stue);
    stue.setTeam(this)
    }
    return stue;
  }

  removeStue(stue) {
    if (this.stuer.includes(stue)) {
      let index = this.stuer.indexOf(stue);
      if (index >= 0) {
        this.stuer.splice(index, 1);
        stue.setTeam(null)
      }
      return stue;
    }
  }

}

export default Team;



