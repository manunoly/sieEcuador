import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";


@Component({
  selector: "page-mostrar-imagen",
  templateUrl: "mostrar-imagen.html"
})
export class MostrarImagenPage {
  url: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.url = this.navParams.get("url");
  }
  cerrar() {
    this.navCtrl.pop();
  }
}
