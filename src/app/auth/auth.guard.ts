import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
    }
  }
  // Sta radi klasa ova sa svim ovim importima : Ako user hoce da upadne na tipa /training a nije ulogovan ovo ce da ga prebaci na /login jer nema autorizaciju da pristupi /training
}
