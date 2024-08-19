import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBookingDetails(eventId: any): Observable<any> {
    const url = `${this.serverName}/api/client/booking-details/${eventId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(url, { headers });
  }

  GetEventdetails(eventId: any): Observable<any> {
    const url = `${this.serverName}/api/staff/event-details/${eventId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(url, { headers });
  }

  deleteEventDetailsByID(eventId: any): Observable<any> {
    const url = `${this.serverName}/api/planner/event/${eventId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(url, { headers });
  }

  GetAllevents(): Observable<any> {
    const url = `${this.serverName}/api/planner/events`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(url, { headers });
  }

  GetEvents(): Observable<any> {
    const url = `${this.serverName}/api/staff/allEvents`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(url, { headers });
  }

  GetAlleventsForClient():Observable<any> {
    const url = `${this.serverName}/api/client/allEvents`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(url, { headers });
  }

  

  GetAllResources(): Observable<any> {
    const url = `${this.serverName}/api/planner/resources`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(url, { headers });
  }

  createEvent(details: any): Observable<any> {
    const url = `${this.serverName}/api/planner/event`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(url, details, { headers });
  }

  updateEvent(details: any, eventId: any): Observable<any> {
    const url = `${this.serverName}/api/staff/update-setup/${eventId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put(url, details, { headers });
  }

  addResource(details: any): Observable<any> {
    const url = `${this.serverName}/api/planner/resource`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(url, details, { headers });
  }

  allocateResources(eventId: any, resourceId: any, details: any): Observable<any> {
    const url = `${this.serverName}/api/planner/allocate-resources?eventId=${eventId}&resourceId=${resourceId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post(url, details, { headers });
  }

  Login(details: any): Observable<any> {
    const url = `${this.serverName}/api/user/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, details, { headers });
  }

  registerUser(details: any): Observable<any> {
    const url = `${this.serverName}/api/user/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, details, { headers });
  }

  getStatename(): Observable<any> {

    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${authToken}`)
    return this.http.get(this.serverName + `/api/state/`, { headers: headers });
  }

  // private handleError(error: any): Observable<never> {
  //   console.error(error);
  //   throw error;
  // }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.serverName}/api/user/users`, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
}
