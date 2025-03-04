import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Thêm dòng này
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

interface SummaryData {
  value: number;
  change: number;
  isIncreasing: boolean;
}

interface Employee {
  name: string;
  avatar: string;
  revenue: number;
  performance: number;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: string;
  statusText: string;
  date?: Date;
  customerAvatar?: string;
  items?: number;
}

@Component({
  selector: 'app-statistical',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.scss'],
})
export class StatisticalComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  summaryData = [
    { title: 'Tổng Doanh Thu', value: 2500000000, change: 15.2 },
    { title: 'Tổng Đơn Hàng', value: 1850000, change: -2.5 },
    { title: 'Khách Hàng Mới', value: 450000, change: 8.7 },
    { title: 'Lợi Nhuận', value: 750000, change: 12.3 },
  ];

  topEmployees = [
    {
      name: 'Nguyễn Văn A',
      revenue: 180000000,
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRCT8fc5-M6BgRuH5_q94XMjyMwGakOExFVA7t56bRtTvMCci1CQgL&usqp=CAE&s',
    },
    {
      name: 'Trần Thị B',
      revenue: 165000000,
      avatar:
        'https://scontent.fvii2-1.fna.fbcdn.net/v/t39.30808-6/468868375_884381627233134_8363385279171570940_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFEuKWSwVqLCci-HE2u6W5xUDle_CjN5yJQOV78KM3nInrOY73Ll8-r6ju8ClFHF0VwDSA09q46Kncw1qsrqmtG&_nc_ohc=RHPYeDQ3e80Q7kNvgEFui6B&_nc_oc=AdhhPJ6VmngwV3Yi-uUd8rNn2gFPaF7hu3t2J0IqVIakOEP9Dg8IOuyuW-07x7mge7o&_nc_zt=23&_nc_ht=scontent.fvii2-1.fna&_nc_gid=A65emroK-I54eMkctIAtLvU&oh=00_AYBNxPb-PbJ-CWyGhamREALKzLyfeoXJ_HIuKCtJs16aUw&oe=67AFFC17',
    },
    {
      name: 'Lê Văn C',
      revenue: 150000000,
      avatar:
        'data:image/jpeg;base64,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',
    },
  ];

  recentOrders = [
    {
      id: '1234',
      customer: 'Nguyễn Văn X',
      amount: 2500000,
      status: 'completed',
      statusText: 'Hoàn thành',
    },
    {
      id: '1235',
      customer: 'Trần Thị Y',
      amount: 1800000,
      status: 'pending',
      statusText: 'Chờ xử lý',
    },
    {
      id: '1236',
      customer: 'Lê Văn Z',
      amount: 3200000,
      status: 'processing',
      statusText: 'Đang xử lý',
    },
  ];

  highValueOrders = [
    {
      id: '1240',
      customer: 'Công ty ABC',
      amount: 15000000,
      date: new Date(),
      items: 12,
      status: 'completed',
      statusText: 'Hoàn thành',
    },
    // Add more orders...
  ];

  revenueChartOptions: Highcharts.Options = {
    chart: {
      type: 'area',
      height: 350,
      width: 500,
      style: {
        fontFamily: '"Inter", sans-serif',
      },
    },
    title: { text: undefined },
    xAxis: {
      categories: [
        'T1',
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'T8',
        'T9',
        'T10',
        'T11',
        'T12',
      ],
      lineColor: '#e5e7eb',
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    yAxis: {
      title: { text: undefined },
      width: 200,
      gridLineColor: '#e5e7eb',
      labels: {
        style: {
          color: '#6b7280',
        },
      },
    },
    series: [
      {
        name: 'Doanh Thu',
        type: 'area',
        data: [43, 51, 62, 45, 55, 70, 65, 75, 80, 85, 90, 100].map(
          (x) => x * 1000000
        ),
        color: '#4f46e5',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'rgba(79, 70, 229, 0.2)'],
            [1, 'rgba(79, 70, 229, 0)'],
          ],
        },
      },
    ],
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderRadius: 8,
      style: {
        color: '#111827',
      },
    },
    credits: { enabled: false },
    legend: { enabled: false },
  };

  ordersChartOptions: Highcharts.Options = {
    chart: { type: 'column', width: 500 },
    title: { text: undefined },
    xAxis: {
      categories: [
        'T1',
        'T2',
        'T3',
        'T4',
        'T5',
        'T6',
        'T7',
        'T8',
        'T9',
        'T10',
        'T11',
        'T12',
      ],
    },
    yAxis: {
      title: { text: 'Số Đơn Hàng' },
    },
    series: [
      {
        name: 'Đơn Hàng',
        type: 'column',
        data: [150, 180, 200, 170, 190, 220, 210, 240, 250, 260, 270, 300],
        color: '#10b981',
      },
    ],
    credits: { enabled: false },
  };

  productsChartOptions: Highcharts.Options = {
    chart: { type: 'pie', width: 300 },
    title: { text: undefined },

    series: [
      {
        name: 'Số Lượng',
        type: 'pie',
        data: [
          ['Áo Thun Basic', 30],
          ['Áo Sơ Mi', 25],
          ['Áo Khoác', 20],
          ['Áo Polo', 15],
          ['Khác', 10],
        ],
      },
    ],
    credits: { enabled: false },
  };

  getChangeClass(change: number): string {
    return change >= 0 ? 'change-up' : 'change-down';
  }

  ngOnInit() {
    // Initialize data or call APIs here
  }
}
