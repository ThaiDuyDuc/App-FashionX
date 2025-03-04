import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-promotion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss'],
})
export class AddPromotionComponent implements OnInit {
  promotionForm: FormGroup; // Dùng toán tử "!" để báo cho TypeScript rằng sẽ được khởi tạo
  isSubmitting = false;
  imageUrl: string | ArrayBuffer | null = null; // Khai báo thuộc tính imageUrl

  constructor(private fb: FormBuilder, private router: Router) {
    this.promotionForm = this.fb.group({
      code: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      urlImage: ['', Validators.required],
      value: ['', Validators.required],
      image: [null, Validators.required], // Thêm trường image vào form
    });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    // Khởi tạo form với các trường và validators
    this.promotionForm = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(255)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      urlImage: ['', [Validators.required, Validators.maxLength(255)]],
      value: [
        '',
        [Validators.required, Validators.min(0), Validators.max(999999.99)],
      ],
    });
  }

  // Xử lý sự kiện khi người dùng chọn ảnh
  onImageSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = reader.result; // Lưu URL của hình ảnh vào imageUrl
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    // if (this.promotionForm.valid) {
    //   this.isSubmitting = true;
    //   // Thêm logic xử lý submit form ở đây, ví dụ gửi dữ liệu lên server
    //   console.log(this.promotionForm.value);

    //   // Ví dụ: Gửi dữ liệu lên API (giả sử có một service)
    //   // this.promotionService.createPromotion(this.promotionForm.value).subscribe({
    //   //   next: (response) => {
    //   //     this.isSubmitting = false;
    //   //     // Xử lý thành công, ví dụ: chuyển hướng đến trang khác
    //   //   },
    //   //   error: (err) => {
    //   //     this.isSubmitting = false;
    //   //     // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
    //   //   },
    //   // });
    // } else {
    //   this.markFormAsTouched();
    // }

    if (this.promotionForm.valid) {
      this.isSubmitting = true;
      // Thực hiện logic lưu dữ liệu tại đây
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Khuyến mãi đã được lưu thành công!');
      }, 2000);
    }
  }

  onCancel() {
    // Reset lại form khi hủy
    this.promotionForm.reset();
  }

  markFormAsTouched() {
    // Đánh dấu tất cả các trường trong form là "touched" để hiển thị lỗi nếu có
    Object.keys(this.promotionForm.controls).forEach((field) => {
      const control = this.promotionForm.get(field);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  onClose() {
    // Điều hướng đến trang khác, ví dụ: '/home'
    this.router.navigate(['/home']); // Điều chỉnh '/home' thành route bạn muốn
  }
}
