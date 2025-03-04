import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shipping-carrier',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-shipping-carrier.component.html',
  styleUrls: ['./add-shipping-carrier.component.scss'],
})
export class AddShippingCarrierComponent implements OnInit {
  form: FormGroup;
  // showForm = false;
  isEditing = false;
  selectedCarrier: any = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contactInfo: ['', Validators.required],
      status: [true],
    });
  }

  ngOnInit() {
    console.log('AddShippingCarrierComponent loaded!');
  }

  // openForm(editing: boolean = false, carrier: any = null): void {
  //   this.isEditing = editing;
  //   this.selectedCarrier = carrier;
  //   this.showForm = true;

  //   if (editing && carrier) {
  //     this.form.patchValue({
  //       name: carrier.name,
  //       contactInfo: carrier.contactInfo,
  //       status: carrier.status,
  //     });
  //   } else {
  //     this.form.reset({ status: true });
  //   }
  // }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEditing) {
        console.log('Cập nhật đơn vị:', this.form.value);
      } else {
        console.log('Thêm đơn vị:', this.form.value);
      }
      // this.showForm = false;
      this.form.reset({ status: true });
    }
  }

  goBack() {
    this.router.navigate(['/dashboard-fashionX/shipping-carriers']);
  }
}
