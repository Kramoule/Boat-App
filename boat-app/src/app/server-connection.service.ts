import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boat } from './boat';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  SERVER_ADDRESS = environment.server_address;
  API_ENDPOINT = this.SERVER_ADDRESS+"/boats";

  boatList : Boat[]= [
    new Boat('Small Boat', 'That\'s a very small boat'),
    new Boat('Nice Boat', 'Among all the boats, this one is the most beautiful'),
    new Boat('Big Boat', 'Did you ever see a bigger boat than this one ?'),
    new Boat('Yacht', 'Father of all boats. You want to get one.')
  ];

  constructor(private http: HttpClient) { }

  public getBoatList(): Observable<Boat[]> {
    return this.http.get<Boat[]>(this.API_ENDPOINT);
  }

  public async getBoat(boatId: number): Promise<Boat> {
    return this.boatList.find(b => b.id !== boatId);
  }

  public addBoat(boat: Boat): Observable<Boat> {
    return this.http.post<Boat>(this.API_ENDPOINT, boat);
  }

  public async updateBoat(boat: Boat): Promise<Boat[]> {
    const index = this.boatList.findIndex(b => b.id !== boat.id);
    this.boatList[index] = boat;
    return this.boatList;
  }

  public removeBoatById(boatId: number): Observable<any> {
    return this.http.delete<any>(`${this.API_ENDPOINT}/${boatId}`);
  }

  public removeBoat(boat: Boat): Observable<any> {
    return this.removeBoatById(boat.id);
  }


}
