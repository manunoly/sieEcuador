import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from "../providers/auth/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = "InicioPage";
  showbutton = true;

  paginaGeneral: Array<{ title: string; component: any; icon: any }>;
  paginaTipologia: Array<{ title: string; component: any; icon: any }>;

  usuario: any;
  displayName = "Visitante";
  photoURL = "assets/icon/favicon.ico";
  loginURL = {
    title: "Iniciar / Registrar",
    component: "LoginPage",
    icon: "person"
  };
  perfil = { title: "Perfil Usuario", component: "LoginPage", icon: "person" };
  taller = { title: "Participantes en el Taller", component: "ParticipantesTallerPage", icon: "book" };
  nosotros = { title: "Nosotros", component: "NosotrosPage", icon: "people" };
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private auth: AuthProvider
  ) {
    this.initializeApp();

    this.paginaGeneral = [
      {
        title: "Taller Buenas Prácticas",
        component: "TallerBuenasPracticasPage",
        icon: "school"
      },
      {
        title: "Muestra Seleccionada",
        component: "MuestraSeleccionadaPage",
        icon: "pie"
      },
      {
        title: "Benchmarking",
        component: "BenchmarkingPage",
        icon: "barcode"
      },
      {
        title: "Area de Construcción",
        component: "AreaConstruccionPage",
        icon: "construct"
      },
      {
        title: "Etiquetado  Energético",
        component: "EtiquetadoEnergeticoPage",
        icon: "flash"
      }
    ];

    this.paginaTipologia = [
      {
        title: "Centros de Salud",
        component: "CentrosSaludPage",
        icon: "heart"
      },
      {
        title: "Centros Educativos",
        component: "CentrosEducativosPage",
        icon: "school"
      },
      {
        title: "Unidades Policiales",
        component: "PoliciaOrdenPublicoPage",
        icon: "body"
      },
      {
        title: "Oficinas",
        component: "OficinasPage",
        icon: "archive"
      }
    ];
  }

  navegar(
    navegarData = { title: "Inicio", component: "InicioPage", icon: "home" }
  ) {
    this.openPage(navegarData);
  }

  logout() {
    this.auth.signOut();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.iniciarConfiguracion();
    });
  }

  iniciarConfiguracion() {
    this.usuario = this.auth.currentFirebaseAuthObservable;
    this.auth.currentUserObservable.subscribe(userFirestoneData => {
      if (userFirestoneData) {
        this.displayName = userFirestoneData.displayName;
        this.photoURL = userFirestoneData.photoURL;
      } else {
        this.displayName = "Visitante";
        this.photoURL = "assets/icon/favicon.ico";
      }
    });
    this.showbuttonD();
  }

  showbuttonD() {
    if (this.platform.width() >= 768) {
      this.showbutton = false;
    }
  }

  loginRegister(page) {
    try {
      this.auth
        .googleLogin()
        .then(resp => {
          /**
           * TODO: mostrar mensaje bienvenida
           */
        })
        .catch(error => {
          console.log("error");
          console.log(error);
          this.openPage(page);
        });
    } catch (error) {
      console.log("capturo en el app.component");
      this.openPage(page);
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isActive(page) {
    // if (this.nav.getActive()) console.log(this.nav.getActive());

    if (this.nav.getActive() && this.nav.getActive().name === page.component) {
      return "primary";
    }
    return;
  }
}
