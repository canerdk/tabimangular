import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {formatDate} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class Service {
    BASE_URL = 'https://localhost:44317/api/';

    constructor(private http: HttpClient) {
    }

    getUser(user: any) {
        const headers = new HttpHeaders({
            Accept: 'application/json'
        });
        return this.http.get(this.BASE_URL + 'user?email=' + user.Email + '&pw=' + user.Password, {headers}).toPromise();
    }

    getRequest() {
        const headers = new HttpHeaders({
            Accept: 'application/json'
        });
        return this.http.get(this.BASE_URL + 'request', {headers}).toPromise();
    }

    getRequestById(id) {
        const headers = new HttpHeaders({
            Accept: 'application/json'
        });
        return this.http.get(this.BASE_URL + 'request/getbyid?requestId=' + id, {headers}).toPromise();
    }

    postUser(u) {
        const fd = new FormData();
        fd.append('Name', u.Name);
        fd.append('Surname', u.Surname);
        fd.append('Phone', u.Phone);
        fd.append('Email', u.Email);
        fd.append('Password', u.Password);
        fd.append('Role', u.Role);
        return this.http.post(this.BASE_URL + 'user', fd).toPromise();
    }

    postRequest(request, file, email) {
        const date = formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en');
        const fd = new FormData();
        fd.append('Name', request.Name);
        fd.append('Surname', request.Surname);
        fd.append('Description', request.Description);
        fd.append('Status', request.Status);
        fd.append('File', file);
        fd.append('Date', date);
        fd.append('Email', email);
        return this.http.post(this.BASE_URL + 'request', fd).toPromise();
    }

    updateRequest(request) {
        const fd = new FormData();
        fd.append('Id', request.Id);
        fd.append('Name', request.Name);
        fd.append('Surname', request.Surname);
        fd.append('Description', request.Description);
        fd.append('Status', request.Status);
        fd.append('Date', request.Date);
        fd.append('FileURL', request.FileURL);
        fd.append('ManagerDesc', request.ManagerDesc);
        fd.append('Email', request.Email);
        return this.http.put(this.BASE_URL + 'request', fd).toPromise();
    }

    deleteRequest(request) {
        return this.http.delete(this.BASE_URL + 'request?requestId=' + request.id).toPromise();
    }
}
