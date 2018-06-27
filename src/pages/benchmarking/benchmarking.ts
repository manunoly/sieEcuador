import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BenchmarkingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-benchmarking',
  templateUrl: 'benchmarking.html',
})
export class BenchmarkingPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("BenchmarkingPage");
  }

  siguiente() {
    this.navCtrl.push("AreaConstruccionPage");
  }

  anterior() {
    this.navCtrl.push("MuestraSeleccionadaPage");
  }

}
