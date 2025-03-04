import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Customer } from '../../../model/customer.model';
import { Subject } from 'rxjs';
import { CustomerService } from '../../services/Custommer.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-select.component.html',
  styleUrl: './customer-select.component.scss',
})
export class CustomerSelectComponent implements OnInit {
  @Input() selectedCustomer: Customer | null = null;
  @Output() customerSelected = new EventEmitter<Customer>();

  searchTerm: string = '';
  customers: Customer[] = [];
  showDropdown: boolean = false;
  isLoading: boolean = false;
  private searchSubject = new Subject<string>();

  constructor(private customerService: CustomerService) {
    this.setupSearch();
  }

  ngOnInit() {
    this.loadInitialCustomers();
  }

  private setupSearch() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.isLoading = true;
          return this.customerService.searchCustomers(term);
        })
      )
      .subscribe({
        next: (result) => {
          this.customers = result;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error searching customers:', error);
          this.isLoading = false;
        },
      });
  }

  private loadInitialCustomers() {
    this.isLoading = true;
    this.customerService.getRecentCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.isLoading = false;
      },
    });
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerm = term;
    this.searchSubject.next(term);
  }

  onCustomerSelect(customer: Customer) {
    this.selectedCustomer = customer;
    this.customerSelected.emit(customer);
    this.showDropdown = false;
  }

  createNewCustomer() {
    // Implement logic to open new customer modal/form
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.loadInitialCustomers();
    }
  }
}
