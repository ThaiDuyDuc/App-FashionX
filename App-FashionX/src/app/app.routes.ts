import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PromotionComponent } from './dashboard/pages/promotion/promotion.component';
import { StatisticalComponent } from './dashboard/pages/statistical/statistical.component';
import { BillComponent } from './dashboard/pages/bill/bill.component';
import { MaterialComponent } from './dashboard/pages/material/material.component';
import { CustomerComponent } from './dashboard/pages/customer/customer.component';
import { EmployeeComponent } from './dashboard/pages/employee/employee.component';
// import { DirectSalesComponent } from './dashboard/pages/direct-sales/direct-sales.component';
import { SizeComponent } from './dashboard/pages/size/size.component';
import { StyleComponent } from './dashboard/pages/style/style.component';
import { ShippingCarrierComponent } from './dashboard/pages/shipping-carrier/shipping-carrier.component';
// import { OrderComponent } from './dashboard/pages/order/order.component';
// import { OrderDetailComponent } from './dashboard/pages/order-detail/order-detail.component';
import { PosComponent } from './dashboard/pages/pos/pos.component';
import { PaymentModalComponent } from './dashboard/pages/payment-modal/payment-modal.component';

import { ProductSearchComponent } from './dashboard/pages/product-search/product-search.component';
// Component add
import { AddPromotionComponent } from './dashboard/pages/components/add-promotion/add-promotion.component';
import { AddStyleComponent } from './dashboard/pages/components/add-style/add-style.component';
import { AddShippingCarrierComponent } from './dashboard/pages/components/add-shipping-carrier/add-shipping-carrier.component';
import { AddProductComponent } from './dashboard/pages/components/add-product/add-product.component';
// import { OrderTrackingModalComponent } from './dashboard/pages/order-tracking-modal/order-tracking-modal.component';

export const routes: Routes = [
  // Thêm export ở đây
  {
    path: 'dashboard-fashionX',
    component: DashboardComponent, // Dashboard là component chính
    children: [
      { path: 'promotion', component: PromotionComponent }, // Trang con promotion
      { path: 'statistical', component: StatisticalComponent }, // Trang con statistical
      { path: 'bill', component: BillComponent }, // Hóa đơn
      { path: 'material', component: MaterialComponent }, // Chất liệu
      { path: 'style', component: StyleComponent }, // kiểu dáng
      { path: 'customer', component: CustomerComponent }, // Khách hàng
      { path: 'employee', component: EmployeeComponent }, // Nhân viên
      { path: 'size', component: SizeComponent }, // Nhân viên
      { path: 'shipping-carrier', component: ShippingCarrierComponent }, // Đơn vị vận chuyển
      { path: 'pos', component: PosComponent }, // Bán hàng tại quầy
      { path: 'payment-model', component: PaymentModalComponent }, // Bán hàng tại quầy
      { path: 'product-search', component: ProductSearchComponent }, // Bán hàng tại quầy

      //      { path: 'order-detail', component: OrderDetailComponent }, // Đơn hàng chi tiết

      // Component add
      { path: 'addPromotion', component: AddPromotionComponent }, // Thêm Khuyến mãi
      { path: 'addStyle', component: AddStyleComponent }, // Thêm style
      { path: 'addShippingCarrier', component: AddShippingCarrierComponent }, // Thêm đơn vị vận chuyển
      { path: 'addProduct', component: AddProductComponent }, // Thêm đơn sản phẩm

      // { path: 'orders/:id', component: OrderTrackingModalComponent }, // Thêm đơn vị vận chuyển

      //      { path: 'direct-sales', component: DirectSalesComponent }, // Bán hàng trực tiếp
      { path: '', redirectTo: 'promotion', pathMatch: 'full' }, // Mặc định chuyển đến promotion
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Cần khai báo ở đây
  exports: [RouterModule],
})
export class AppRoutingModule {}
