import { Component } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {
  searchTerm = '';

  constructor(private searchService: SearchService) {}

  searchWeb(): void {
    if (this.searchTerm === '') return;

    this.searchService.getResults(this.searchTerm).subscribe(
      (response: any) => {
        console.log('data is', response);
        this.searchService.passResults({
          results: response.value,
          count: response.totalCount,
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  handleEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.searchWeb();
    }
  }
}
