import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boat } from './boat';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  SERVER_ADDRESS = environment.server_address;
  BOAT_ENDPOINT = this.SERVER_ADDRESS+"/boats";

  constructor(private http: HttpClient) { }

  public getBoatList(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.BOAT_ENDPOINT);
  }

  public getBoat(boatId: number): Observable<Boat> {
    return this.http.get<Boat>(this.BOAT_ENDPOINT + '/' + boatId);
  }

  public addBoat(boat: Boat): Observable<Boat> {
    return this.http.post<Boat>(this.BOAT_ENDPOINT, boat);
  }

  public updateBoat(boat: Boat): Observable<Boat> {
    return this.http.put<Boat>(`${this.BOAT_ENDPOINT}/${boat.id}`, boat);
  }

  public removeBoatById(boatId: number): Observable<any> {
    return this.http.delete<any>(`${this.BOAT_ENDPOINT}/${boatId}`);
  }

  public removeBoat(boat: Boat): Observable<any> {
    return this.removeBoatById(boat.id);
  }

}
