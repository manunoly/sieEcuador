import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  ancho: boolean = false;

  constructor(public http: HttpClient, private plt: Platform, private afs: AngularFirestore) {
  }

  get tamanno() {
    return this.ancho;
  }

  establecerTamanno() {
    if (this.plt.isLandscape()) this.ancho = true;
    else this.ancho = false;
  }

  inscribirTaller(usuario){
    let inscripcion = this.afs.collection<any>('inscripcion');
    return inscripcion.add(usuario);
  }
  getParticipantes(){
    return this.afs.collection('inscripcion').valueChanges();
  }

  eliminarParticipante(p){
    console.log(p);
    // return this.afs.collection('inscripcion').doc(p.key).delete();
  }
}
