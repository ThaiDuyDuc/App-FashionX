import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddPromotionComponent } from './../components/add-promotion/add-promotion.component';
import { RouterModule } from '@angular/router';

interface Promotion {
  id: number;
  code: string;
  start_date: string;
  end_date: string;
  url_image: string;
  value: number;
  created_at: string;
  created_by: string;
  status: string;
}

interface ProductDetail {
  id: number;
  name: string;
  code: string;
  price: number;
  selected?: boolean;
}

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddPromotionComponent, RouterModule],
})
export class PromotionComponent implements OnInit {
  promotions: Promotion[] = [
    {
      id: 1,
      code: 'SUMMER2024',
      start_date: '2024-06-01',
      end_date: '2024-06-30',
      url_image:
        'https://innguyengia.com.vn/images/uploaded/in-voucher/mau-in-voucher.png',
      value: 20,
      created_at: '2024-02-08',
      created_by: 'Admin',
      status: 'Đang diễn ra',
    },
  ];

  products: ProductDetail[] = [];
  showModal = false;
  showProductModal = false;
  selectedPromotion: Promotion | null = null;
  searchTerm = '';

  constructor() {}

  ngOnInit(): void {}

  getPromotionStatus(startDate: string, endDate: string): string {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return 'Sắp diễn ra';
    if (now > end) return 'Đã kết thúc';
    return 'Đang diễn ra';
  }

  manageProducts(promotion: Promotion): void {
    this.selectedPromotion = promotion;
    this.loadProducts();
    this.showProductModal = true;
  }

  loadProducts(): void {
    this.products = [
      { id: 1, name: 'Nike Air Max', code: 'NIKE001', price: 1000000 },
      { id: 2, name: 'Adidas Ultra Boost', code: 'ADIDAS001', price: 1200000 },
    ];
  }
}
