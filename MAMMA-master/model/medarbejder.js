class Medarbejder {
  
  constructor(navn, timeAntal, isPaedagog) {
    this.navn = navn;
    this.stue;
    this.timeAntal = timeAntal;
    this.isPaedagog = isPaedagog;
  }

  getNavn() {
    return this.navn;
  }

  setNavn(navn) {
    this.navn = navn;
  }

  getTimeAntal() {
    return this.timeAntal;
  }

  setTimeantal(timeAntal) {
    this.timeAntal = timeAntal;
  }

  getIsPaedagog() {
    return this.isPaedagog;
  }

  setIsPaedagog(isPaedagog) {
    this.isPaedagog = isPaedagog;
  }

  toString() {
    return this.navn;
  }

  //Sammenhænge til andre klasser

  // Medarbejder 0..* <--> 0..1 Stue

  getStue() {
    return this.stue;
  }

  setStue(stue) {
    if (this.stue != stue) {
      const oldStue = this.stue;
      if (oldStue != null) {
        oldStue.removeMedarbejder(this);
      }
      this.stue = stue;
      if (stue != null) {
        stue.addMedarbejder(this);
      }
    }
  }

}
export default Medarbejder;
