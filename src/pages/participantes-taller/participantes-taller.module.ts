import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantesTallerPage } from './participantes-taller';

@NgModule({
  declarations: [
    ParticipantesTallerPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantesTallerPage),
  ],
})
export class ParticipantesTallerPageModule {}
