import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainService {
  private apiUrl = 'http://localhost:5212/api/trainprocess/search-train'; // FIXED URL

  constructor(private http: HttpClient) {}

  getTrains(source: string, destination: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${source}/${destination}/${date}`);
  }
}
