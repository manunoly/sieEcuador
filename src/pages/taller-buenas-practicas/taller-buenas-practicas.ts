import { Component, NgZone } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { ApiProvider } from "./../../providers/api/api";

@IonicPage()
@Component({
  selector: "page-taller-buenas-practicas",
  templateUrl: "taller-buenas-practicas.html"
})
export class TallerBuenasPracticasPage {
  inscripcion: FormGroup;
  private captchaPassed: boolean = false;
  private captchaResponse: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private zone: NgZone,
    private api: ApiProvider,
    public toast: ToastController
  ) {
    this.inscripcion = this.formBuilder.group({
      nombre: [""],
      correo: ["", (Validators.required, Validators.email)],
      telefono: ["", Validators.required],
      institucion: [""],
      comentario: [""]

    });
  }
  ionViewDidLoad() {}

  submitForm() {
    /*     let data = {
      captchaResponse: this.captchaResponse
    }; */
    this.api
      .inscribirTaller(this.inscripcion.value)
      .then(result => {
        let toast = this.toast.create({
          message: "Se ha inscrito exitosamente en el taller",
          duration: 5000,
          cssClass: "centrado"
        });
        toast.present();
        this.inscripcion.reset();
      })
      .catch(error => {});
  }

  captchaResolved(response: string): void {
    this.zone.run(() => {
      this.captchaPassed = true;
      this.captchaResponse = response;
    });
  }
}
