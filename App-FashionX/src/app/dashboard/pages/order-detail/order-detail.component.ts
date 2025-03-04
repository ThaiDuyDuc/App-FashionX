// order-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailService } from '../../services/Order_detail.service';
import { Order } from '../../../model/order.model';
import { OrderHistory } from '../../../model/order_history.model';
import { OrderDetail } from '../../../model/order_detail.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  orderId!: number;
  order: Order | null = null;
  orderDetails: OrderDetail[] = [];
  orderHistory: OrderHistory[] = [];
  activeTab: string = 'details';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderDetailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = +params['id'];
      this.loadOrderData();
    });
  }

  loadOrderData(): void {
    this.orderService.getOrderById(this.orderId).subscribe(
      (order) => {
        this.order = order;
        this.loadOrderDetails();
        this.loadOrderHistory();
      },
      (error) => console.error('Error loading order', error)
    );
  }

  loadOrderDetails(): void {
    this.orderService.getOrderDetails(this.orderId).subscribe(
      (details) => (this.orderDetails = details),
      (error) => console.error('Error loading order details', error)
    );
  }

  loadOrderHistory(): void {
    this.orderService.getOrderHistory(this.orderId).subscribe(
      (history) => (this.orderHistory = history),
      (error) => console.error('Error loading order history', error)
    );
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }
}
