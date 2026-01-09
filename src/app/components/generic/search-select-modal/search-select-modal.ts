import {Component, computed, EventEmitter, inject, Input, OnInit, Output, signal, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {SearchResult, SearchResults} from '../../../common/interfaces/search-result';
import {ISearchService} from '../../../services/interfaces/isearch-service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, Subject} from 'rxjs';
import { PaginatedResult } from '../../../common/classes/paginated-result';
import {PageSizeDropdown} from '../page-size-dropdown/page-size-dropdown';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-search-select-modal',
  imports: [
    ReactiveFormsModule,
    NgbPagination,
    PageSizeDropdown
  ],
  templateUrl: './search-select-modal.html',
  styleUrl: './search-select-modal.css',
})
export class SearchSelectModal<T> implements OnInit{

  @Input() title: string = "";
  @Input() searchService?: ISearchService<T>;

  @Output() onSelected = new EventEmitter<T>();

  searchString = signal("");
  searchResultPage = signal<PaginatedResult<SearchResult<T>> | undefined>(undefined)
  searchResults = computed( () => this.searchResultPage()?.results || [] );

  page = signal(1);
  pageSize = signal(environment.DEFAULT_PAGE_SIZE);

  modalRef?: NgbModalRef;
  private searchSubject = new Subject<string>();

  @ViewChild("content") modal: NgbModal | undefined;

  protected modalService = inject(NgbModal);

  constructor() {
    this.searchSubject.pipe(debounceTime(250)).subscribe(
      (query) => this.search(query)
    )
  }

  ngOnInit() {

  }

  open(){
    this.modalRef = this.modalService.open(this.modal);
  }

  select(sr: SearchResult<T>){
    this.onSelected.emit(sr.data);
    this.modalRef?.close();
  }

  onSearch(event: any){
    this.searchString.set(event.target.value as string);
    this.searchSubject.next(event.target.value as string);
  }

  search(text: string){
    if(this.searchService === undefined){
      return;
    }
    if(text.length == 0){
      this.searchResultPage.set(undefined);
      return;
    }
    this.searchService.searchFullText(text, {
      page: this.page(),
      page_size: this.pageSize()
    }).subscribe({
      next: (page) => {
        this.searchResultPage.set(page)
      }
    });
  }

  pageChange(event: any){
    this.page.set(event as number);
    this.search(this.searchString());
  }

  setPageSize(size: number){
    this.pageSize.set(size)
    this.pageChange(1);
  }

}
