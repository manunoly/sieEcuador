import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MuestraSeleccionadaPage } from './muestra-seleccionada';

@NgModule({
  declarations: [
    MuestraSeleccionadaPage,
  ],
  imports: [
    IonicPageModule.forChild(MuestraSeleccionadaPage),
  ],
})
export class MuestraSeleccionadaPageModule {}
