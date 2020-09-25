import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Boat } from '../boat';
import { ServerConnectionService } from '../server-connection.service';

export interface DialogData {
  name: string;
  description: string;
  status: string;
}
@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.css']
})
export class BoatListComponent implements OnInit {

  boatList: Boat[] = [];
  isLoading: boolean;
  username = '';
  isUpdate = false;

  constructor(
    private connection: ServerConnectionService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
      this.isLoading = true;
      this.username = this.activatedRoute.snapshot.params.username;
      this.fetchList();
  }

  ngOnInit(): void {
  }

  fetchList(): void {
    this.connection.getBoatList().subscribe(list => {
      this.boatList = list;
      this.isLoading = false;
    });
  }

  removeBoat(id: number): void {
    this.connection.removeBoatById(id).subscribe(_ => {
      console.log('Delete Successfully');
      this.fetchList();
    });
  }

  addBoat(boat: Boat): void{
    this.connection.addBoat(boat).subscribe(_ => this.fetchList());
  }

  updateBoat(boat: Boat): void {
    this.connection.updateBoat(boat).subscribe(_ => this.fetchList());
  }

  openUpdateDialog(boat: Boat): void {
    const dialogRef = this.dialog.open(DialogAddBoatComponent, {
      data: {name: boat.name, description: boat.description, status: 'Update'},
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.name && result.description) {
        boat.description = result.description;
        boat.name = result.name;
        this.updateBoat(boat);
      }
    });
  }

  openAddDialog(): void {
    const boatName = '';
    const boatDescription = '';
    const dialogRef = this.dialog.open(DialogAddBoatComponent, {
      data: {name: boatName, description: boatDescription, status: 'Add'},
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

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/');
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
