import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/environement';
import { ProprietyDropDown } from '../models/propriety-dropdown.model';

@Injectable({
  providedIn: 'root'
})
export class ProprietyDropDownService {
  private apiUrl = API_BASE_URL + "/pdp";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProprietyDropDown[]> {
    return this.http.get<ProprietyDropDown[]>(this.apiUrl);
  }

  getById(id: number): Observable<ProprietyDropDown> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ProprietyDropDown>(url);
  }

  create(proprietyDropDown: ProprietyDropDown): Observable<ProprietyDropDown> {
    return this.http.post<ProprietyDropDown>(this.apiUrl, proprietyDropDown);
  }

  update(proprietyDropDown: ProprietyDropDown): Observable<void> {
    const url = `${this.apiUrl}/${proprietyDropDown.id}`;
    return this.http.put<void>(url, proprietyDropDown);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
