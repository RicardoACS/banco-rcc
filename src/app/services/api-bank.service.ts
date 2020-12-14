import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBankService {

  private headers = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createUser(data) {
    return this.httpClient.post("http://localhost:3000/v1/users", data, this.headers);
  }

  login(data) {
    return this.httpClient.post("http://localhost:3000/v1/users/login", data, this.headers);
  }

  getAccountByRut(rut) {
    return this.httpClient.get("http://localhost:3000/v1/accounts/" + rut, this.headers);
  }

  updateAmmount(id, data) {
    return this.httpClient.put("http://localhost:3000/v1/accounts/" + id, data, this.headers);
  }

  createTransaction(data) {
    return this.httpClient.post("http://localhost:3000/v1/transactions", data, this.headers);
  }

  getLastMovements(id) {
    return this.httpClient.get("http://localhost:3000/v1/transactions/" + id, this.headers);
  }
}
