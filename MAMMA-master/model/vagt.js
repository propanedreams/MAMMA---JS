class Vagt {

    constructor(dag, startTime, startMinut, slutTime, slutMinut, isPaedagog) {
        this.medarbejder = null;
        this.dag = dag;
        this.start = new Date()
        this.start.setHours(startTime,startMinut,0,0)
        this.slut = new Date()
        this.slut.setHours(slutTime,slutMinut,0,0)
        this.isPaedagog = isPaedagog;
    }

    toString() {
        return this.start + " " + this.slut;
    }

    getSlut(){
        return this.slut.getTime();
    }

    getStart(){
        return this.start.getTime();
    }

    getDag(){
        return this.dag;
    }

    //Sammenhænge til andre klasser

    // Vagt 0..* --> 1 Medarbejder

    getMedarbejder() {
        return this.medarbejder;
    }

    setMedarbejder(medarbejder) {
        this.medarbejder = medarbejder
        return medarbejder
    }

    //Metoder

    antalTimer() {
        return (this.slut.getTime() - this.start.getTime()) / (1000 * 60 * 60)
    }

}

export default Vagt