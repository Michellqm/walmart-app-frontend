import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../common/constants';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient,  private constants: Constants) { }

  private setHeaders(method: string){
    const httpOptions = new HttpHeaders();
    httpOptions.append('Access-Control-Allow-Headers', 'Content-Type');
    httpOptions.append('Access-Control-Allow-Methods', method);
    httpOptions.append('Access-Control-Allow-Origin', '*');
    httpOptions.append('Content-Type', 'application/json');
   return httpOptions;
  }

  getById(id : string): Observable<any> {
    const URL = `${environment.apiUrl}${this.constants.SEARCH_ID}`;
    let params = new HttpParams();
    params.append('id', id );
    let headers = this.setHeaders('GET');
    return this.http.get(URL, {headers, params : {'id': id}})
        .pipe(
            map(res => res),
            catchError((err: HttpErrorResponse) => {
                throw err.status;
            })
        );
  }

  getByText(item: string, discount: string): Observable<any> {
    const URL = `${environment.apiUrl}${this.constants.SEARCH_PRODUCTS}`;
    let headers = this.setHeaders('GET');
    return this.http.get(URL, {headers, params:{'item' : item, 'discount': discount}})
        .pipe(
            map(res => res),
            catchError((err: HttpErrorResponse) => {
                throw err.status;
            })
        );
  }
}
