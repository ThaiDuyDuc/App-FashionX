// components/pos/pos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/Product.service';
import { OrderService } from '../../services/Order.service';
import { VoucherService } from '../../services/Voucher.service';
import { Order } from '../../../model/order.model';
import { Customer } from '../../../model/customer.model';
import { Voucher } from '../../../model/voucher.model';
import { ProductDetail } from '../../../model/productDetail.model';
import { Product } from '../../../model/product.model';
import { OrderDetail } from '../../../model/order_detail.model';
import { Payment } from '../../../model/payment.model';
import { CustomerSelectComponent } from '../customer-select/customer-select.component';
import { PromotionSelectComponent } from '../promotion-select/promotion-select.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { ProductDetailService } from '../../services/ProductDetail.service';
import { CustomerService } from '../../services/Custommer.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [
    CommonModule,
    CustomerSelectComponent,
    PromotionSelectComponent,
    PaymentModalComponent,
    ProductSearchComponent,
  ],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.scss',
})
export class PosComponent implements OnInit {
  currentOrder: Order = this.createEmptyOrder();
  selectedCustomer: Customer | null = null;
  selectedVoucher: Voucher | null = null;
  filteredProducts: Product[] = []; // Changed from Product[] to ProductDetail[]
  products: Product[] = [];
  productDetails: ProductDetail[] = []; // Thêm dòng này
  customer: Customer[] = [];

  // Mảng để lưu các hóa đơn chờ
  pendingOrders: any[] = [];
  // ID của hóa đơn hiện tại đang chọn (nếu có)
  selectedOrderIndex: number = -1;

