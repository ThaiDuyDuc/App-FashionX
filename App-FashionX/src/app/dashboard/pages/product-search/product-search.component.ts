// product-search.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Thêm ReactiveFormsModule
import { CommonModule } from '@angular/common';

interface ProductCategory {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  @Output() search = new EventEmitter<any>();

  searchForm: FormGroup;
  showAdvancedSearch = false;
  isLoading = false;

  categories: ProductCategory[] = [
    { id: 1, name: 'Thực phẩm' },
    { id: 2, name: 'Đồ uống' },
    { id: 3, name: 'Bánh kẹo' },
    { id: 4, name: 'Đồ gia dụng' },
    { id: 5, name: 'Đồ điện tử' },
  ];

  suppliers: Supplier[] = [
    { id: 1, name: 'Nhà cung cấp A' },
    { id: 2, name: 'Nhà cung cấp B' },
    { id: 3, name: 'Nhà cung cấp C' },
    { id: 4, name: 'Nhà cung cấp D' },
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      keyword: [''],
      barcode: [''],
      categoryId: [null],
      supplierId: [null],
      priceFrom: [null],
      priceTo: [null],
      hasPromotion: [false],
      inStock: [true],
    });
  }

  ngOnInit(): void {
    // Emit search event on keyword changes after 300ms of pause in typing
    this.searchForm
      .get('keyword')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (value && value.length > 2) {
          this.performSearch();
        }
      });
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  performSearch(): void {
    this.isLoading = true;

    // Create search criteria from form values
    const searchCriteria = this.searchForm.value;

    // Emit search event with criteria
    this.search.emit(searchCriteria);

    // Simulating API request delay
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  resetSearch(): void {
    this.searchForm.reset({
      keyword: '',
      barcode: '',
      categoryId: null,
      supplierId: null,
      priceFrom: null,
      priceTo: null,
      hasPromotion: false,
      inStock: true,
    });
    this.performSearch();
  }
}
