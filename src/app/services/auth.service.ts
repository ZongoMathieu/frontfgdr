import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8787/api/auth/';
const AUTH_API2 = 'http://localhost:8787/api/chd/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  motDepasse;

  constructor(private http: HttpClient) { }

   login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    
  }

  fondGarantie(credentials): Observable<any> {
    return this.http.post(AUTH_API2 + 'dataByFiliale', {
      
      filiale: "CBIBF",
      periode: credentials.periode,
      annee: credentials.annee
    }, httpOptions);
    
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      country: user.country,
      password: user.password
    }, httpOptions);
    
  }

  updatepassword(username,password): Observable<any> {
    return this.http.put(AUTH_API2 + 'updateutilisateur', {
      username,
      password
    }, httpOptions);
    
  }

  allUtilisateurs(): Observable<any> {
    return this.http.get(AUTH_API + 'allUsers', {
     
    },);
    
  }

}
