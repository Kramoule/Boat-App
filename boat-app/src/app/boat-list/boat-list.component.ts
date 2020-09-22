import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boat } from '../boat';
import { ServerConnectionService } from '../server-connection.service';

export interface DialogData {
  name: string;
  description: string;
}
@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {

  boatList: Boat[] = [];

  constructor(
    public connection: ServerConnectionService,
    public dialog: MatDialog) {
    this.fetchList();
  }

  ngOnInit(): void {}

  fetchList(): void {
    this.connection.getBoatList().then(list => this.boatList = list);
  }

  removeBoat(id: number): void {
    this.connection.removeBoatById(id).then((list) => this.boatList = list);
  }

  addBoat(boat: Boat): void{
    this.connection.addBoat(boat).then(list => this.boatList = list);
  }

  openAddDialog(): void {
    const boatName = '';
    const boatDescription = '';
    const dialogRef = this.dialog.open(DialogAddBoatComponent, {
      data: {name: boatName, description: boatDescription},
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.name && result.description) {
        this.addBoat(new Boat(result.name, result.description));
      }
    });
  }

  openRemoveDialog(id): void {
    const dialogRef = this.dialog.open(DialogRemoveBoatComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.removeBoat(id);
      }
    });
  }

}

@Component({
  selector: 'dialog-add-boat',
  templateUrl: './dialog-add-boat.html',
})
export class DialogAddBoatComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddBoatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'dialog-remove-boat',
  template: `<p>Are you sure you want to delete this boat ?</p>
                <div mat-dialog-actions>
                  <button mat-button (click)="onNoClick()">Cancel</button>
                  <button mat-button [mat-dialog-close]="true" color="warn" cdkFocusInitial>Yes</button>
              </div>`,
})
export class DialogRemoveBoatComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogAddBoatComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
