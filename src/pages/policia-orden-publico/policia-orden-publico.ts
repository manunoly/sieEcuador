import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PoliciaOrdenPublicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policia-orden-publico',
  templateUrl: 'policia-orden-publico.html',
})
export class PoliciaOrdenPublicoPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("PoliciaOrdenPublicoPage");
  }

  siguiente() {
    this.navCtrl.push("OficinasPage");
  }

  anterior() {
    this.navCtrl.push("CentrosEducativosPage");
  }
}
