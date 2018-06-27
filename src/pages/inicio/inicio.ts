import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "./../../providers/api/api";

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-inicio",
  templateUrl: "inicio.html"
})
export class InicioPage {
  user: any;
  ancho = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: ApiProvider
  ) {}

  ionViewDidLoad() {
    this.ancho = this.api.ancho;
  }

  goToTaller(){
    this.navCtrl.push("TallerBuenasPracticasPage");
  }

  goToHerramienta(){
    this.navCtrl.push("EtiquetadoEnergeticoPage");
  }

}
