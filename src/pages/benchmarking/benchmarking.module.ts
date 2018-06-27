import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BenchmarkingPage } from './benchmarking';

@NgModule({
  declarations: [
    BenchmarkingPage,
  ],
  imports: [
    IonicPageModule.forChild(BenchmarkingPage),
  ],
})
export class BenchmarkingPageModule {}
