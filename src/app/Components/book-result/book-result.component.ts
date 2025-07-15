import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Book {
  title?: string;
  author?: string;
  extension?: string;
  filesize?: string;
  year?: string;
  description?: string;
}

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="book-card">
      <div class="book-header">
        <h3 class="book-title" [title]="book?.title || 'Untitled'">
          {{ book?.title || 'Untitled' }}
        </h3>
        <div class="book-meta">
          <span class="author" *ngIf="book?.author">
            <i class="icon-user"></i>
            {{ book?.author }}
          </span>
          <span class="year" *ngIf="book?.year">
            <i class="icon-calendar"></i>
            {{ book?.year }}
          </span>
        </div>
      </div>
      
      <div class="book-description" *ngIf="book?.description">
        <p>{{ book?.description }}</p>
      </div>
      
      <div class="book-footer">
        <div class="file-info">
          <span class="extension" *ngIf="book?.extension">
            <i class="icon-file"></i>
            {{ book?.extension?.toUpperCase() }}
          </span>
          <span class="filesize" *ngIf="book?.filesize">
            <i class="icon-download"></i>
            {{ book?.filesize }}
          </span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './book-result.component.scss'
})
export class BookResultComponent {
  @Input() book: Book|undefined;
}