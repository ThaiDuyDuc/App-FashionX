import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Đóng', {
      duration,
      panelClass: ['success-snackbar'],
    });
  }

  error(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Đóng', {
      duration,
      panelClass: ['error-snackbar'],
    });
  }

  warning(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Đóng', {
      duration,
      panelClass: ['warning-snackbar'],
    });
  }

  info(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Đóng', {
      duration,
      panelClass: ['info-snackbar'],
    });
  }
}
