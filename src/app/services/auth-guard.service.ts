import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router,
                private toast: ToastrService
    ) {
    }

    canActivate() {
        return this.authService.isAuthenticated().then((authenticated: Boolean) => {
            if (authenticated) {
                return true;
            } else {
                this.showToast();

                this.router.navigate(['/login']);
                return false;
            }
        });
    }

    async showToast() {
        this.toast.warning('Lütfen giriş yapınız.');
    }
}
