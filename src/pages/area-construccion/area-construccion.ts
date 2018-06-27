import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-area-construccion',
  templateUrl: 'area-construccion.html',
})
export class AreaConstruccionPage {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {}

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
    console.log(this.ancho);
  }

  recargar(){
      this.navCtrl.push('AreaConstruccionPage');
  }

  siguiente(){
    this.navCtrl.push('EtiquetadoEnergeticoPage');
  }

  anterior(){
    this.navCtrl.push('BenchmarkingPage');
  }

  printStaircase(size: number) {
    if (Number.isInteger(size)) {
      for (let index = 1; index <= size; index++) {
        let stairLength = "";
        let number = size;
        while (number > 0) {
          if(number <= index)
            stairLength = stairLength + "#";
          else
            stairLength = stairLength + " ";
          number --;
        }
        console.log(stairLength);
      }
    } else console.log("Enter a valid number");
  }

}
