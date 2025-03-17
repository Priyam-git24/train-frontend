import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtraindetailsComponent } from './addtraindetails.component';

describe('AddtraindetailsComponent', () => {
  let component: AddtraindetailsComponent;
  let fixture: ComponentFixture<AddtraindetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddtraindetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtraindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
