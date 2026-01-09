import {Component, EventEmitter, Input, OnInit, Output, signal} from '@angular/core';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-page-size-dropdown',
    imports: [
        NgbDropdown,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle
    ],
  templateUrl: './page-size-dropdown.html',
  styleUrl: './page-size-dropdown.css',
})
export class PageSizeDropdown implements OnInit{
  @Input() pageOptions = signal<Array<number>>(environment.PAGE_SIZE_OPTIONS);
  @Output() onSelect = new EventEmitter<number>();

  @Input() selectedPageSize: number | undefined | null = null;

  ngOnInit() {
    if (this.selectedPageSize === undefined)
      this.selectedPageSize = environment.DEFAULT_PAGE_SIZE;
  }

  select(pageSize: number){
    this.selectedPageSize = pageSize;
    this.onSelect.emit(pageSize);
  }
}
