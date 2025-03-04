import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Style } from '../../../model/style.model';
import { StyleService } from '../../services/style.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AddStyleComponent } from './../components/add-style/add-style.component';

@Component({
  selector: 'app-style',
  standalone: true,
  providers: [StyleService], // Dùng provideHttpClient()
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AddStyleComponent,
  ],
  templateUrl: './style.component.html',
  styleUrl: './style.component.scss',
})
export class StyleComponent implements OnInit {
  styles: Style[] = [];
  styleForm!: FormGroup;
  isEditing: boolean = false;
  styleId?: number;

  searchTerm: string = '';
  showModal: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private styleService: StyleService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.styleForm = this.fb.group({
      name: ['', Validators.required],
      status: [false],
    });
  }

  ngOnInit() {
    this.loadStyles();

    this.styleForm = this.fb.group({
      name: ['', Validators.required],
      status: [true],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.styleId = +id;
        this.loadStyle(this.styleId);
      }
    });
  }

  loadStyles() {
    this.styleService.getStyles().subscribe({
      next: (data) => {
        this.styles = data;
      },
      error: (error) => {
        console.error('Error loading styles:', error);
      },
    });
  }

  loadStyle(id: number) {
    this.styleService.getStyle(id).subscribe({
      next: (data) => {
        this.styleForm.patchValue(data);
      },
      error: (error) => {
        console.error('Error loading style:', error);
      },
    });
  }

  deleteStyle(style: Style) {
    if (!style.id) {
      console.error('Invalid style ID');
      return;
    }

    if (confirm('Are you sure you want to delete this style?')) {
      this.styleService.deleteStyle(style.id).subscribe({
        next: () => {
          this.loadStyles();
        },
        error: (error) => {
          console.error('Error deleting style:', error);
        },
      });
    }
  }

  onSubmit() {
    if (this.styleForm.invalid) return;
    const styleData: Partial<Style> = this.styleForm.value;
    if (this.isEditing && this.styleId) {
      this.styleService.updateStyle(this.styleId, styleData).subscribe({
        next: () => {
          alert('Style updated successfully!');
          this.router.navigate(['/styles']);
        },
        error: (error) => {
          console.error('Error updating style:', error);
        },
      });
    } else {
      this.styleService.createStyle(styleData).subscribe({
        next: () => {
          alert('Style created successfully!');
          this.router.navigate(['/styles']);
        },
        error: (error) => {
          console.error('Error creating style:', error);
        },
      });
    }
  }

  openAddModal() {
    this.isEditing = false;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editStyle(style: any) {
    this.isEditing = true;
    this.styleForm.setValue({
      name: style.name,
      status: style.status,
    });
    this.showModal = true;
  }
}
