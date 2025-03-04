import { Component, OnInit } from '@angular/core';
import { Size } from './../../../model/size.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss',
})
export class SizeComponent implements OnInit {
  sizes: Size[] = []; // Danh sách các size hiện tại
  newSize: Size = {
    id: 0,
    name: '',
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    deleted: false,
    status: true,
  };
  showForm: boolean = false; // Hiển thị form thêm size
  searchTerm: string = ''; // Biến tìm kiếm
  sizeForm: FormGroup; // Thay vì NgForm
  isEditing: boolean = false; // Trạng thái chỉnh sửa
  isSubmitting: boolean = false; // Trạng thái khi đang xử lý form

  constructor() {
    // Khởi tạo form
    this.sizeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      status: new FormControl(true),
    });
  }

  ngOnInit(): void {
    // Load danh sách size từ API hoặc giả lập dữ liệu
    this.loadSizes();
  }

  loadSizes() {
    // Giả lập dữ liệu
    this.sizes = [
      {
        id: 1,
        name: 'S',
        createdBy: 'admin',
        updatedBy: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
        status: true,
      },
      {
        id: 2,
        name: 'M',
        createdBy: 'admin',
        updatedBy: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
        status: true,
      },
      {
        id: 3,
        name: 'L',
        createdBy: 'admin',
        updatedBy: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
        status: true,
      },
    ];
  }

  addSize() {
    if (this.newSize.name) {
      this.newSize.id = this.sizes.length + 1; // Tự động tạo id
      this.sizes.push({ ...this.newSize });
      this.clearForm();
    }
  }

  deleteSize(size: Size) {
    const index = this.sizes.indexOf(size);
    if (index > -1) {
      this.sizes.splice(index, 1);
    }
  }

  updateSize(size: Size) {
    size.updatedAt = new Date();
    // Cập nhật thông tin size (giả lập)
  }

  clearForm() {
    this.newSize = {
      id: 0,
      name: '',
      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      status: true,
    };
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Xử lý submit form
  onSubmit() {
    if (this.sizeForm?.valid) {
      this.isSubmitting = true;
      this.addSize(); // Hoặc có thể là updateSize() nếu chỉnh sửa
      this.isSubmitting = false;
    }
  }

  // Cập nhật lại kích thước khi chỉnh sửa
  editSize(size: Size) {
    this.newSize = { ...size };
    this.isEditing = true;
    this.showForm = true;
  }

  // Đóng form modal
  closeModal() {
    this.showForm = false;
    this.isEditing = false;
    this.clearForm();
  }

  showModal: boolean = false;

  openAddModal() {
    this.showModal = true;
  }
}
