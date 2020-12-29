import {Component, OnInit} from '@angular/core';
import {formatDate} from '@angular/common';
import {FormBuilder, Validators} from '@angular/forms';
import {Service} from '../services/service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import * as FileSaver from 'file-saver';


@Component({
    selector: 'app-rdetail',
    templateUrl: './rdetail.component.html',
    styleUrls: ['./rdetail.component.css']
})
export class RdetailComponent implements OnInit {
    selectedFile: File;
    requestForm = this.fb.group({
        Id: [''],
        Name: ['', [Validators.required]],
        Surname: ['', [Validators.required]],
        Status: ['1'],
        FileURL: [''],
        Description: [''],
        ManagerDesc: ['']
    });
    request: any;
    role: any;
    sourcePath: any;
    fileName: string;
    email: any;
    button: boolean;
    id: any;


    constructor(private fb: FormBuilder,
                private service: Service,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.role = localStorage.getItem('role');
        this.email = localStorage.getItem('email');
        this.route.paramMap.subscribe((data) => {
            this.id = data.get('id');
            this.button = true;
            if (this.id) {
                this.service.getRequestById(this.id).then((response) => {
                    this.request = response;
                    this.fileName = this.request.fileURL;
                    this.requestForm = this.fb.group({
                        Id: [this.request.id],
                        Name: [this.request.name, [Validators.required]],
                        Surname: [this.request.surname, [Validators.required]],
                        Status: [this.request.status],
                        Date: [this.request.date],
                        FileURL: [this.request.fileURL],
                        Description: [this.request.description],
                        ManagerDesc: [this.request.managerDesc, [Validators.required]],
                        Email: [this.request.email]
                    });
                });
            } else {
                this.button = false;
            }
        });
    }

    file(event) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        if (this.requestForm.valid) {
            this.request = Object.assign({}, this.requestForm.value);
            this.service.postRequest(this.request, this.selectedFile, this.email).then((data) => {
                this.toastr.success('Başarıyla gönderildi.');
                setTimeout(() => {
                    this.router.navigate(['/request']);
                });
            });
        }
    }

    downloadPdf(url) {
        console.log(url);
        const pdfUrl = './assets/pdf/' + url;
        const pdfName = url;
        FileSaver.saveAs(pdfUrl, pdfName);
    }

    Update() {
        this.request = Object.assign({}, this.requestForm.value);
        let msg;
        if (this.role === 'admin') {
            msg = 'Talep onaylama işleminiz başarıyla gönderildi.'
        } else {
            msg = 'Başarıyla güncellendi.';
        }
        this.service.updateRequest(this.request).then((data) => {
            this.toastr.success(msg);
            setTimeout(() => {
                this.router.navigate(['/request']);
            }, 2000);
        });
    }


}
