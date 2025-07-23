import { Component, OnInit } from '@angular/core';
import { Book } from './model/book.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BooksService } from './services/members.service';

@Component({
  selector: 'app-books',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent implements OnInit {
  books: Book[] | undefined;

  bookForm!: FormGroup;
  edit = false;
  editId!: number;
  constructor(private readonly bookService: BooksService) {}
  ngOnInit(): void {
    this.buildForm();
    this.fetchData();
  }

  fetchData() {
    this.bookService.list().subscribe((res) => {
      this.books = res;
    });
  }

  buildForm(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      synopsis: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      publisher: new FormControl(null, [Validators.required]),
      releaseAt: new FormControl(null, [Validators.required]),
    });
  }

  editForm(val: boolean) {
    this.edit = val;
    this.bookForm.reset();
  }

  submit() {
    if (this.editId) {
      this.bookService
        .update(this.editId, this.bookForm.value)
        .subscribe(() => {
          this.bookForm.reset();
          this.edit = false;
          this.fetchData();
        });
    } else {
      this.bookService.create(this.bookForm.value).subscribe(() => {
        this.bookForm.reset();
        this.edit = false;
        this.fetchData();
      });
    }
  }

  delete(id: number) {
    this.bookService.delete(id).subscribe(() => {
      this.fetchData();
    });
  }

  editMode(id: number) {
    this.bookService.get(id).subscribe((res) => {
      this.edit = true;
      this.bookForm.patchValue(res);
      this.editId = id;
    });
  }
}
