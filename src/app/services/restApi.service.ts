import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  

constructor(private httpClient : HttpClient) { }

getProducts() : Observable <any>{
  return this.httpClient.get("https://6332cfeda54a0e83d25909d3.mockapi.io/api/v1/products");
}

}
