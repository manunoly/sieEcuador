import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-muestra-seleccionada',
  templateUrl: 'muestra-seleccionada.html',
})
export class MuestraSeleccionadaPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {}

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("MuestraSeleccionadaPage");
  }

  siguiente() {
    this.navCtrl.push("BenchmarkingPage");
  }

  anterior() {
    this.navCtrl.push("MuestraSeleccionadaPage");
  }
}
