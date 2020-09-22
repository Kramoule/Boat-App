import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BoatListComponent } from './boat-list.component';

describe('BoatListComponent', () => {
  let component: BoatListComponent;
  let fixture: ComponentFixture<BoatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatListComponent ],
      imports: [
        MatDialogModule,
        MatExpansionModule,
        MatToolbarModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
