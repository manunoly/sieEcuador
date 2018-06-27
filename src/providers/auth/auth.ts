import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";

import { Observable } from "rxjs/Observable";
import { switchMap, first } from "rxjs/operators";
import { Subject } from "rxjs/Subject";

import { GooglePlus } from "@ionic-native/google-plus";
import { Platform, ToastController } from "ionic-angular";

import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class AuthProvider {
  authState: any = null;
  isCordova: boolean;
  user = new Subject<any>();
  admin = false;

  constructor(
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    private afs: AngularFirestore,
    public toastCtrl: ToastController
  ) {
    if (this.platform.is("cordova")) {
      this.isCordova = true;
    } else {
      this.isCordova = false;
    }

    this.afAuth.authState.subscribe(
      auth => {
        if (auth) {
          this.docExists("usuario/" + auth.uid)
            .then(userD => {
              this.authState = {};
              if (userD) {
                if (userD['rol'][0]=="admin") this.admin = true
                this.authState["uid"] = auth.uid;
                this.authState["displayName"] = userD["displayName"];
                this.authState["phoneNumber"] = userD["phoneNumber"];
                this.authState["photoURL"] = userD["photoURL"];
                this.authState["email"] = userD["email"];
                this.authState["rol"] = userD.hasOwnProperty("rol")
                  ? userD["rol"]
                  : ["cliente"];
                this.user.next(this.authState);
              } else {
                this.authState["displayName"] = auth["displayName"];
                this.authState["phoneNumber"] = auth["phoneNumber"];
                this.authState["photoURL"] = auth["photoURL"];
                this.authState["email"] = auth["email"];
                this.authState["rol"] = ["cliente"];
                this.user.next(this.authState);
                this.afs.doc<any>("usuario/" + auth.uid).set(this.authState);
              }
            })
            .catch(error => this.handleError(error));
        } else {
          this.authState = null;
          this.admin = false;
          this.user.next(this.authState);
        }
      },
      error => {
        this.handleError(error);
      }
    );
  }

  verificarPerfil() {
    if (this.authenticated) {
      let userD = this.afs
        .doc<any>("usuarios/" + this.currentUserId)
        .valueChanges()
        .subscribe(datos => {
          if (typeof datos == undefined || datos == null) {
            // Actualizar datos en la BD para tener datos basicos
            this.afs
              .doc<any>("usuario/" + this.currentUserId)
              .set({
                actulizado: false,
                phoneNumber: this.authState.phoneNumber,
                photoURL: this.authState.photoURL,
                displayName: this.authState.displayName,
                email: this.authState.email,
                emailVerified: this.authState.emailVerified
              })
              .then(_ => {
                userD.unsubscribe();
              });
            userD.unsubscribe();
          } else if (
            datos.hasOwnProperty("actualizado") &&
            datos["actualizado"]
          ) {
            /**
             * utilizar los datos nuevos para mostrar
             */
            console.log(
              "deberia utilizar estos datos para mostrar en el perfil" + datos
            );
            userD.unsubscribe();
          } else userD.unsubscribe();
        });
    }
  }

  docExists(path: string) {
    return this.afs
      .doc(path)
      .valueChanges()
      .pipe(first())
      .toPromise();
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): Observable<any> {
    return this.user.asObservable();
  }

  // Returns
  get currentFirebaseAuthObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return "Visitante";
    } else if (this.currentUserAnonymous) {
      return "Anonimo";
    } else {
      return this.authState["displayName"] || "Usuario";
    }
  }

  //// Social Auth ////
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.socialSignIn(provider);
  }

  googleLogin() {
    if (this.isCordova) {
      this.gplus
        .login({
          webClientId: "375033599626-4qdvnmf04rn5sjl034dcs8htov695val.apps.googleusercontent.com",
          offline: true,
          scopes: "profile email"
        })
        .then(resp => {
          return this.socialSignIn(resp.idToken);
        })
        .catch
        /**
         * manejar errores
         */
        ();
    } else {
      const provider = new firebase.auth.GoogleAuthProvider();
      return this.socialSignIn(provider);
    }
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.socialSignIn(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.socialSignIn(provider);
  }


  get isAdmin(): boolean{
    return this.admin;
  }

  private socialSignIn(provider) {
    try {
      return this.afAuth.auth
        .signInWithPopup(provider)
        .then(credential => {
          this.authState = credential.user;
          this.updateUserData();
        })
        .catch(error => {
          console.log("error se captura en el auth");
          return Promise.reject(new Error(error));
        });
    } catch (error) {
      console.log("error se captura en el auth en catch del try");
      return Promise.reject(new Error(error));
    }
  }

  //// Anonymous Auth ////
  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(user => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    var auth = firebase.auth();

    return auth
      .sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch(error => console.log(error));
  }

  //// Sign Out ////
  signOut(): void {
    this.afAuth.auth.signOut();
    //this.router.navigate(['/'])
  }

  //// Helpers ////
  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
    let path = `users/${this.currentUserId}`; // Endpoint on firebase
    let data = {
      email: this.authState.email,
      name: this.authState.displayName
    };

    //this.db.object(path).update(data).catch(error => console.log(error));
  }

  private handleError(error: Error) {
    console.error(error);
    this.showMessage(error.message);
  }

  showMessage(
    msg = "",
    duration = 3000,
    closeButton = false,
    buttonText = "Cerrar",
    position = "bottom"
  ) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position,
      showCloseButton: closeButton,
      closeButtonText: buttonText
    });
    toast.present();
  }
}
