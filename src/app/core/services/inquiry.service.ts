import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry } from '../../shared/models/product.model';

export interface InquiryListParams {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  source?: string;
  search?: string;
}

export interface InquiryListResponse {
  data: Inquiry[];
  total: number;
  page: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class InquiryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/inquiries';

  submit(inquiry: Partial<Inquiry>): Observable<{ referenceNumber: string }> {
    return this.http.post<{ referenceNumber: string }>(this.apiUrl, inquiry);
  }

  getAll(params?: InquiryListParams): Observable<InquiryListResponse> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.page != null) httpParams = httpParams.set('page', params.page);
      if (params.limit != null) httpParams = httpParams.set('limit', params.limit);
      if (params.status) httpParams = httpParams.set('status', params.status);
      if (params.category) httpParams = httpParams.set('category', params.category);
      if (params.source) httpParams = httpParams.set('source', params.source);
      if (params.search) httpParams = httpParams.set('search', params.search);
    }
    return this.http.get<InquiryListResponse>(this.apiUrl, { params: httpParams });
  }

  getById(id: string): Observable<Inquiry> {
    return this.http.get<Inquiry>(`${this.apiUrl}/${encodeURIComponent(id)}`);
  }

  updateStatus(id: string, status: Inquiry['status']): Observable<Inquiry> {
    return this.http.patch<Inquiry>(`${this.apiUrl}/${encodeURIComponent(id)}`, { status });
  }

  addNote(id: string, note: string): Observable<Inquiry> {
    return this.http.patch<Inquiry>(`${this.apiUrl}/${encodeURIComponent(id)}`, {
      internalNotes: note,
    });
  }
}
