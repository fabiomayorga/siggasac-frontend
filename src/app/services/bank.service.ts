import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) { }

  getAllBanks() {
    return this.http
      .get(`${environment.apiUrl}/${environment.apiBaseMain}/banks`)
      .pipe(map(data => data['banks']));
  }
}
