import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Service} from '../services/service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm = this.fb.group({
        Name: ['', [Validators.required]],
        Surname: ['', [Validators.required]],
        Phone: ['', [Validators.required]],
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required]],
        Role: ['user']
    });
    register: any;
    user: any;


    constructor(private fb: FormBuilder,
                private service: Service,
                public toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.register = Object.assign({}, this.registerForm.value);
            this.service.postUser(this.register).then((data) => {
                this.user = data;
                this.toastr.success('Başarıyla kayıt olundu. Lütfen giriş yapınız.');
                setTimeout(() => {
                    this.router.navigate(['/login'])
                }, 2000);
            });
        }
    }

}
