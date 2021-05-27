import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  
  
  mostRequestedHotels():Observable<any>{
    return this._http.get(this.url + "/mostRequestedHotels", {headers: this.headersVariable});
  }

  showHotels(token:any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + "/showHotels", {headers: headersToken});
  }
  
  addHotel(hotel: Hotel, token:any):Observable<any>{
    let params = JSON.stringify(hotel);
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.post(this.url + '/addHotel', params, {headers: headersToken});
  }

  getHotelById(id: String, token: any):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/serchHotelById/' + id, {headers: headersToken});
  }

  updateHotel(hotel: Hotel, token: any):Observable<any>{
    let params = JSON.stringify(hotel);
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/updateHotel/' + hotel._id, params ,{headers: headersToken});
  }

  deleteHotel(id: String, token: any){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/deleteHotel/' + id, {headers: headersToken});
  }
}

