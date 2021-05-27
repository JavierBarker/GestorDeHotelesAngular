import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';  
import { User } from 'src/app/models/user.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public token: any;
  public getToken: any;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  showAdminHotelUsers():Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getTokenLocal());
    return this._http.get(this.url + "/showAdminHotelUsers", {headers: headersToken});
  }

  registerUser(user: User):Observable<any>{
    let params = JSON.stringify(user);
    return this._http.post(this.url + "/registerUser", params, {headers: this.headersVariable});
  }

  registerAdminHotel(user: User):Observable<any>{
    let params = JSON.stringify(user);
    let headersToken = this.headersVariable.set('Authorization', this.getTokenLocal());
    return this._http.post(this.url + "/registerHotelAdmin", params, {headers: headersToken});
  }

  serchUserById():Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getTokenLocal());
    return this._http.get(this.url + "/serchUserById", {headers: headersToken});
  }

  updateUser(user: User):Observable<any>{
    let params = JSON.stringify(user);
    let headersToken = this.headersVariable.set('Authorization', this.getTokenLocal());
    return this._http.put(this.url + "/updateUser", params, {headers: headersToken});
  }

  deleteUser():Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', this.getTokenLocal());
    return this._http.delete(this.url + "/deleteUser", {headers: headersToken});
  }

  login(user: any, getToken = null):Observable<any>{
    if(getToken != null){
      user.getToken = getToken;
    }
    let params = JSON.stringify(user);
    return this._http.post(this.url + "/login", params, {headers: this.headersVariable});
  }





  getIdentity(){
    var identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != 'undefined') {
      this.getToken = identity;
    }else{ 
      this.getToken = null;
    }
    return this.getToken
  }
  
  getTokenLocal(){
    var tokenlocal = localStorage.getItem('token');
    if(tokenlocal != 'undefined'){
      this.token = tokenlocal;
    }else{
      this.token = null;
    }
    return this.token;
  }

}
