import { AuthProvider } from './../../providers/auth/auth';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParticipantesTallerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-participantes-taller',
  templateUrl: 'participantes-taller.html',
})
export class ParticipantesTallerPage {
  participantes: any;
  admin = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiS:ApiProvider, private auth: AuthProvider) {
  }

  ionViewDidLoad() {
    this.admin = this.auth.isAdmin;
    this.participantes = this.apiS.getParticipantes();
  }

  eliminar(item){
    this.apiS.eliminarParticipante(item);
  }

}
