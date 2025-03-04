import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router'; // Đảm bảo RouterModule được import
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Cung cấp routing
    RouterModule, // Cung cấp RouterModule để Angular nhận diện routerLink
    provideClientHydration(),
    provideHttpClient(), // Thêm dòng này
  ],
};
