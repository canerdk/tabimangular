import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/request', title: 'Talepler', icon: 'content_paste', class: ''}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    @ViewChild(MatAccordion) accordion: MatAccordion;
    user: any;

    constructor(private auth: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.user = localStorage.getItem('loginuser');
    }

    exit() {
        localStorage.removeItem('loginuser');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
