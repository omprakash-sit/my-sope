import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { SERVER_API_URL } from '../app.constants';
import { CustomerRecords } from '../shared/models/customer-records.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerRecordsService {
  private baseURL = SERVER_API_URL;
  constructor(private http: HttpClient) { }

  createCustomerRecords(req: CustomerRecords): Observable<HttpResponse<any>> {
    return this.http.post(this.baseURL + 'customer/create-customer-records', req, { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => this.convertResponse(response)));
  }
  getCustomerRecords(): Observable<HttpResponse<any[]>> {
    return this.http.get(this.baseURL + 'customer/customer-records-list', { observe: 'response' })
      .pipe(map((response: HttpResponse<any>) => this.convertArrayResponse(response)));
  }



  private convertResponse(res: any): any {
    const body: any = this.convert(res.body);
    return res.clone({ body });
  }

  private convertArrayResponse(res: HttpResponse<any[]>): HttpResponse<any[]> {
    const jsonResponse: any[] = res.body ?? [];
    const body: any[] = [];
    for (let i = 0; i < jsonResponse.length; i++) {
      body.push(this.convert(jsonResponse[i]));
    }
    return res.clone({ body });
  }

  /**
   * Convert a returned JSON object.
   */
  private convert(res: any): any {
    const copy: any = Object.assign({}, res);
    return copy;
  }
}
