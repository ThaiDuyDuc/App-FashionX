// employee.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  startDate: Date;
  salary: number;
  sales: number;
  status: 'active' | 'inactive';
  skills: string[];
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      position: 'Nhân viên bán hàng',
      department: 'Sales',
      email: 'nguyenvana@shop.com',
      phone: '0123456789',
      avatar:
        'https://scontent.fvii2-1.fna.fbcdn.net/v/t39.30808-6/480169441_1181741199979500_3270334229502345739_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGh4IPmZTjPHOCF3xL_C3AQB_cH__2DZdwH9wf__YNl3J6vAqLW50d4YC5wY2qsuhRgeyT7VdAutCLd40kgKDKG&_nc_ohc=1paaRCQMUAcQ7kNvgFfYlQK&_nc_oc=Adi3QNfH_i8LKhuwq0cSwK1bJ7RRM6OJ0nGs2IdpAzs5C42htofegWf7tvk3DEE4y2M&_nc_zt=23&_nc_ht=scontent.fvii2-1.fna&_nc_gid=AW8-mvgUqMcjimVweHLJTGS&oh=00_AYDfGJBgy2P3F4kfI-RUlREGm98CQi42bDi3MqciCGaqhA&oe=67B52E22',
      startDate: new Date('2023-01-15'),
      salary: 8000000,
      sales: 20000000,
      status: 'active',
      skills: ['Tư vấn khách hàng', 'Visual Merchandising', 'Quản lý kho'],
    },
    {
      id: 2,
      name: 'Ronaldo',
      position: 'Nhân viên bán hàng',
      department: 'Sales',
      email: 'nguyenvana@shop.com',
      phone: '0123456789',
      avatar:
        'https://scontent.fvii2-4.fna.fbcdn.net/v/t51.75761-15/474972126_18601972864056421_8854473743417181243_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFJfxPoQzklwIexh6iJ_tN7rXkxpLBnDMKteTGksGcMwv5fqYtjdMOBB6bYOiQmcoPoLd0mTfhjI4rEd7r3ei2z&_nc_ohc=hDaUNb7xUDkQ7kNvgHk1ZSt&_nc_oc=AdgaV4PpEpW7ul_WGdWHP4JUWh-UoC4JCQ33AcnGc9aj0hMQt-kS1x0q4wU61GS-1ko&_nc_zt=23&_nc_ht=scontent.fvii2-4.fna&_nc_gid=A_nlFY-F1B4xGgnycfgV1Jm&oh=00_AYBc-6uLJdtpjd__kROrpPo-OTi5_jC5hlmYeaCPYRKnYw&oe=67B53FAD',
      startDate: new Date('2023-01-15'),
      salary: 8000000,
      sales: 150000000,
      status: 'active',
      skills: ['Tư vấn khách hàng', 'Visual Merchandising', 'Quản lý kho'],
    },
    {
      id: 3,
      name: 'Hoàng Thị H',
      position: 'Nhân viên bán hàng',
      department: 'Sales',
      email: 'nguyenvana@shop.com',
      phone: '0123456789',
      avatar:
        'https://motgame.vn/stores/news_dataimages/motgamevn/122021/22/10/tuyen-tap-nhung-hinh-anh-dep-nhat-cua-yua-mikami-p2-37-.4112.jpg',
      startDate: new Date('2023-01-15'),
      salary: 8000000,
      sales: 150000000,
      status: 'active',
      skills: ['Tư vấn khách hàng', 'Visual Merchandising', 'Quản lý kho'],
    },
    {
      id: 4,
      name: 'Nguyễn Văn A',
      position: 'Nhân viên bán hàng',
      department: 'Sales',
      email: 'nguyenvana@shop.com',
      phone: '0123456789',
      avatar:
        'https://scontent.fvii2-1.fna.fbcdn.net/v/t39.30808-6/480169441_1181741199979500_3270334229502345739_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGh4IPmZTjPHOCF3xL_C3AQB_cH__2DZdwH9wf__YNl3J6vAqLW50d4YC5wY2qsuhRgeyT7VdAutCLd40kgKDKG&_nc_ohc=1paaRCQMUAcQ7kNvgFfYlQK&_nc_oc=Adi3QNfH_i8LKhuwq0cSwK1bJ7RRM6OJ0nGs2IdpAzs5C42htofegWf7tvk3DEE4y2M&_nc_zt=23&_nc_ht=scontent.fvii2-1.fna&_nc_gid=AW8-mvgUqMcjimVweHLJTGS&oh=00_AYDfGJBgy2P3F4kfI-RUlREGm98CQi42bDi3MqciCGaqhA&oe=67B52E22',
      startDate: new Date('2023-01-15'),
      salary: 8000000,
      sales: 150000000,
      status: 'active',
      skills: ['Tư vấn khách hàng', 'Visual Merchandising', 'Quản lý kho'],
    },
    {
      id: 5,
      name: 'Tokuda',
      position: 'Nhân viên bán hàng',
      department: 'Sales',
      email: 'nguyenvana@shop.com',
      phone: '0123456789',
      avatar:
        'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2024/07/anh-tokuda.jpg.webp',
      startDate: new Date('2023-01-15'),
      salary: 8000000,
      sales: 150000000,
      status: 'active',
      skills: ['Tư vấn khách hàng', 'Visual Merchandising', 'Quản lý kho'],
    },
    {
      id: 6,
      name: 'Hoàng Thị H',
      position: 'Nhân viên bán hàng',
      department: 'Sales',
      email: 'nguyenvana@shop.com',
      phone: '0123456789',
      avatar:
        'https://scontent.fvii2-1.fna.fbcdn.net/v/t39.30808-6/356652937_748479733630994_3750140522359304385_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEqR7c7Qr_Mt5optw1hxEKIE27iAB5wUhkTbuIAHnBSGcQpMgVVLoMRH9kjMoyFtsDbY11KecFq_AOaCRzfkt_5&_nc_ohc=Y54YcxOu5ZMQ7kNvgEab9ev&_nc_oc=AdioiB0pMhPvoXBkKcdjAUGYVBnVnAc1awhhCSDd7lwNDWEm7u6ZDDHVrU0d0AFIiyE&_nc_zt=23&_nc_ht=scontent.fvii2-1.fna&_nc_gid=AoTc0jrDwwplJbqfVoa1Q_A&oh=00_AYBu9MddcdbQy2SBaQ2vZO0_E_JOVUQA5Rfw_SNfkaB0Sg&oe=67B55E47',
      startDate: new Date('2023-01-15'),
      salary: 8000000,
      sales: 150000000,
      status: 'inactive',
      skills: ['Tư vấn khách hàng', 'Visual Merchandising', 'Quản lý kho'],
    },
    // Thêm data mẫu khác
  ];

  departments = ['Sales', 'Marketing', 'Warehouse', 'Customer Service'];
  filterDepartment = 'all';
  searchTerm = '';
  sortBy = 'name';
  selectedEmployee: Employee | null = null;

  ngOnInit(): void {}

  get filteredEmployees(): Employee[] {
    return this.employees
      .filter(
        (emp) =>
          this.filterDepartment === 'all' ||
          emp.department === this.filterDepartment
      )
      .filter(
        (emp) =>
          emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (this.sortBy) {
          case 'sales':
            return b.sales - a.sales;
          case 'date':
            return b.startDate.getTime() - a.startDate.getTime();
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }

  selectEmployee(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }

  calculatePerformance(employee: Employee): string {
    const monthlyTarget = 100000000; // Target 100 triệu/tháng
    const performance = (employee.sales / monthlyTarget) * 100;
    return `${performance.toFixed(1)}%`;
  }

  getPerformanceClass(employee: Employee): string {
    const performance = (employee.sales / 100000000) * 100;
    if (performance >= 100) return 'excellent';
    if (performance >= 80) return 'good';
    if (performance >= 60) return 'average';
    return 'below-average';
  }

  openAddEmployeeForm(): void {
    // Implement form opening logic here
    console.log('Opening add employee form...');
  }
}
