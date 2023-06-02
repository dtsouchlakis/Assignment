import { Injectable } from '@angular/core';
import { Job } from '../models/job';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http
      .get<Job[]>(this.apiUrl + 'jobs')
      .pipe(catchError(this.handleError));
  }
  addJob(job: Job): Observable<Job> {
    return this.http
      .post<Job>(this.apiUrl + 'jobs', job)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<any> {
    console.error('Server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
  getJob(id: number): Observable<Job> {
    return this.http
      .get<Job>(this.apiUrl + 'jobs/' + id)
      .pipe(catchError(this.handleError));
  }
  updateJob(job: Job, id: number): Observable<Job> {
    return this.http
      .put<Job>(this.apiUrl + 'jobs/' + id, job)
      .pipe(catchError(this.handleError));
  }
  deleteJob(id: number): Observable<Job> {
    return this.http
      .delete<Job>(this.apiUrl + 'jobs/' + id)
      .pipe(catchError(this.handleError));
  }
}
