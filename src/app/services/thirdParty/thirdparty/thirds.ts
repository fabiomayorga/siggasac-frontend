import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class ThirdsService {

    constructor(private http: HttpClient) {
    }
    handleError(error: HttpErrorResponse) {
        console.log("lalalalalalalala");
        return throwError(error);
    }

    getAll(): Observable<any> {

        try {
            return this.http
                .get(`${environment.apiUrl}/${environment.apiBaseMain}/third-parties`)
                .pipe(map(data => {
                    console.log(data)
                    return data["thirdParties"];
                }), catchError(this.handleError));
        } catch (error) {
            console.log("puta madre")
        }
    }

    create(createObject: any): Observable<any> {

        try {
            return this.http
                .post(
                    `${environment.apiUrl}/${environment.apiBaseMain}/third-parties`,
                    createObject,
                ).pipe(
                    map(data => {
                        console.log(data);
                        return data;
                    })
                );
        } catch (error) {
            console.log("dasdasd")
        }

    }
}
