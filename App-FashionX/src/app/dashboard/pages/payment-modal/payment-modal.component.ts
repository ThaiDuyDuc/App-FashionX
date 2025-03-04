import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payment } from '../../../model/payment.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import ReactiveFormsModule

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
})
export class PaymentModalComponent implements OnInit {
  @Input() totalAmount: number = 0;
  @Input() cart: any[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() paymentComplete = new EventEmitter<any>();
  @Input() order: any; // Đảm bảo có @Input() để nhận giá trị từ component cha

  paymentForm: FormGroup;
  step: number = 1;
  isProcessing: boolean = false;
  paymentMethods: Payment[] = [
    {
      id: 1,
      totalMoney: 500000, // Ví dụ: 500,000 VND
      transactionCode: 'TXN12345',
      shopOrderId: 1001,
      paymentMethodId: 1, // 1 = Credit Card
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    },
    {
      id: 2,
      totalMoney: 300000, // 300,000 VND
      transactionCode: 'TXN67890',
      shopOrderId: 1002,
      paymentMethodId: 2, // 2 = MoMo
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    },
    {
      id: 3,
      totalMoney: 700000, // 700,000 VND
      transactionCode: 'TXN54321',
      shopOrderId: 1003,
      paymentMethodId: 3, // 3 = Bank Transfer
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    },
    {
      id: 4,
      totalMoney: 250000, // 250,000 VND
      transactionCode: 'TXN98765',
      shopOrderId: 1004,
      paymentMethodId: 4, // 4 = COD
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    },
  ];

  selectedPaymentMethod: string = '';

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      customerInfo: this.fb.group({
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      }),
      shippingInfo: this.fb.group({
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        district: ['', [Validators.required]],
        ward: ['', [Validators.required]],
        notes: [''],
      }),
      paymentInfo: this.fb.group({
        cardNumber: [''],
        cardName: [''],
        expiryDate: [''],
        cvv: [''],
      }),
    });
  }

  ngOnInit(): void {}

  nextStep(): void {
    const currentGroup =
      this.step === 1
        ? (this.paymentForm.get('customerInfo') as FormGroup)
        : (this.paymentForm.get('shippingInfo') as FormGroup);

    if (currentGroup?.valid) {
      this.step++;
    } else {
      Object.keys(currentGroup.controls).forEach((key) => {
        const control = currentGroup.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  previousStep(): void {
    this.step--;
  }

  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethod = methodId;
  }

  calculateShipping(): number {
    // Đây chỉ là ví dụ, bạn có thể tính phí vận chuyển dựa trên logic thực tế của bạn
    return 30000; // 30,000 VND
  }

  calculateTotal(): number {
    return this.totalAmount + this.calculateShipping();
  }

  submitPayment(): void {
    if (this.paymentForm.valid && this.selectedPaymentMethod) {
      this.isProcessing = true;

      // Giả lập xử lý thanh toán
      setTimeout(() => {
        this.isProcessing = false;
        const paymentData = {
          ...this.paymentForm.value,
          paymentMethod: this.selectedPaymentMethod,
          items: this.cart,
          totalAmount: this.calculateTotal(),
          shippingFee: this.calculateShipping(),
          date: new Date(),
        };
        this.paymentComplete.emit(paymentData);
      }, 2000);
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
