import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isVisible = true; // Nhận giá trị từ component cha
  @Output() sidebarToggle = new EventEmitter<void>(); // Khai báo sự kiện để phát

  isDropdownOpen = false; // Để kiểm soát dropdown của sản phẩm

  // Hàm toggle sidebar
  toggleSidebar() {
    this.sidebarToggle.emit(); // Phát sự kiện khi nhấn nút toggle
  }

  // Toggle trạng thái dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Đảo trạng thái mở/đóng dropdown
  }
}
