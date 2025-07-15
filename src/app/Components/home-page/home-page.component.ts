// import { Component } from '@angular/core';
// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Book {
//   title?: string;
//   author?: string;
//   extension?: string;
//   filesize?: string;
//   year?: string;
//   description?: string;
// }

// interface ApiResponse {
//   books?: Book[];
//   total?: number;
//   message?: string;
// }

// @Component({
//   selector: 'app-home-page',
//   standalone: true,
//   imports: [],
//   templateUrl: './home-page.component.html',
//   styleUrl: './home-page.component.scss'
// })

// export class HomePageComponent {
//     private isBrowser: boolean;

//      constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) platformId: Object
//   ) {
//     this.isBrowser = isPlatformBrowser(platformId);
//   }

//   performSearch(): void {
//     if (!this.isBrowser) {
//         console.warn('performSearch called in non-browser environment');
//         return;
//     }

//     const searchInput = document.getElementById('search-input') as HTMLInputElement;
//     const searchQuery: string = searchInput?.value?.trim() || '';
//     // const resultsContainer = document.getElementById('search-results') as HTMLElement;
    
//     if (!searchInput) {
//         console.error('Required DOM elements not found');
//         return;
//     }
    
//     if (!searchQuery) {
//         alert('Please enter a search query');
//         return;
//     }
    
//     // Show loading state
//     // resultsContainer.innerHTML = '<div class="loading">Searching...</div>';
//     // resultsContainer.style.display = 'block';
    
//     const data: null = null;
//     const xhr: XMLHttpRequest = new XMLHttpRequest();
//     xhr.withCredentials = true;
    
//     // Encode the search query for URL
//     const encodedQuery: string = encodeURIComponent(searchQuery);
//     let response = this.search(encodedQuery);

// }

// displayResults(response: ApiResponse): void {
//     if (!this.isBrowser) {
//         return;
//     }
//     //const resultsContainer = document.getElementById('search-results') as HTMLElement;
    
//     // if (!resultsContainer) {
//     //     console.error('Results container not found');
//     //     return;
//     // }
    
//     if (!response || !response.books || response.books.length === 0) {
//         //resultsContainer.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
//         return;
//     }
    
//     let resultsHTML: string = '<h2 class="results-title">Search Results</h2><div class="results-list">';
    
//     response.books.forEach((book: Book) => {
//         resultsHTML += `
//             <div class="result-item">
//                 <div class="result-content">
//                     <h3 class="result-title">${book.title || 'Unknown Title'}</h3>
//                     <p class="result-author">Author: ${book.author || 'Unknown Author'}</p>
//                     <p class="result-details">
//                         ${book.extension ? `Format: ${book.extension.toUpperCase()}` : ''}
//                         ${book.filesize ? ` | Size: ${book.filesize}` : ''}
//                         ${book.year ? ` | Year: ${book.year}` : ''}
//                     </p>
//                     ${book.description ? `<p class="result-description">${book.description.substring(0, 200)}...</p>` : ''}
//                 </div>
//             </div>
//         `;
//     });
    
//     resultsHTML += '</div>';
//   //  resultsContainer.innerHTML = resultsHTML;
// }

// search(query: string){
//      if (!this.isBrowser) {
//       throw new Error('Search can only be performed in browser environment');
//     }

//     const encodedQuery = encodeURIComponent(query);
//     const apiUrl = `https://annas-archive-api.p.rapidapi.com/search?q=${encodedQuery}&cat=fiction%2C%20nonfiction%2C%20comic%2C%20magazine%2C%20musicalscore%2C%20other%2C%20unknown&skip=0&limit=10&ext=pdf%2C%20epub%2C%20mobi%2C%20azw3&sort=mostRelevant&source=libgenLi%2C%20libgenRs`;
    
//     const headers = {
//       'x-rapidapi-key': '8c224bd4f0msh4d8cd81076a54a0p1040e1jsned97a0571965',
//       'x-rapidapi-host': 'annas-archive-api.p.rapidapi.com'
//     };

//     return this.http.get(apiUrl, { headers });
// }


// }
// function displayResults(response: ApiResponse) {
//   throw new Error('Function not implemented.');
// }

