import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Service} from '../services/service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {DialogComponent} from '../dialogs/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';


@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    request: any;
    role: any;


    constructor(private router: Router,
                private service: Service,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.role = localStorage.getItem('role');
        this.service.getRequest().then((data) => {
            this.request = data;
        })
    }

    edit(request) {
        this.router.navigate(['rdetail', request.id]);
    }

    delete(request) {
        const dialogRef = this.dialog.open(DialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.service.deleteRequest(request).then(() => {
                    this.ngOnInit();
                });
            }
        });
    }

    download() {
        const element = document.getElementById('table');
        html2canvas(element).then((canvas) => {
            const imgWidth = 208;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const contentDataURL = canvas.toDataURL('image/png')
            const pdf = new jspdf('p', 'mm', 'a4');
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
            pdf.save('report.pdf');
        })
    }


}
