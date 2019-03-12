import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {
    this.router.navigate(["/training"]);
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(["/login"]);
  }

  getUser() {
    return { ...this.user }; //Da se ne bi direktno menjao privatni objekat koristi se spread operator koji pravi kopiju postojeceg user objekta --- slicno kao sa nizovima [...niz]
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }
  //Injectable i Router sam uveo da bi se stranica automatski prebacila na /training kada se desi login ili register odatle i ova funkcija authSuccessfully()
}
