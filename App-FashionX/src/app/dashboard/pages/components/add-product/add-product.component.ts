import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../model/product.model';
import { ProductDetail } from '../../../../model/productDetail.model';
import { ProductService } from '../../../services/Product.service';
import { BrandService } from '../../../services/Brand.service';
import { ColorService } from '../../../services/Color.service';
import { MaterialService } from '../../../services/Material.service';
import { SizeService } from '../../../services/Size.service';
import { StyleService } from '../../../services/style.service';
import { finalize } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../services/Notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// import { SoleService }
// import { TrademarkService }

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  productDetailForm: FormGroup;
  isLoading = false;
  uploadProgress = 0;
  previewImage: string | ArrayBuffer | null = null;

  // Danh sách các thuộc tính động
  brands: any[] = [];
  colors: any[] = [];
  materials: any[] = [];
  sizes: any[] = [];
  soles: any[] = [];
  styles: any[] = [];
  trademarks: any[] = [];

  // Các biến để theo dõi trạng thái
  isSubmitting = false;
  showVariants = false;
  productVariants: ProductDetail[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private colorService: ColorService,
    private materialService: MaterialService,
    private sizeService: SizeService,
    private styleService: StyleService,
    private notificationService: NotificationService // private soleService: SoleService, // private trademarkService: TrademarkService,
  ) {
    this.productForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: [true],
      urlImage: [''],
    });

    this.productDetailForm = this.fb.group({
      brandId: [null, [Validators.required]],
      colorId: [null, [Validators.required]],
      materialId: [null, [Validators.required]],
      sizeId: [null, [Validators.required]],
      soleId: [null, [Validators.required]],
      styleId: [null, [Validators.required]],
      tradeMarkId: [null, [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      status: [true],
    });
  }

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData(): void {
    this.isLoading = true;

    Promise.all([
      firstValueFrom(this.brandService.getBrands()),
      firstValueFrom(this.colorService.getColors()),
      firstValueFrom(this.materialService.getMaterials()),
      firstValueFrom(this.sizeService.getSizes()),
      // firstValueFrom(this.soleService.getAll()),  // Nếu cần dùng, bỏ comment
      firstValueFrom(this.styleService.getStyles()),
      // firstValueFrom(this.trademarkService.getAll()) // Nếu cần dùng, bỏ comment
    ])
      .then(([brands, colors, materials, sizes, styles]) => {
        this.brands = brands;
        this.colors = colors;
        this.materials = materials;
        this.sizes = sizes;
        // this.soles = soles; // Nếu có
        this.styles = styles;
        // this.trademarks = trademarks; // Nếu có
        this.isLoading = false;
      })
      .catch((error) => {
        this.notificationService.error('Đã xảy ra lỗi khi tải dữ liệu');
        console.error('Lỗi khi tải dropdown data:', error);
        this.isLoading = false;
      });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      // Hiển thị hình ảnh xem trước
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result || null;
      };
      reader.readAsDataURL(file);

      // Upload hình ảnh
      this.uploadProgress = 0;
      this.isLoading = true;

      this.productService
        .uploadImage(file)
        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.uploadProgress = 100;
          })
        )
        .subscribe({
          next: (response) => {
            this.productForm.patchValue({ urlImage: response.imageUrl });
            this.notificationService.success('Tải hình ảnh thành công');
          },
          error: () => {
            this.notificationService.error('Tải hình ảnh thất bại');
          },
          complete: () => {
            console.log('Upload hoàn tất');
          },
        });
    }
  }

  addVariant(): void {
    if (this.productDetailForm.valid) {
      const variant = { ...this.productDetailForm.value };
      this.productVariants.push(variant);
      this.productDetailForm.reset({ status: true });
      this.notificationService.success('Đã thêm biến thể sản phẩm');
    } else {
      this.markFormGroupTouched(this.productDetailForm);
      this.notificationService.warning(
        'Vui lòng điền đầy đủ thông tin biến thể'
      );
    }
  }

  removeVariant(index: number): void {
    this.productVariants.splice(index, 1);
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  saveProduct(): void {
    if (this.productForm.valid && this.productVariants.length > 0) {
      this.isSubmitting = true;

      const productData: Product = {
        ...this.productForm.value,
        id: 0, // Sẽ được tạo bởi server
        createdBy: '',
        updatedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
      };

      this.productService
        .createProduct(productData, this.productVariants)
        .pipe(finalize(() => (this.isSubmitting = false)))
        .subscribe({
          next: (response) => {
            this.notificationService.success('Thêm sản phẩm thành công');
            this.resetForm();
          },
          error: (error) => {
            this.notificationService.error('Thêm sản phẩm thất bại');
            console.error('Lỗi khi thêm sản phẩm:', error);
          },
          complete: () => {
            console.log('Hoàn tất thêm sản phẩm');
          },
        });
    } else {
      this.markFormGroupTouched(this.productForm);
      if (this.productVariants.length === 0) {
        this.notificationService.warning(
          'Vui lòng thêm ít nhất một biến thể sản phẩm'
        );
      } else {
        this.notificationService.warning(
          'Vui lòng điền đầy đủ thông tin sản phẩm'
        );
      }
    }
  }

  resetForm(): void {
    this.productForm.reset({ status: true });
    this.productDetailForm.reset({ status: true });
    this.productVariants = [];
    this.previewImage = null;
    this.uploadProgress = 0;
    this.showVariants = false;
  }

  toggleVariantSection(): void {
    if (this.productForm.valid) {
      this.showVariants = true;
    } else {
      this.markFormGroupTouched(this.productForm);
      this.notificationService.warning(
        'Vui lòng điền đầy đủ thông tin sản phẩm trước'
      );
    }
  }

  getColorName(colorId: number): string {
    const color = this.colors?.find((c) => c.id === colorId);
    return color ? color.name : 'Không xác định';
  }

  getSizeName(sizeId: number): string {
    const size = this.sizes?.find((s) => s.id === sizeId);
    return size ? size.name : 'Không xác định';
  }
}
