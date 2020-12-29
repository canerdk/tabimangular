import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Service} from '../services/service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required]]
    });
    login: any;
    user: any;
    loginuser: string;

    constructor(private fb: FormBuilder,
                private service: Service,
                private auth: AuthService,
                private router: Router,
                public toastr: ToastrService) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.login = Object.assign({}, this.loginForm.value);
            this.service.getUser(this.login).then((data) => {
                this.user = data;
                this.loginuser = this.user[0].name + ' ' + this.user[0].surname;
                if (this.user.length !== 0) {
                    this.auth.login();
                    localStorage.setItem('loginuser', this.loginuser);
                    localStorage.setItem('role', this.user[0].role);
                    localStorage.setItem('email', this.user[0].email);
                    this.toastr.success('Giriş başarılı.')
                    setTimeout(() => {
                        this.router.navigate(['/request']);
                    }, 2000);
                } else {
                    this.toastr.warning('Hatalı email veya şifre.')
                }
            });
        }
    }


}
