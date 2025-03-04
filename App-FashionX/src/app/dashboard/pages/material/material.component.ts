import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  url_image: string;
  status: boolean;
  created_at: string;
}
@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss',
})
export class MaterialComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      code: 'SHOE001',
      name: 'Nike Air Max',
      description: 'Giày thể thao cao cấp',
      url_image:
        'https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/gumac3/latf0119/1-tim-latf0119.png',
      status: true,
      created_at: '2024-02-07',
    },
    {
      id: 1,
      code: 'SHOE001',
      name: 'Nike Air Max',
      description: 'Giày thể thao cao cấp',
      url_image:
        'https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/gumac3/latf0119/1-tim-latf0119.png',
      status: true,
      created_at: '2024-02-07',
    },
  ];

  searchTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    // Load products
  }

  addProduct(): void {
    // Add product logic
  }

  editProduct(id: number): void {
    // Edit product logic
  }

  deleteProduct(id: number): void {
    // Delete product logic
  }

  searchProducts(): void {
    // Search logic
  }
}
