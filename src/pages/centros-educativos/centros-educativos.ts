import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CentrosEducativosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-centros-educativos',
  templateUrl: 'centros-educativos.html',
})
export class CentrosEducativosPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("CentrosEducativosPage");
  }

  siguiente() {
    this.navCtrl.push("PoliciaOrdenPublicoPage");
  }

  anterior() {
    this.navCtrl.push("CentrosSaludPage");
  }
}
