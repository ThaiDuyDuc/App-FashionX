import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm dòng này
import { FormsModule } from '@angular/forms'; // Để sử dụng ngModel
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Import MatDialog
import { InvoiceDetailComponent } from './../components/invoice-detail/invoice-detail.component';
// import { PaginationComponent } from './../components/pagination/pagination.component';
import { AlertMessageComponent } from '../../../components/alert-message/alert-message.component';
import { RouterModule } from '@angular/router';

interface Order {
  id: number;
  code: string;
  full_name: string;
  phone_number: string;
  shopping_money: number;
  total_money: number;
  status: boolean;
  type: string;
  created_at: string;
  confirmation_date: string;
  delivery_start_date: string;
  expected_delivery_date: string;
  received_date: string;
  note: string;
}

interface OrderDetail {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  total_money: number;
  status: boolean;
}

interface OrderHistory {
  id: number;
  date: string;
  action_description: string;
  action_status: boolean;
}

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    // PaginationComponent,
    AlertMessageComponent,
    RouterModule,
    InvoiceDetailComponent,
  ],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss'],
})
export class BillComponent implements OnInit {
  orders: Order[] = [
    {
      id: 1,
      code: 'DH001',
      full_name: 'Nguyễn Văn A',
      phone_number: '0123456789',
      shopping_money: 1000000,
      total_money: 950000,
      status: true,
      type: 'Online',
      created_at: '2024-02-08',
      confirmation_date: '2024-02-08',
      delivery_start_date: '2024-02-09',
      expected_delivery_date: '2024-02-11',
      received_date: '',
      note: 'Giao giờ hành chính',
    },
  ];

  selectedOrder: Order | null = null;
  orderDetails: OrderDetail[] = [];
  orderHistory: OrderHistory[] = [];
  searchTerm: string = '';
  showDetailsModal: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  viewOrderDetails(order: Order): void {
    this.selectedOrder = order;
    this.showDetailsModal = true;
    this.loadOrderDetails();
    this.loadOrderHistory();
  }

  private loadOrderDetails(): void {
    this.orderDetails = [
      {
        id: 1,
        product_name: 'Nike Air Max',
        price: 1000000,
        quantity: 1,
        total_money: 1000000,
        status: true,
      },
    ];
  }

  private loadOrderHistory(): void {
    this.orderHistory = [
      {
        id: 1,
        date: '2024-02-08 10:00',
        action_description: 'Đơn hàng được tạo',
        action_status: true,
      },
    ];
  }

  closeModal(): void {
    this.showDetailsModal = false;
    this.selectedOrder = null;
  }

  getOrderStatus(status: boolean): string {
    return status ? 'Hoạt động' : 'Đã hủy';
  }
}
