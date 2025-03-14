import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPassengerComponent } from './bookingpassenger.component';

describe('BookingpassengerComponent', () => {
  let component: BookingPassengerComponent;
  let fixture: ComponentFixture<BookingPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPassengerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
