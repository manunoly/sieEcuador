import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OficinasPage } from './oficinas';

@NgModule({
  declarations: [
    OficinasPage,
  ],
  imports: [
    IonicPageModule.forChild(OficinasPage),
  ],
})
export class OficinasPageModule {}
