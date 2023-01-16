import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServerConnectionService } from './server-connection.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  SERVER_ADDRESS = environment.server_address;

  constructor(private http: HttpClient,
              ) { }

  public isAuthenticated(): Observable<boolean> {

    return this.verifyToken(this.getToken());
  }

  public login(username?: string | null, password?: string | null): Observable<string> {
    const user = { 'username': username, 'password': password};
    return this.http.post<string>(this.SERVER_ADDRESS + '/login', user);
  }

  public register(username?: string | null, password?: string | null): Observable<HttpResponse<string>> {
    const user = { 'username': username, 'password': password};
    return this.http.post<HttpResponse<string>>(this.SERVER_ADDRESS+'/register', user);
  }

  public verifyToken(token: string | null) : Observable<boolean> {
    return this.http.get<boolean>(this.SERVER_ADDRESS + '/verify');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public registerToken(token: string): void {
    console.log("register token: "+token)
    localStorage.setItem('token', token);
  }

  public logout(): void {
    localStorage.removeItem('token');
  }
}
