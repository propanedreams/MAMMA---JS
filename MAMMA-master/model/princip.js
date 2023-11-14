class Princip {
  constructor(
    startTime,
    startMinut,
    slutTime,
    slutMinut,
    minAntalMedarbejdere,
    minAntalPædagoger,
    minAntalStue,
    minAntalTeam,
    dage
  ) {
    this.start = new Date();
    this.start.setHours(startTime, startMinut, 0, 0);
    this.slut = new Date();
    this.slut.setHours(slutTime, slutMinut, 0, 0);
    this.minAntalMedarbejdere = minAntalMedarbejdere;
    this.minAntalPædagoger = minAntalPædagoger;
    this.minAntalStue = minAntalStue;
    this.minAntalTeam = minAntalTeam;
    this.vagter = [];
    this.dage = dage;
  }

  toString() {
    return this.start + " " + this.slut;
  }

  getSlut() {
    return this.slut.getTime();
  }

  getStart() {
    return this.start.getTime();
  }

  getMinAntalMedarbejdere() {
    return this.minAntalMedarbejdere;
  }

  getMinAntalPædagoger() {
    return this.minAntalPædagoger;
  }

  getMinAntalStue() {
    return this.minAntalStue;
  }

  getMinAntalTeam() {
    return this.minAntalTeam;
  }

  //Sammenhænge til andre klasser

  // Princip 1 --> 0..* Vagt
  getVagter() {
    return this.vagter;
  }

  getDage() {
    return this.dage;
  }

  addVagt(vagt) {
    if (!this.vagter.includes(vagt)) {
      this.vagts.push(vagt);
    }
    return vagt;
  }

  removeVagt(vagt) {
    if (this.vagter.includes(vagt)) {
      let index = this.vagter.indexOf(vagt);
      if (index >= 0) {
        this.vagter.splice(index, 1);
      }
      return vagt;
    }
  }

  addVagtToDag(vagt, dag) {
    for (const e of this.dage) {
      if (e == dag) {
        e.push(vagt);
      }
    }
  }

  //Metoder
}

export default Princip;
