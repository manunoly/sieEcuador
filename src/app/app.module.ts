import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthProvider } from '../providers/auth/auth';

import { GooglePlus } from "@ionic-native/google-plus";
import { ApiProvider } from '../providers/api/api';

import { PhotoViewer } from '@ionic-native/photo-viewer';
// import { SimulacionEtiquetadoPage } from "../pages/simulacion-etiquetado/simulacion-etiquetado";
import { MostrarImagenPage } from './../pages/mostrar-imagen/mostrar-imagen';

import { RecaptchaModule } from 'ng-recaptcha';

export const firebaseConfig = {
  apiKey: "AIzaSyDI--2lqro03jxLvYw67L-cl081psW8nTI",
  authDomain: "sie3-ecuador.firebaseapp.com",
  databaseURL: "https://sie3-ecuador.firebaseio.com",
  projectId: "sie3-ecuador",
  storageBucket: "sie3-ecuador.appspot.com",
  messagingSenderId: "375033599626"
};

@NgModule({
  declarations: [MyApp,MostrarImagenPage],
  // declarations: [MyApp,SimulacionEtiquetadoPage,MostrarImagenPage],
  imports: [
    BrowserModule,
    RecaptchaModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    // HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, MostrarImagenPage],
  // entryComponents: [MyApp,SimulacionEtiquetadoPage, MostrarImagenPage],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    ApiProvider,
    PhotoViewer
  ]
})

export class AppModule {}
