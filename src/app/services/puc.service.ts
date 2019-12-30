import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PUCService {

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http
            .get(`${environment.apiUrl}/${environment.apiBaseMain}/single-account-plan`)
            .pipe(map(data => data['singleAccountPlan']));
    }

    create(data) {
        return this.http
            .post(`${environment.apiUrl}/${environment.apiBaseMain}/single-account-plan`, data)
            .pipe(map(response => response));
    }

    edit(data: object, id: number) {
        return this.http
            .put(
                `${environment.apiUrl}/${environment.apiBaseMain}/single-account-plan/${id}`, data)
            .pipe(map(response => response));
    }

}
