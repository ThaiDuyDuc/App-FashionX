import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Voucher } from '../../../model/voucher.model';
import { VoucherService } from '../../services/Voucher.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-promotion-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promotion-select.component.html',
  styleUrls: ['./promotion-select.component.scss'],
})
export class PromotionSelectComponent implements OnInit {
  @Input() currentOrder: any;
  @Output() promotionSelected = new EventEmitter<Voucher | null>();

  voucherCode: string = '';
  availableVouchers: Voucher[] = [];
  selectedVoucher: Voucher | null = null;

  constructor(private promotionService: VoucherService) {}

  ngOnInit() {
    this.loadAvailableVouchers();
  }

  loadAvailableVouchers() {
    this.promotionService.getActiveVouchers().subscribe((promotions) => {
      this.availableVouchers = promotions.filter((promo) =>
        this.isPromotionValid(promo)
      );
    });
  }

  isPromotionValid(promotion: Voucher): boolean {
    const now = new Date();
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    return startDate <= now && endDate >= now;
  }

  checkPromotion() {
    if (!this.voucherCode) return;

    const promotion = this.availableVouchers.find(
      (p) => p.code === this.voucherCode.toUpperCase()
    );

    if (promotion && this.isPromotionValid(promotion)) {
      this.selectPromotion(promotion);
    } else {
      alert('Mã khuyến mãi không hợp lệ hoặc đã hết hạn');
    }
  }

  selectPromotion(promotion: Voucher) {
    this.selectedVoucher = promotion;
    this.promotionSelected.emit(promotion);
  }

  removePromotion() {
    this.selectedVoucher = null;
    this.voucherCode = '';
    this.promotionSelected.emit(null);
  }

  calculateDiscount(): number {
    if (!this.selectedVoucher || !this.currentOrder) return 0;

    const orderValue = this.currentOrder.totalMoney;
    let discount = 0;

    if (this.selectedVoucher.type === 'percentage') {
      discount = orderValue * (this.selectedVoucher.value / 100);
    } else {
      discount = this.selectedVoucher.value;
    }

    return discount;
  }
}
