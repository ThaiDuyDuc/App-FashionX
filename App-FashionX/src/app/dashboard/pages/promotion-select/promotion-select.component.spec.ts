import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionSelectComponent } from './promotion-select.component';

describe('PromotionSelectComponent', () => {
  let component: PromotionSelectComponent;
  let fixture: ComponentFixture<PromotionSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
