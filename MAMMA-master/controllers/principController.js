import {
  addPrincipDB,
  getPrincipperDB,
  deletePrincipDB,
  getVagterDB,
  updatePrincipDB,
} from "../service/firestoreService.js";
import Princip from "../model/princip.js";
import { VagtController } from "../controllers/vagtController.js";
import teamsController from "../controllers/teamsController.js";

class PrincipController {
  //--------------------princip---------------------------------
  static async createPrincip(
    startTime,
    startMinut,
    slutTime,
    slutMinut,
    minAntalMedarbejdere,
    minAntalPædagoger,
    minAntalPrStue,
    minAntalPrTeam,
    dage
  ) {
    let princip = new Princip(
      startTime,
      startMinut,
      slutTime,
      slutMinut,
      minAntalMedarbejdere,
      minAntalPædagoger,
      minAntalPrStue,
      minAntalPrTeam,
      dage
    );
    await addPrincipDB(princip);
    return princip;
  }
  static async getPrincipper() {
    return await getPrincipperDB();
  }

  static async deletePrincip(id) {
    await deletePrincipDB(id);
    return id;
  }

  static async tilføjVagterTilPrincip(princip) {
    let indgårVagter = [
      { dag: "mandag", vagter: [] },
      { dag: "tirsdag", vagter: [] },
      { dag: "onsdag", vagter: [] },
      { dag: "torsdag", vagter: [] },
      { dag: "fredag", vagter: [] },
    ];
    let indgårIkkeVagter = [];
    let vagter = await VagtController.getVagter();
    for (const vagt of vagter) {
      let indgår = await this.tidspunktIndgår(
        princip.start,
        princip.slut,
        vagt.start,
        vagt.slut
      );
      if (vagt.dag == "mandag") {
        if (indgår) {
          indgårVagter[0].vagter.push(vagt);
        } else {
          indgårIkkeVagter.push(vagt);
        }
      }
      if (vagt.dag == "tirsdag") {
        if (indgår) {
          indgårVagter[1].vagter.push(vagt);
        } else {
          indgårIkkeVagter.push(vagt);
        }
      }
      if (vagt.dag == "onsdag") {
        if (indgår) {
          indgårVagter[2].vagter.push(vagt);
        } else {
          indgårIkkeVagter.push(vagt);
        }
      }
      if (vagt.dag == "torsdag") {
        if (indgår) {
          indgårVagter[3].vagter.push(vagt);
        } else {
          indgårIkkeVagter.push(vagt);
        }
      }
      if (vagt.dag == "fredag") {
        if (indgår) {
          indgårVagter[4].vagter.push(vagt);
        } else {
          indgårIkkeVagter.push(vagt);
        }
      }
    }
    updatePrincipDB(princip.docID, indgårVagter);
  }

  static async tidspunktIndgår(
    startTidspunkt1,
    slutTidspunkt1,
    startTidspunkt2,
    slutTidspunkt2
  ) {
    let tidspunkt1 = new Date();
    tidspunkt1.setHours(startTidspunkt1.split(".")[0]);
    tidspunkt1.setMinutes(startTidspunkt1.split(".")[1]);
    let tidspunkt2 = new Date();
    tidspunkt2.setHours(slutTidspunkt1.split(".")[0]);
    tidspunkt2.setMinutes(slutTidspunkt1.split(".")[1]);
    let tidspunkt3 = new Date();
    tidspunkt3.setHours(startTidspunkt2.split(".")[0]);
    tidspunkt3.setMinutes(startTidspunkt2.split(".")[1]);
    let tidspunkt4 = new Date();
    tidspunkt4.setHours(slutTidspunkt2.split(".")[0]);
    tidspunkt4.setMinutes(slutTidspunkt2.split(".")[1]);
    if (tidspunkt1 < tidspunkt4 && tidspunkt3 < tidspunkt2) {
      return true; // Tidspunktet indgår
    } else {
      return false; // Tidspunktet indgår ikke
    }
  }

  static async vagterPrDag(principper) {
    let antalM = {
      mandag: [],
      tirsdag: [],
      onsdag: [],
      torsdag: [],
      fredag: [],
    };
    for (const princip of principper) {
      for (const vagt of princip.vagter) {
        if (vagt.dag === "mandag") {
          antalM.mandag.push(vagt);
        } else if (vagt.dag === "tirsdag") {
          antalM.tirsdag.push(vagt);
        } else if (vagt.dag === "onsdag") {
          antalM.onsdag.push(vagt);
        } else if (vagt.dag === "torsdag") {
          antalM.torsdag.push(vagt);
        } else if (vagt.dag === "fredag") {
          antalM.fredag.push(vagt);
        }
      }
    }
    return antalM;
  }

