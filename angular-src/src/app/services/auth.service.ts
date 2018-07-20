import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {

  
  authToken: any;
  user: any;

  //base url
  url : any = "http://localhost:3000/users/";

  constructor(private _http:Http) { }

  registerUser(user){
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(this.url+'register', user, {headers: headers})
      .map(res => res.json());
  }

  //authenticating user for login
  authenticate(user){
    
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(this.url+'authenticate', user, {headers: headers})
      .map(res => res.json());
  }

  //get user's profile
  getProfile(){
    
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this._http.get(this.url+'profile', {headers: headers})
      .map(res => res.json());
  }

  //storing user data to localstorage
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  //helps to fetch user's token from storage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  //authenticating token
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
