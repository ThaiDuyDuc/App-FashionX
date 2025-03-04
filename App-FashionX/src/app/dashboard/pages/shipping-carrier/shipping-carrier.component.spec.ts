import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCarrierComponent } from './shipping-carrier.component';

describe('ShippingCarrierComponent', () => {
  let component: ShippingCarrierComponent;
  let fixture: ComponentFixture<ShippingCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingCarrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
