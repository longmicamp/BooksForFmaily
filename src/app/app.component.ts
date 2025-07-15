import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookResultComponent } from "./Components/book-result/book-result.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

interface Book {
    title?: string;
    author?: string;
    extension?: string;
    filesize?: string;
    year?: string;
    description?: string;
}

interface ApiResponse {
    books?: Book[];
    total?: number;
    message?: string;
}
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, BookResultComponent, HttpClientModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    private isBrowser: boolean;
    isLoading: any = signal(false);
    isLoading2: boolean = false;
    bookResponse: Book[] | undefined = [];

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    async performSearch(): Promise<void> {
        this.isLoading.set(true);
        this.isLoading2 = true;

        console.log(this.isLoading())
        if (!this.isBrowser) {
            console.warn('performSearch called in non-browser environment');
            return;
        }

        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        const searchQuery: string = searchInput?.value?.trim() || '';
        // const resultsContainer = document.getElementById('search-results') as HTMLElement;

        if (!searchInput) {
            console.error('Required DOM elements not found');
            return;
        }

        if (!searchQuery) {
            alert('Please enter a search query');
            return;
        }

        // Encode the search query for URL
        const encodedQuery: string = encodeURIComponent(searchQuery);
        let response = await this.search(encodedQuery);
        this.bookResponse = response?.books;
        

        

    }

    displayResults(response: ApiResponse): void {
        if (!this.isBrowser) {
            return;
        }
        //const resultsContainer = document.getElementById('search-results') as HTMLElement;

        // if (!resultsContainer) {
        //     console.error('Results container not found');
        //     return;
        // }

        if (!response || !response.books || response.books.length === 0) {
            //resultsContainer.innerHTML = '<div class="no-results">No results found. Try a different search term.</div>';
            return;
        }

        let resultsHTML: string = '<h2 class="results-title">Search Results</h2><div class="results-list">';

        response.books.forEach((book: Book) => {
            resultsHTML += `
            <div class="result-item">
                <div class="result-content">
                    <h3 class="result-title">${book.title || 'Unknown Title'}</h3>
                    <p class="result-author">Author: ${book.author || 'Unknown Author'}</p>
                    <p class="result-details">
                        ${book.extension ? `Format: ${book.extension.toUpperCase()}` : ''}
                        ${book.filesize ? ` | Size: ${book.filesize}` : ''}
                        ${book.year ? ` | Year: ${book.year}` : ''}
                    </p>
                    ${book.description ? `<p class="result-description">${book.description.substring(0, 200)}...</p>` : ''}
                </div>
            </div>
        `;
        });

        resultsHTML += '</div>';
        //  resultsContainer.innerHTML = resultsHTML;
    }

    async search(query: string) {
        const url = `https://annas-archive-api.p.rapidapi.com/search?q=${query}&cat=fiction%2C%20nonfiction%2C%20comic%2C%20magazine%2C%20musicalscore%2C%20other%2C%20unknown&skip=0&limit=10&ext=pdf%2C%20epub%2C%20mobi%2C%20azw3&sort=mostRelevant&source=libgenLi%2C%20libgenRs`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '8c224bd4f0msh4d8cd81076a54a0p1040e1jsned97a0571965',
                'x-rapidapi-host': 'annas-archive-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result: ApiResponse = JSON.parse(await response.text());
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }


}
function displayResults(response: ApiResponse) {
    throw new Error('Function not implemented.');
}

