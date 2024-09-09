import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FaqService {

  constructor(private http: HttpClient) { }

  createDbAndCollection(dbName: string, collectionName: string): Observable<any> 
  {
    return this.http.post('http://localhost:8887/createDbAndCollection', { dbName, collectionName });
  }

  addFaq(faq: any): Observable<any> 
  {
    return this.http.post('http://localhost:8887/addFaq', faq);
  }

  getFaqs(): Observable<any> 
  {
    return this.http.get('http://localhost:8887/getFaqs');
  }

  updateFaq(id: string, faqData: any): Observable<any> 
  {
    return this.http.put(`http://localhost:8887/update/${id}`, faqData);
  }

  deleteFaq(id: string): Observable<any> 
  {
    return this.http.delete(`http://localhost:8887/delete/${id}`);
  }

  clearFaqs(): Observable<any> 
  {
    return this.http.delete('http://localhost:8887/deleteAll');
  }
}