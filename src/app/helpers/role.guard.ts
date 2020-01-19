import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalsUser } from '../../assets/data/globals';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private global: GlobalsUser
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {

    const user = this._authService.currentUserValue;

    return user.role === next.data.role;

    // navigate to not found page
    this._router.navigate(['/404']);

    return false;
  }

  caview(state, permission) {
    return this.global.nav[state].permissions.filter(m => m.name === permission).length >= 1 ? true : false;
  }

}
