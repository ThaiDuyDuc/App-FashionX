import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShippingCarrierComponent } from './add-shipping-carrier.component';

describe('AddShippingCarrierComponent', () => {
  let component: AddShippingCarrierComponent;
  let fixture: ComponentFixture<AddShippingCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShippingCarrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShippingCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
