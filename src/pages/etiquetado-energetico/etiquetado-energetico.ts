// import { SimulacionEtiquetadoPage } from "./../simulacion-etiquetado/simulacion-etiquetado";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ModalController,
  Platform
} from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { MostrarImagenPage } from "./../mostrar-imagen/mostrar-imagen";

@IonicPage()
@Component({
  selector: "page-etiquetado-energetico",
  templateUrl: "etiquetado-energetico.html"
})
export class EtiquetadoEnergeticoPage {
  simulado = false;
  tarifa: any = null;
  sector: any = null;
  datosSimulado = {};
  energia = null;
  energia1 = null;
  energia2 = null;
  area = null;
  tipologias = [
    {
      id: 1,
      tipo: "Centros Educativos",
      rango_inicio: 0,
      rango_minimo: 14,
      rango_medio: 41,
      rango_maximo: 57
    },
    {
      id: 2,
      tipo: "Oficinas",
      rango_inicio: 0,
      rango_minimo: 73,
      rango_medio: 196,
      rango_maximo: 325
    },
    {
      id: 3,
      tipo: "Centros de Salud",
      rango_inicio: 0,
      rango_minimo: 94,
      rango_medio: 193,
      rango_maximo: 332
    },
    {
      id: 4,
      tipo: "Unidades Policiales",
      rango_inicio: 0,
      rango_minimo: 128,
      rango_medio: 190,
      rango_maximo: 266
    },

    {
      id: 5,
      tipo: "Telecomunicaciones",
      rango_inicio: 0,
      rango_minimo: 342,
      rango_medio: 819,
      rango_maximo: 923
    },

    {
      id: 6,
      tipo: "Hospitales",
      rango_inicio: 0,
      rango_minimo: 189,
      rango_medio: 459,
      rango_maximo: 749
    },

    {
      id: 7,
      tipo: "Centros de Ayuda Social",
      rango_inicio: 0,
      rango_minimo: 41,
      rango_medio: 137,
      rango_maximo: 185
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public plt: Platform
  ) {}

  ionViewDidLoad() {}

  simular() {
    if (!this.tarifa) {
      return this.showMessage("Favor seleccione la tarifa");
    }
    if (!this.sector) {
      return this.showMessage("Favor especifique su tipología");
    }
    if (!this.energia) {
      return this.showMessage("Favor complete los datos de Energía");
    }
    if (!this.area) {
      return this.showMessage("Favor complete area de construcción");
    }
    if (isNaN(this.energia) || isNaN(this.area))
      return this.showMessage("Favor valores númericos");
    let suma = this.energia;
    if (this.tarifa == "horaria") {
      if (!this.energia1 || !this.energia2) {
        return this.showMessage("Favor complete los datos de Energía");
      }
      if (isNaN(this.energia1) || isNaN(this.energia2))
        return this.showMessage("Favor valores númericos");
      suma = suma + this.energia1 + this.energia2;
    }

    this.tipologias.forEach(element => {
      if (element.tipo == this.sector) {
        console.log("entro al if");
        console.log(element.tipo);
        this.datosSimulado = element;
      }
    });
    suma = (suma * 12) / this.area;
    this.datosSimulado["resultado"] = parseInt(suma);
    if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_inicio"] &&
      this.datosSimulado["resultado"] < this.datosSimulado["rango_minimo"]
    ) {
      this.datosSimulado["mensajeP"] = "¡Felicitaciones!";
      this.datosSimulado["mensaje"] =
        "Su edificación es parte del grupo de BAJO consumo energético.";
    } else if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_minimo"] &&
      this.datosSimulado["resultado"] < this.datosSimulado["rango_medio"]
    ) {
      this.datosSimulado["mensajeP"] = "¡Bien!";
      this.datosSimulado["mensaje"] =
        "Su edificación presenta un consumo energetico esperado de acuerdo a su tipología.";
    } else if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_medio"] &&
      this.datosSimulado["resultado"] < this.datosSimulado["rango_maximo"]
    ) {
      this.datosSimulado["mensajeP"] = "¡Advertencia!";
      this.datosSimulado["mensaje"] =
        " Su edificación es parte del grupo de ALTO consumo energético.";
    } else if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_maximo"] ||
      this.datosSimulado["resultado"] < this.datosSimulado["rango_inicio"]
    ) {
      this.datosSimulado["mensajeP"] = "Fuera de Rango";
      this.datosSimulado["mensaje"] =
        "Verificar los datos ingresado, no se encuentra en ningún rango.";
    }

/*     let profileModal = this.modalCtrl.create(SimulacionEtiquetadoPage, {
      datos: this.datosSimulado
    });
    profileModal.onDidDismiss(_ => {});
    profileModal.present(); */
  }

  mostrarImagen(img = null) {
    if (this.plt.is("cordova")) {
      this.photoViewer.show(img, "Tarifa", { share: false });
    } else {
      let profileModal = this.modalCtrl.create(MostrarImagenPage, {
        url: img
      });
      profileModal.present();
    }
  }

  showMessage(
    msg = "",
    duration = 5000,
    closeButton = false,
    buttonText = "Cerrar",
    position = "bottom"
  ) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position,
      showCloseButton: closeButton,
      closeButtonText: buttonText,
      cssClass: "centrado"
    });
    toast.present();
  }
}
