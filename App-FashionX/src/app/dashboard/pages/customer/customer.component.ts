import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm dòng này
import { FormsModule } from '@angular/forms';

interface CustomerActivity {
  action: string;
  date: string;
  details: string;
}

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  joinDate: string;
  avatar: string;
  totalPurchases: number;
  lastPurchase: string;
  membershipLevel: string;
  creditScore: number;
  activities: CustomerActivity[];
  tags: string[];
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      status: 'Đang hoạt động',
      joinDate: '2024-02-13',
      avatar:
        'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/04/anh-jisoo-62.jpg.webp',
      totalPurchases: 15,
      lastPurchase: '2024-02-10',
      membershipLevel: 'Vàng',
      creditScore: 85,
      activities: [
        {
          action: 'Mua hàng',
          date: '2024-02-10',
          details: 'Đơn hàng #12345 - 2.500.000đ',
        },
        {
          action: 'Phản hồi',
          date: '2024-02-08',
          details: 'Đánh giá 5 sao cho sản phẩm',
        },
      ],
      tags: ['VIP', 'Thân thiết'],
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0901234568',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      status: 'Không hoạt động',
      joinDate: '2024-01-15',
      avatar: '/api/placeholder/40/40',
      totalPurchases: 8,
      lastPurchase: '2024-01-20',
      membershipLevel: 'Bạc',
      creditScore: 72,
      activities: [
        {
          action: 'Khiếu nại',
          date: '2024-01-25',
          details: 'Vấn đề về vận chuyển',
        },
      ],
      tags: ['Mới'],
    },
  ];

  searchTerm: string = '';
  selectedStatus: string = 'all';
  selectedMembership: string = 'all';
  sortField: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedCustomer: Customer | null = null;
  showAddModal: boolean = false;
  showDetailsModal: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  timeRanges = [
    { label: '7 ngày qua', value: '7days' },
    { label: '30 ngày qua', value: '30days' },
    { label: '90 ngày qua', value: '90days' },
  ];
  selectedTimeRange = '30days';

  membershipLevels = ['Đồng', 'Bạc', 'Vàng', 'Kim cương'];

  dashboardStats = {
    totalCustomers: 1234,
    activeCustomers: 892,
    newCustomers: 56,
    averagePurchaseValue: 2500000,
    customerRetentionRate: 85,
    topSpenders: [
      { name: 'Nguyễn Văn A', amount: 25000000 },
      { name: 'Trần Thị B', amount: 18000000 },
      { name: 'Lê Văn C', amount: 15000000 },
    ],
  };

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    // Implement API call here
  }

  get filteredCustomers() {
    return this.customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.phone.includes(this.searchTerm);

      const matchesStatus =
        this.selectedStatus === 'all' ||
        customer.status === this.selectedStatus;
      const matchesMembership =
        this.selectedMembership === 'all' ||
        customer.membershipLevel === this.selectedMembership;

      return matchesSearch && matchesStatus && matchesMembership;
    });
  }

  sortCustomers(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  showCustomerDetails(customer: Customer) {
    this.selectedCustomer = customer;
    this.showDetailsModal = true;
  }

  addCustomer() {
    this.showAddModal = true;
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.showAddModal = true;
  }

  deleteCustomer(customer: Customer) {
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      // Implement delete logic
    }
  }

  exportCustomers() {
    // Implement export logic
  }

  importCustomers() {
    // Implement import logic
  }

  updateCustomerStatus(customer: Customer, status: string) {
    // Implement status update logic
  }

  addTag(customer: Customer, tag: string) {
    // Implement tag addition logic
  }

  calculateCustomerScore(customer: Customer): number {
    // Implement scoring logic
    return customer.creditScore;
  }

  getPaginatedCustomers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredCustomers.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
  }
}
