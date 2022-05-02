import { Component, OnInit } from '@angular/core';
import { Book } from '../../data/books.data';
import { BooksService } from '../books.service';
import { selectBooks } from '../store/books.selectors';
import { booksRequestedAction } from '../store/books.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookModel } from '../store/books.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'authorName', 'publishYear'];

  books$: Observable<BookModel[]> = this.store.pipe(select(selectBooks))

  constructor(private booksService: BooksService,
  private store: Store) { }

  ngOnInit() {
    this.store.dispatch(booksRequestedAction());
  }

}