import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

var Gauge = require("gaugeJS");

@IonicPage()
@Component({
  selector: 'page-simulacion-etiquetado',
  templateUrl: 'simulacion-etiquetado.html',
})
export class SimulacionEtiquetadoPage {
  simulado: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.simulado = this.navParams.get("datos");
    this.pintar();
  }


  pintar() {
    let opts = {
      lineWidth: 0.7, // The line thickness
      limitMax: true, // If false, max value increases automatically if value > maxValue
      limitMin: true,
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: "#000000" // Fill color
      },
      generateGradient: true,
      highDpiSupport: true, // High resolution support
      staticLabels: {
        font: "10px sans-serif", // Specifies font
        labels: [
          this.simulado.rango_inicio,
          this.simulado.rango_minimo,
          this.simulado.rango_medio,
          this.simulado.rango_maximo
        ], // Print labels at these values
        color: "#000000", // Optional: Label text color
        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
      },
      staticZones: [
        {
          strokeStyle: "rgb(173, 248, 49)",
          min: this.simulado.rango_inicio,
          max: this.simulado.rango_minimo,
          height: 1
        },
        {
          strokeStyle: "rgb(248, 245, 49)",
          min: this.simulado.rango_minimo,
          max: this.simulado.rango_medio,
          height: 1
        },
        {
          strokeStyle: "rgb(204, 0, 0)",
          min: this.simulado.rango_medio,
          max: this.simulado.rango_maximo,
          height: 1
        }
      ]
    };
    var target = document.getElementById("gauge-a");
    let gauge = new Gauge.Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = this.simulado.rango_maximo; // set max gauge value
    gauge.setMinValue(this.simulado.rango_inicio); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 80; // set animation speed (32 is default value)
    gauge.set(this.simulado.resultado); // set actual value
  }

  cerrar(){
    this.navCtrl.pop();
  }

  goToTaller(){
    this.navCtrl.push("TallerBuenasPracticasPage");
  }

}
