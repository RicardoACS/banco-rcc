import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBankService {

  baseUrl = "http://localhost:5000";

  private headers = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createUser(data) {
    return this.httpClient.post(this.baseUrl + "/v1/users", data, this.headers);
  }

  login(data) {
    return this.httpClient.post(this.baseUrl + "/v1/users/login", data, this.headers);
  }

  getAccountById(id) {
    return this.httpClient.get(this.baseUrl + "/v1/accounts/" + id, this.headers);
  }

  createTransaction(data) {
    return this.httpClient.post(this.baseUrl + "/v1/transactions", data, this.headers);
  }

  createTransferThirdParties(data) {
    return this.httpClient.post(this.baseUrl + "/v1/transactions/third-parties", data, this.headers);
  }

  getLastMovements(id) {
    return this.httpClient.get(this.baseUrl + "/v1/transactions/" + id, this.headers);
  }

  getBanks() {
    return this.httpClient.get(this.baseUrl + "/v1/banks/", this.headers);
  }

  getDestinations(id) { 
    return this.httpClient.get(this.baseUrl + "/v1/destinations/" + id, this.headers);
  }

  createDestination(data) { 
    return this.httpClient.post(this.baseUrl + "/v1/destinations", data, this.headers);
  }

}

