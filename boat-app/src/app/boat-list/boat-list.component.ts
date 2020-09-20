import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {

  arr = [1,2,3]
  boat1 = {
    name: "boat 1"
  }
  boatList = [
   this.boat1 
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
