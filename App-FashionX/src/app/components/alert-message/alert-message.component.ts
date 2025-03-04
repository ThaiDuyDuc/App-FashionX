import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss'],
})
export class AlertMessageComponent implements OnInit, OnDestroy {
  @Input() title: string = ''; // Tiêu đề thông báo
  @Input() message: string = ''; // Nội dung thông báo
  @Input() type: 'success' | 'error' | 'warning' = 'success'; // Kiểu thông báo

  isVisible: boolean = true; // Trạng thái hiển thị thông báo
  progress: number = 100; // Giá trị thanh tiến trình
  private intervalId: any; // ID của interval

  // Phương thức để xác định lớp CSS dựa trên loại thông báo
  get alertClass(): string {
    switch (this.type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
      default:
        return '';
    }
  }

  ngOnInit() {
    // Tự động tắt thông báo sau 3 giây
    this.intervalId = setInterval(() => {
      this.progress -= 100 / 35; // Giảm giá trị thanh tiến trình
      if (this.progress <= 0) {
        this.close(); // Đóng thông báo khi thanh tiến trình đạt 0
      }
    }, 100); // Cập nhật mỗi 100ms
  }

  ngOnDestroy() {
    // Dọn dẹp interval khi component bị hủy
    clearInterval(this.intervalId);
  }

  close() {
    this.isVisible = false;
  }
}
