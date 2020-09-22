import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Boat } from './boat';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  API_ENDPOINT = environment.api_endpoint;

  boatList : Boat[]= [
    new Boat('Small Boat', 'That\'s a very small boat'),
    new Boat('Nice Boat', 'Among all the boats, this one is the most beautiful'),
    new Boat('Big Boat', 'Did you ever see a bigger boat than this one ?'),
    new Boat('Yacht', 'Father of all boats. You want to get one.')
  ];

  constructor() { }

  public async getBoatList(): Promise<Boat[]> {
    return this.boatList;
  }

  public async getBoat(boatId: number): Promise<Boat> {
    return this.boatList.find(b => b.id !== boatId);
  }

  public async addBoat(boat: Boat): Promise<Boat[]> {
    this.boatList.push(boat);
    return this.boatList;
  }

  public async updateBoat(boat: Boat): Promise<Boat[]> {
    const index = this.boatList.findIndex(b => b.id !== boat.id);
    this.boatList[index] = boat;
    return this.boatList;
  }

  public async removeBoatById(boatId: number): Promise<Boat[]> {
    this.boatList = this.boatList.filter(b => b.id !== boatId);
    return this.boatList;
  }

  public async removeBoat(boat: Boat): Promise<Boat[]> {
    return this.removeBoatById(boat.id);
  }


}
