// shipping-carrier.model.ts
export interface ShippingCarrier {
  id: number;
  name: string;
  contactInfo: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

// shipping-carrier.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shipping-carrier',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './shipping-carrier.component.html',
  styleUrls: ['./shipping-carrier.component.scss'],
})
export class ShippingCarrierComponent implements OnInit {
  carriers: ShippingCarrier[] = [];
  form: FormGroup;
  isEditing = false;
  selectedCarrier: ShippingCarrier | null = null;
  showForm = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contactInfo: ['', Validators.required],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.loadCarriers();
  }

  loadCarriers(): void {
    // API call would go here
    this.carriers = [
      {
        id: 1,
        name: 'Giao Hang Nhanh',
        contactInfo: '1900 6789',
        status: true,
        createdBy: 'Admin',
        updatedBy: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
      },
    ];
  }

  onSubmit(): void {
    if (this.form.valid) {
      // API call would go here
      this.showForm = false;
      this.form.reset();
    }
  }

  editCarrier(carrier: ShippingCarrier): void {
    this.selectedCarrier = carrier;
    this.isEditing = true;
    this.showForm = true;
    this.form.patchValue({
      name: carrier.name,
      contactInfo: carrier.contactInfo,
      status: carrier.status,
    });
  }

  deleteCarrier(id: number): void {
    // API call would go here
    this.carriers = this.carriers.filter((c) => c.id !== id);
  }
}
