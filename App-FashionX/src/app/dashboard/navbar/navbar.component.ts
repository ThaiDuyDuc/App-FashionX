import { Component, Output, EventEmitter } from '@angular/core';
import { SidebarComponent } from './../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<void>(); // Khai báo sự kiện để phát

  toggleSidebar() {
    console.log('Sidebar button clicked'); // Debug log khi nhấn nút
    this.sidebarToggle.emit(); // Phát sự kiện khi nhấn nút toggle
  }
}
