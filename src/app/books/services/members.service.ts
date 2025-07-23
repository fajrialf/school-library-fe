import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environtments/environtment';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public list(term: string = '') {
    return this.http.get<Book[]>(`${this.baseUrl}/books`, {
      params: { term },
    });
  }

  public create(payload: Book) {
    return this.http.post<Book[]>(`${this.baseUrl}/books`, payload);
  }

  public get(BookId: number) {
    return this.http.get<Book[]>(`${this.baseUrl}/books/${BookId}`);
  }

  public update(BookId: number, payload: Book) {
    return this.http.put<Book[]>(`${this.baseUrl}/books/${BookId}`, payload);
  }

  public delete(BookId: number) {
    return this.http.delete(`${this.baseUrl}/books/${BookId}`);
  }
}
