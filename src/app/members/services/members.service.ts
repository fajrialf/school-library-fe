import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environtments/environtment';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public list(term: string = '') {
    return this.http.get<Member[]>(`${this.baseUrl}/members`, {
      params: { term },
    });
  }

  public create(payload: Member) {
    return this.http.post<Member[]>(`${this.baseUrl}/members`, payload);
  }

  public get(memberId: number) {
    return this.http.get<Member[]>(`${this.baseUrl}/members/${memberId}`);
  }

  public update(memberId: number, payload: Member) {
    return this.http.put<Member[]>(
      `${this.baseUrl}/members/${memberId}`,
      payload
    );
  }

  public delete(memberId: number) {
    return this.http.delete(`${this.baseUrl}/members/${memberId}`);
  }
}
