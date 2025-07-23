import { Routes } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { BooksComponent } from './books/books.component';
import { RentsComponent } from './rents/rents.component';

export const routes: Routes = [
  {
    path: '',
    component: MembersComponent,
  },
  {
    path: 'books',
    component: BooksComponent,
  },
  {
    path: 'rents',
    component: RentsComponent,
  },
];