  shoppingCart: any[] = []; // Khởi tạo giỏ hàng rỗng

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private voucherService: VoucherService,
    private productDetailService: ProductDetailService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadPendingOrders();
  }

  // Giả sử bạn có một service để lấy danh sách khách hàng
  loadCustomers() {
    this.customerService.getAllCustomers().subscribe((data: Customer[]) => {
      this.customer = data;
    });
  }

  private createEmptyOrder(): Order {
    return {
      id: 0,
      customerId: 0,
      employeeId: 0,
      shopVoucherId: 0,
      addressId: 0,
      confirmationDate: new Date(),
      deliveryStartDate: new Date(),
      expectedDeliveryDate: new Date(),
      fullName: '',
      note: '',
      phoneNumber: '',
      receivedDate: new Date(),
      shoppingMoney: 0,
      status: false,
      totalMoney: 0,
      type: 'RETAIL',
      // code: this.generateOrderCode(),
      code: 'aaaaaa',
      createdBy: '',
      updatedBy: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
      orderDetails: [],
      // discount: 0,
      // total: 0,
    };
  }

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products: any[]) => {
        console.log('Dữ liệu sản phẩm từ API:', products); // Kiểm tra dữ liệu API trả về

        this.products = products.map((p) => ({
          ...p,
          urlImage: p.url_image, // Chuyển đổi url_image thành urlImage
        }));

        console.log('Danh sách sản phẩm sau khi map:', this.products);

        this.filteredProducts = this.products;

        // Lấy chi tiết sản phẩm để lấy giá
        this.productDetailService.getProductDetails().subscribe({
          next: (productDetails: any[]) => {
            console.log('Dữ liệu chi tiết sản phẩm từ API:', productDetails);
            this.productDetails = productDetails;
          },
          error: (error) => {
            console.error('Lỗi khi tải chi tiết sản phẩm:', error);
          },
        });

        // 🔥 Gọi hàm merge để ghép dữ liệu
        this.mergeProductsWithOrderDetails();
      },
      error: (error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      },
    });
  }

  getProductPrice(productId: number): number {
    const productDetail = this.productDetails.find(
      (pd) => pd.productId === productId
    );
    return productDetail ? productDetail.price : 0; // Nếu không tìm thấy, trả về 0
  }

  getProductDetailByProduct(productId: number): ProductDetail | undefined {
    if (!this.productDetails || this.productDetails.length === 0) {
      console.warn('Danh sách productDetails chưa được tải!');
      return undefined;
    }

    console.log('📌 Danh sách productDetails:', this.productDetails);
    console.log(
      '📌 Kiểu dữ liệu của productId trong productDetails:',
      this.productDetails.map((pd) => typeof pd.productId)
    );
    console.log(
      '📌 Giá trị productId trong productDetails:',
      this.productDetails.map((pd) => pd.productId)
    );
    console.log('📌 Product ID cần tìm:', typeof productId, productId);

    const productDetail = this.productDetails.find(
      (pd) => Number(pd.productId) === Number(productId) // ✅ Chuyển về number trước khi so sánh
    );

    if (!productDetail) {
      console.warn(
        `❌ Không tìm thấy ProductDetail cho Product ID: ${productId}`
      );
    } else {
      console.log('✅ Tìm thấy sản phẩm chi tiết:', productDetail);
    }

    console.log('🎯 Kết quả trả về sản phẩm chi tiết:', productDetail);
    return productDetail;
  }

  private mergeProductsWithOrderDetails() {
    if (!this.currentOrder || !this.currentOrder.orderDetails) return;

    this.currentOrder.orderDetails.forEach((item) => {
      if (!item.productDetail) return; // Bỏ qua nếu không có productDetail

      // Tìm sản phẩm từ danh sách sản phẩm dựa vào productDetail.productId
      const foundProduct = this.products.find(
        (p) => p.id === item.productDetail?.productId
      );

      if (foundProduct) {
        item.product = foundProduct; // Gán sản phẩm tìm được vào orderDetail
      } else {
        console.warn(
          `⚠️ Không tìm thấy sản phẩm có ID: ${item.productDetail.productId}`
        );
      }
    });

    // Cập nhật lại giỏ hàng để hiển thị ảnh đúng
    this.shoppingCart = [...this.currentOrder.orderDetails];
  }

  addProductToOrderByProduct(product: Product) {
    if (!this.currentOrder) {
      alert('Vui lòng chọn hóa đơn trước!');
      return;
    }

    const productDetail = this.getProductDetailByProduct(product.id);

    if (!productDetail) {
      console.error(
        `Không tìm thấy ProductDetail cho sản phẩm ID: ${product.id}`
      );
      return;
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    let existingItem = this.currentOrder.orderDetails.find(
      (item) => item.productDetailId === productDetail.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
      existingItem.totalMoney = existingItem.quantity * existingItem.price;
    } else {
      // Thêm sản phẩm mới vào giỏ hàng với `product`
      const orderDetail: OrderDetail = {
        id: 0,
        orderId: this.currentOrder.id,
        productDetailId: productDetail.id,
        price: productDetail.price,
        quantity: 1,
        status: true,
        totalMoney: productDetail.price,
        productDetail: productDetail,
        product: product, // ✅ Lưu `product` để lấy hình ảnh
        createdBy: '',
        updatedBy: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deleted: false,
      };

      this.currentOrder.orderDetails.push(orderDetail);
    }

    // Cập nhật shoppingCart
    this.shoppingCart = [...this.currentOrder.orderDetails];

    // Cập nhật tổng tiền
    this.calculateTotals();

    // Lưu vào pendingOrders & localStorage
    this.pendingOrders[this.selectedOrderIndex] = { ...this.currentOrder };
    localStorage.setItem('pendingOrders', JSON.stringify(this.pendingOrders));
  }

  calculateTotals() {
    this.currentOrder.totalMoney = this.currentOrder.orderDetails.reduce(
      (sum, item) => sum + item.totalMoney,
      0
    );
  }

  onSearch(searchTerm: string) {
    if (!searchTerm) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  increaseQuantity(item: OrderDetail) {
    item.quantity++;
    item.totalMoney = item.quantity * item.price;
    this.calculateTotals();
  }

  decreaseQuantity(item: OrderDetail) {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalMoney = item.quantity * item.price;
      this.calculateTotals();
    }
  }

  processPayment(paymentDetails: Payment) {
    this.orderService
      .completeOrder(this.currentOrder.id, paymentDetails)
      .subscribe({
        next: (completedOrder) => {
          this.currentOrder = this.createEmptyOrder();
          // this.loadPendingOrders();
        },
        error: (error) => {
          console.error('Error processing payment:', error);
        },
      });
  }

  createPendingOrder() {
    if (!this.selectedCustomer) {
      alert('Vui lòng chọn khách hàng trước khi tạo hóa đơn!');
      return;
    }

    // Lấy danh sách hóa đơn chờ từ LocalStorage, đảm bảo luôn là mảng hợp lệ
    this.pendingOrders =
      JSON.parse(localStorage.getItem('pendingOrders') || '[]') || [];

    // Kiểm tra xem khách hàng đã có hóa đơn chờ chưa
    const existingOrder = this.pendingOrders?.find(
      (order: Order) =>
        order.customerId === this.selectedCustomer?.id && !order.status
    );

    if (existingOrder) {
      alert('Khách hàng này đã có một hóa đơn chưa thanh toán!');
      return;
    }

    const newOrder: Order = {
      id: Date.now(), // Tạo ID duy nhất dựa trên timestamp
      customerId: this.selectedCustomer.id,
      employeeId: 0,
      shopVoucherId: 0,
      addressId: 0,
      confirmationDate: new Date(), // Mặc định là ngày hiện tại
      deliveryStartDate: new Date(),
      expectedDeliveryDate: new Date(),
      receivedDate: new Date(),
      fullName: this.selectedCustomer.fullName,
      phoneNumber: this.selectedCustomer.phoneNumber,
      note: '',
      shoppingMoney: 0,
      status: false, // Hóa đơn chưa thanh toán
      totalMoney: 0,
      type: 'PENDING',
      code: '',
      orderDetails: [],

      createdBy: 'admin',
      updatedBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };

    // Thêm hóa đơn mới vào danh sách
    this.pendingOrders.push(newOrder);

    // Lưu danh sách vào LocalStorage
    localStorage.setItem('pendingOrders', JSON.stringify(this.pendingOrders));

    // Cập nhật đơn hàng hiện tại
    this.currentOrder = newOrder;
    this.selectedOrderIndex = this.pendingOrders.length - 1;

    console.log('Hóa đơn tạm đã được tạo:', this.currentOrder);
  }

  // Chọn một hóa đơn chờ để tiếp tục chỉnh sửa
  selectPendingOrder(index: number): void {
    if (index >= 0 && index < this.pendingOrders.length) {
      // Cảnh báo nếu đơn hàng hiện tại chưa lưu
      // if (
      //   this.currentOrder.orderDetails.length > 0 &&
      //   !confirm('Đơn hàng hiện tại chưa được lưu. Bạn có muốn tiếp tục?')
      // ) {
      //   return;
      // }

      // Lấy hóa đơn chờ từ danh sách
      this.currentOrder = JSON.parse(JSON.stringify(this.pendingOrders[index]));
      this.selectedOrderIndex = index;

      // Nếu có khách hàng, cần tìm và hiển thị thông tin khách hàng
      if (this.currentOrder.customerId) {
        // Giả sử bạn có một danh sách khách hàng đã tải từ API
        this.selectedCustomer =
          this.customer.find(
            (customer) => customer.id === this.currentOrder.customerId
          ) || null;
      }

      // Cập nhật danh sách sản phẩm trong giỏ hàng từ hóa đơn đã chọn
      this.shoppingCart = [...this.currentOrder.orderDetails];

      console.log('Đã chọn hóa đơn:', this.currentOrder);
      console.log('Giỏ hàng hiện tại:', this.shoppingCart);
      console.log(
        'sản phẩm chi tiết trong sản phẩm giỏ hàng',
        this.currentOrder.orderDetails
      );
    }
  }

  // Reset đơn hàng hiện tại
  resetCurrentOrder(): void {
    this.currentOrder = {
      orderDetails: [],
      customerId: 0, // Đổi từ null thành 0 hoặc undefined
      // discount: 0,
      totalMoney: 0, // Nếu trong Order có 'totalMoney', đổi từ 'total'
      status: false, // Đổi từ chuỗi 'DRAFT' thành boolean false

      // Các thuộc tính bắt buộc khác của Order (tránh lỗi thiếu thuộc tính)
      employeeId: 0,
      shopVoucherId: 0,
      addressId: 0,
      confirmationDate: new Date(), // Gán giá trị mặc định hợp lệ
      deliveryStartDate: new Date(),
      expectedDeliveryDate: new Date(),
      fullName: '',
      note: '',
      phoneNumber: '',
      receivedDate: new Date(),
      shoppingMoney: 0,
      type: '',
      code: '',
      id: 0,
      createdBy: '',
      updatedBy: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted: false,
    };

    this.selectedCustomer = null;
    this.selectedOrderIndex = -1;
  }

  // Xóa một hóa đơn chờ
  deletePendingOrder(index: number): void {
    if (index >= 0 && index < this.pendingOrders.length) {
      if (confirm('Bạn có chắc chắn muốn xóa hóa đơn chờ này?')) {
        this.pendingOrders.splice(index, 1);
        localStorage.setItem(
          'pendingOrders',
          JSON.stringify(this.pendingOrders)
        );

        // Nếu đang chọn hóa đơn bị xóa, reset về trạng thái mới
        if (index === this.selectedOrderIndex) {
          this.resetCurrentOrder();
        }
      }
    }
  }

  // chọn khách hàng
  selectCustomer(customer: Customer) {
    this.selectedCustomer = customer;
    console.log('Khách hàng đã chọn:', customer);
  }

  // Hàm load danh sách hóa đơn chờ từ LocalStorage
  loadPendingOrders() {
    this.pendingOrders =
      JSON.parse(localStorage.getItem('pendingOrders') || '[]') || [];
  }

  applyPromotion(voucher: Voucher | null) {
    this.currentOrder.shopVoucherId = voucher ? voucher.id : 0;
  }

  showPaymentModal = false; // Khởi tạo biến

  // Mở model thanh toán
  openPaymentModal(): void {
    if (this.currentOrder.orderDetails.length === 0) {
      alert('Vui lòng thêm sản phẩm vào đơn hàng');
      return;
    }
    this.showPaymentModal = true;
  }

  // Đóng Thanh toán
  closePaymentModal() {
    this.showPaymentModal = false;
  }

  // xóa sản phẩm khỏi giỏ hàng
  removeProduct(index: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.currentOrder.orderDetails.splice(index, 1);
      this.calculateTotals(); // Cập nhật lại tổng tiền
    }
  }
}
