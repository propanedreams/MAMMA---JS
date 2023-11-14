
class Ugeplan {

    constructor(ugeNr, årstal) {
        this.ugeNr = ugeNr;
        this.årstal = årstal;
        this.dage = [{dag:'mandag', vagter:[]},{dag:'tirsdag', vagter:[]},{dag:'onsdag', vagter:[]},{dag:'torsdag', vagter:[]},{dag:'fredag', vagter:[]}];
    }

    getUgeNr() {
        return this.ugeNr;
    }

    setUgeNr(ugeNr) {
        this.ugeNr = ugeNr;
    }

    getÅrstal() {
        return this.årstal;
    }

    setÅrstal(årstal) {
        this.årstal = årstal;
    }

    toString() {
        return this.ugeNr;
    }

    //Sammenhænge til andre klasser

    // Ugeplan 1 --> 0..* Dag

    getDage() {
        return this.dage;
    }

    addVagtToDag(vagt, dag){
        for (const e of this.dage) {
            if(e == dag){
                e.push(vagt)
            }
        }
    }

}

export default Ugeplan;