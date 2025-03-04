import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  isSidebarVisible = true;

  ngOnInit() {
    // Không gọi checkScreenSize ở đây
  }

  ngAfterViewInit() {
    this.checkScreenSize(); // Kiểm tra kích thước màn hình khi view đã được khởi tạo
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (typeof window !== 'undefined') {
      // Kiểm tra xem window có tồn tại không
      this.isSidebarVisible = window.innerWidth > 768;
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    const sidebar = document.querySelector('app-sidebar');
    const overlay = document.querySelector('.overlay');

    if (this.isSidebarVisible) {
      sidebar?.classList.add('show');
      overlay?.classList.add('show');
    } else {
      sidebar?.classList.remove('show');
      overlay?.classList.remove('show');
    }
  }
}
