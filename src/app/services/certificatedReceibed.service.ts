import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CertificatedReceibedService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/certificates-received`)
            .pipe(map(data => data['certificatesReceived']));
    }

    getByThird(id) {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/certificates-received/${id}`)
            .pipe(map(data => data['certificatesReceived']));
    }

    create(data) {
        return this.http
            .post(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/certificates-received`, data)
            .pipe(map(response => response));
    }

    edit(data, id) {
        return this.http
            .put(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/certificates-received/${id}`, data)
            .pipe(map(response => response));
    }

    nullable(id){
        return this.http
            .patch(`${environment.apiUrl}/${environment.apiBaseMain.documents}/${environment.versions.v1}/availability-certificates/${id}`, {id})
            .pipe(map(response => response));
    }

}
