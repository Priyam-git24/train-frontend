import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainaddComponent } from './trainadd.component';

describe('TrainaddComponent', () => {
  let component: TrainaddComponent;
  let fixture: ComponentFixture<TrainaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainaddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
