import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TallerBuenasPracticasPage } from './taller-buenas-practicas';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    TallerBuenasPracticasPage,
  ],
  imports: [
    RecaptchaModule.forRoot(),
    IonicPageModule.forChild(TallerBuenasPracticasPage),
  ],
})
export class TallerBuenasPracticasPageModule {}