  static async antalMedarbejdere(principper) {
    let vagterPrDag = await this.vagterPrDag(principper);
    let antalMmandag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.mandag) {
          if (vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalMmandag.push(princip.dage[0].vagter.length);
    }
    let antalMtirsdag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.tirsdag) {
          if (vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalMtirsdag.push(antal);
    }
    let antalMonsdag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.onsdag) {
          if (vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalMonsdag.push(antal);
    }
    let antalMtorsdag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.torsdag) {
          if (vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalMtorsdag.push(antal);
    }
    let antalMfredag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.fredag) {
          if (vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalMfredag.push(antal);
    }
    let antalM = [
      antalMmandag,
      antalMtirsdag,
      antalMonsdag,
      antalMtorsdag,
      antalMfredag,
    ];
    return antalM;
  }

  static async antalPædagoger(principper) {
    let vagterPrDag = await this.vagterPrDag(principper);
    let antalPmandag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.mandag) {
          if (vagt.medarbejder.isPaedagog && vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalPmandag.push(antal);
    }
    let antalPtirsdag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.tirsdag) {
          if (vagt.medarbejder.isPaedagog && vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalPtirsdag.push(antal);
    }
    let antalPonsdag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.onsdag) {
          if (vagt.medarbejder.isPaedagog && vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalPonsdag.push(antal);
    }
    let antalPtorsdag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.torsdag) {
          if (vagt.medarbejder.isPaedagog && vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalPtorsdag.push(antal);
    }
    let antalPfredag = [];
    for (const princip of principper) {
      let antal = 0;
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.fredag) {
          if (vagt.medarbejder.isPaedagog && vagtPrincip === vagt) {
            antal++;
          }
        }
      }
      antalPfredag.push(antal);
    }
    let antalP = [
      antalPmandag,
      antalPtirsdag,
      antalPonsdag,
      antalPtorsdag,
      antalPfredag,
    ];
    return antalP;
  }

  static async antalStue(principper) {
    let vagterPrDag = await this.vagterPrDag(principper);
    let antalSmandag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0, 0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.mandag) {
          if (
            vagt.medarbejder.stue.navn === "Herkules" &&
            vagtPrincip === vagt
          ) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.navn === "Dragen" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.navn === "Pegasus" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          } else if (
            vagt.medarbejder.stue.navn === "Cassiopeia" &&
            vagtPrincip === vagt
          ) {
            antal[3]++;
          } else if (
            vagt.medarbejder.stue.navn === "Fønix" &&
            vagtPrincip === vagt
          ) {
            antal[4]++;
          } else if (
            vagt.medarbejder.stue.navn === "Kentaur" &&
            vagtPrincip === vagt
          ) {
            antal[5]++;
          }
        }
      }
      minAntal = Math.min(
        antal[0],
        antal[1],
        antal[2],
        antal[3],
        antal[4],
        antal[5]
      );
      antalSmandag.push(minAntal);
    }
    let antalStirsdag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0, 0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.tirsdag) {
          if (
            vagt.medarbejder.stue.navn === "Herkules" &&
            vagtPrincip === vagt
          ) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.navn === "Dragen" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.navn === "Pegasus" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          } else if (
            vagt.medarbejder.stue.navn === "Cassiopeia" &&
            vagtPrincip === vagt
          ) {
            antal[3]++;
          } else if (
            vagt.medarbejder.stue.navn === "Fønix" &&
            vagtPrincip === vagt
          ) {
            antal[4]++;
          } else if (
            vagt.medarbejder.stue.navn === "Kentaur" &&
            vagtPrincip === vagt
          ) {
            antal[5]++;
          }
        }
      }
      minAntal = Math.min(
        antal[0],
        antal[1],
        antal[2],
        antal[3],
        antal[4],
        antal[5]
      );
      antalStirsdag.push(minAntal);
    }
    let antalSonsdag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0, 0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.onsdag) {
          if (
            vagt.medarbejder.stue.navn === "Herkules" &&
            vagtPrincip === vagt
          ) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.navn === "Dragen" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.navn === "Pegasus" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          } else if (
            vagt.medarbejder.stue.navn === "Cassiopeia" &&
            vagtPrincip === vagt
          ) {
            antal[3]++;
          } else if (
            vagt.medarbejder.stue.navn === "Fønix" &&
            vagtPrincip === vagt
          ) {
            antal[4]++;
          } else if (
            vagt.medarbejder.stue.navn === "Kentaur" &&
            vagtPrincip === vagt
          ) {
            antal[5]++;
          }
        }
      }
      minAntal = Math.min(
        antal[0],
        antal[1],
        antal[2],
        antal[3],
        antal[4],
        antal[5]
      );
      antalSonsdag.push(minAntal);
    }
    let antalStorsdag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0, 0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.torsdag) {
          if (
            vagt.medarbejder.stue.navn === "Herkules" &&
            vagtPrincip === vagt
          ) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.navn === "Dragen" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.navn === "Pegasus" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          } else if (
            vagt.medarbejder.stue.navn === "Cassiopeia" &&
            vagtPrincip === vagt
          ) {
            antal[3]++;
          } else if (
            vagt.medarbejder.stue.navn === "Fønix" &&
            vagtPrincip === vagt
          ) {
            antal[4]++;
          } else if (
            vagt.medarbejder.stue.navn === "Kentaur" &&
            vagtPrincip === vagt
          ) {
            antal[5]++;
          }
        }
      }
      minAntal = Math.min(
        antal[0],
        antal[1],
        antal[2],
        antal[3],
        antal[4],
        antal[5]
      );
      antalStorsdag.push(minAntal);
    }
    let antalSfredag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0, 0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.fredag) {
          if (
            vagt.medarbejder.stue.navn === "Herkules" &&
            vagtPrincip === vagt
          ) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.navn === "Dragen" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.navn === "Pegasus" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          } else if (
            vagt.medarbejder.stue.navn === "Cassiopeia" &&
            vagtPrincip === vagt
          ) {
            antal[3]++;
          } else if (
            vagt.medarbejder.stue.navn === "Fønix" &&
            vagtPrincip === vagt
          ) {
            antal[4]++;
          } else if (
            vagt.medarbejder.stue.navn === "Kentaur" &&
            vagtPrincip === vagt
          ) {
            antal[5]++;
          }
        }
      }
      minAntal = Math.min(
        antal[0],
        antal[1],
        antal[2],
        antal[3],
        antal[4],
        antal[5]
      );
      antalSfredag.push(minAntal);
    }
    let antalS = [
      antalSmandag,
      antalStirsdag,
      antalSonsdag,
      antalStorsdag,
      antalSfredag,
    ];
    return antalS;
  }

  static async antalTeam(principper) {
    let vagterPrDag = await this.vagterPrDag(principper);
    let antalTmandag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.mandag) {
          if (vagt.medarbejder.stue.team === "Blå" && vagtPrincip === vagt) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.team === "Rød" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.team === "Grøn" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          }
        }
      }
      minAntal = Math.min(antal[0], antal[1], antal[2]);
      antalTmandag.push(minAntal);
    }

    let antalTtirsdag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.tirsdag) {
          if (vagt.medarbejder.stue.team === "Blå" && vagtPrincip === vagt) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.team === "Rød" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.team === "Grøn" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          }
        }
      }
      minAntal = Math.min(antal[0], antal[1], antal[2]);
      antalTtirsdag.push(minAntal);
    }
    let antalTonsdag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.onsdag) {
          if (vagt.medarbejder.stue.team === "Blå" && vagtPrincip === vagt) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.team === "Rød" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.team === "Grøn" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          }
        }
      }
      minAntal = Math.min(antal[0], antal[1], antal[2]);
      antalTonsdag.push(minAntal);
    }
    let antalTtorsdag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.torsdag) {
          if (vagt.medarbejder.stue.team === "Blå" && vagtPrincip === vagt) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.team === "Rød" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.team === "Grøn" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          }
        }
      }
      minAntal = Math.min(antal[0], antal[1], antal[2]);
      antalTtorsdag.push(minAntal);
    }
    let antalTfredag = [];
    for (const princip of principper) {
      let minAntal = 0;
      let antal = [0, 0, 0];
      for (const vagtPrincip of princip.vagter) {
        for (const vagt of vagterPrDag.fredag) {
          if (vagt.medarbejder.stue.team === "Blå" && vagtPrincip === vagt) {
            antal[0]++;
          } else if (
            vagt.medarbejder.stue.team === "Rød" &&
            vagtPrincip === vagt
          ) {
            antal[1]++;
          } else if (
            vagt.medarbejder.stue.team === "Grøn" &&
            vagtPrincip === vagt
          ) {
            antal[2]++;
          }
        }
      }
      minAntal = Math.min(antal[0], antal[1], antal[2]);
      antalTfredag.push(minAntal);
    }
    let antalT = [
      antalTmandag,
      antalTtirsdag,
      antalTonsdag,
      antalTtorsdag,
      antalTfredag,
    ];
    return antalT;
  }

  static async sorterPrincipperOgVagter(principper) {
    principper.sort(function (a, b) {
      return a.start - b.start;
    });
    for (const princip of principper) {
      princip.vagter.sort(function (a, b) {
        if (a.start !== b.start) {
          return a.start - b.start;
        }
        return a.slut - b.slut;
      });
    }
  }
}
export default PrincipController;
export { PrincipController };
