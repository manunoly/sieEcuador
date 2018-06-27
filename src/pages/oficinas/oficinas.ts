import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OficinasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oficinas',
  templateUrl: 'oficinas.html',
})
export class OficinasPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("OficinasPage");
  }

  siguiente() {
    this.navCtrl.push("OficinasPage");
  }

  anterior() {
    this.navCtrl.push("PoliciaOrdenPublicoPage");
  }
}
