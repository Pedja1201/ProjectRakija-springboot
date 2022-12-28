import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, CustomerPage } from '../../model/customer';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = "/api/customers"

  constructor(private client : HttpClient, private loginService : LoginService) { } //Login

  
  getAll(){
    return this.client.get<CustomerPage<Customer>>(this.baseUrl)
  }

  getOne(id : number): Observable<Customer[]>{
    return this.client.get<Customer[]>(`${this.baseUrl}/${id}`)
  }

  create(customer : Customer):Observable<string>{
    return this.client.post<string>(this.baseUrl, customer)
  }

  update(id:number, customer : Customer){
    return this.client.put<Customer[]>(`${this.baseUrl}/${id}`, customer)
  }

  delete(customer:Customer){
    return this.client.delete<string>(this.baseUrl + "?id=" + customer.id)
  }
  pretrazi(parameters: any = undefined) {
    if (parameters == undefined) {
      return this.client.get<Customer[]>(this.baseUrl);
    }
    return this.client.get<CustomerPage<Customer>>(this.baseUrl).pipe(
      map(customers => {
        return customers.content.filter(customer => {
          let rezultat = true;
          if (customer["firstName"] && parameters["firstName"]) {
            rezultat &&= customer["firstName"] == parameters["firstName"];
          }
          if (customer["email"] && parameters["email"]) {
            rezultat &&= customer["email"] == parameters["email"];
          }
          return rezultat;
        });
      })
    );
  }

  exportPdf(){
    return this.client.get(`${this.baseUrl}/export`, {responseType:'blob'})
  }
}