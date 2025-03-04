import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-style',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-style.component.html',
  styleUrl: './add-style.component.scss',
})
export class AddStyleComponent implements OnInit {
  @Input() style: any = null; // Dữ liệu style được truyền vào để chỉnh sửa
  @Output() close = new EventEmitter<void>();

  styleForm!: FormGroup;
  isEditing: boolean = false;
  isSubmitting: boolean = false;

  // Thêm thuộc tính showModal
  showModal: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.styleForm = this.fb.group({
      name: [this.style?.name || '', Validators.required],
      status: [this.style?.status || false],
    });

    if (this.style) {
      this.isEditing = true; // Đang ở chế độ chỉnh sửa
    }
  }

  onSubmit() {
    if (this.styleForm.valid) {
      this.isSubmitting = true;
      // Xử lý form
    }
  }

  // Thêm phương thức closeModal
  closeModal() {
    this.showModal = false;
  }

  onClose() {
    this.close.emit();
  }
}
