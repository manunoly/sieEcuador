import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-centros-salud',
  templateUrl: 'centros-salud.html',
})
export class CentrosSaludPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("CentrosSaludPage");
  }

  siguiente() {
    this.navCtrl.push("CentrosEducativosPage");
  }

  anterior() {
    this.navCtrl.push("EtiquetadoEnergeticoPage");
  }
}
