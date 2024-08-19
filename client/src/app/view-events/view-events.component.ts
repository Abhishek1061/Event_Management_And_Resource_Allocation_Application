import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { map, Observable, of } from 'rxjs';
 
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit {
  itemForm!: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  eventObj: any;
  showMessage: boolean = false;
  responseMessage: string = '';
  isUpdate: boolean = false;
  eventList: any[] = [];
  minDate : string;
  message: { type: 'success' | 'error', text: string } | null = null;
  searchPerformed: boolean = false;

  paginatedEvents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;
 
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.minDate = this.getTomorrowDate();
  }
 
  ngOnInit(): void {
    this.initForm();
    this.getEvents();
  }
 
  initForm(): void {
    this.itemForm = this.formBuilder.group({
      searchTerm: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', [Validators.required, this.dateTimeValidator.bind(this)]],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
 
  dateTimeValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const tomorrow = new Date(this.minDate);
   
    if (isNaN(selectedDate.getTime())) {
      return { invalidDate: true };
    }
   
    if (selectedDate < tomorrow) {
      return { dateInPast: true };
    }
   
    return null;
  }
 
  private getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
  }
  // getEvents() {
  //   this.httpService.GetEvents().subscribe(
  //     (data) => {
  //       this.eventList = data;
  //     },
  //     error => {
  //       this.showError = true;
  //       this.errorMessage = error.message || 'Failed to load events';
  //     }
  //   );
  // }

  getEvents() {
    this.httpService.GetEvents().subscribe(
      (data) => {
        this.eventList = data;
        this.totalPages = Math.ceil(this.eventList.length / this.itemsPerPage);
        this.setPaginatedEvents();
      },
      error => {
        this.showError = true;
        this.errorMessage = error.message || 'Failed to load events';
      }
    );
  }

  setPaginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.eventList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedEvents();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedEvents();
    }
  }
 
  searchEvent(): void {
    if (this.itemForm.get('searchTerm')?.valid) {
      const searchTerm = this.itemForm.get('searchTerm')?.value;
      this.httpService.GetEventdetails(searchTerm).subscribe(
        (response) => {
          this.handleSearchResponse(response),
         
          this.errorMessage = '';
          if (response.length !== 0) {
            console.log(response);
            this.eventObj = response;
            this.showMessage = true;
            this.responseMessage = 'Event found';
            this.showError = false;
            this.eventList = [response]; // Update eventList with search result
          } else {
            this.responseMessage = '';
            this.showMessage = false;
            this.showError = true;
            this.errorMessage = 'Failed to find event';
            console.error('Error searching event:', response);
          }
        },
        (error) => {
          this.handleSearchError(error)
          this.showError = true;
          this.errorMessage = 'Failed to find event';
          console.error('Error searching event:', error);
        }
      );
    } else {
      this.itemForm.get('searchTerm')?.markAsTouched();
    }
  }
 
  onSubmit() {
    if (this.itemForm.valid) {
      const eventData = this.itemForm.value;
      if (this.isUpdate && this.eventObj) {
        const updateData = {
          title: eventData.title,
          description: eventData.description,
          dateTime: eventData.dateTime,
          location: eventData.location,
          status: eventData.status
        };
        this.httpService.updateEvent(updateData, this.eventObj.eventID).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Event updated successfully.';
            this.getEvents();
            this.resetForm();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'An error occurred while updating the event: ' + error.message;
          }
        );
        // const modalElement = document.getElementById('updateModal');
        // const modal = bootstrap.Modal.getInstance(modalElement);
        // modal?.hide();
 
      } else {
 
        // Add logic for creating a new event
        this.httpService.createEvent(eventData).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Event created successfully.';
            this.getEvents();
            this.resetForm();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'An error occurred while creating the event: ' + error.message;
          }
        );
      }
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields.';
      this.itemForm.markAllAsTouched();
    }
  }
 
  edit(val: any) {
    this.isUpdate = true;
    this.eventObj = val;
    this.itemForm.patchValue({
      title: val.title,
      description: val.description,
      dateTime: new Date(val.dateTime).toISOString().slice(0, 16),
      location: val.location,
      status: val.status
    });
    // Open the modal programmatically
    // const modal = new bootstrap.Modal(document.getElementById('updateModal'));
    // modal.show();
  }
 
  filterPastEvents(): void {
    const currentDate = new Date();
    this.eventList = this.eventList.filter(event => new Date(event.dateTime) < currentDate);
  }
 
  filterTodayEvents(): void {
    const currentDate = new Date();
    this.eventList = this.eventList.filter(event => {
      const eventDate = new Date(event.dateTime);
      return eventDate.toDateString() === currentDate.toDateString();
    });
  }
 
  filterFutureEvents(): void {
    const currentDate = new Date();
    this.eventList = this.eventList.filter(event => new Date(event.dateTime) > currentDate);
  }
 
  viewAllEvents(): void {
    this.getEvents();
  }
  onFilterChange(event: any): void {
    const filterValue = event.target.value;
    switch (filterValue) {
      case 'past':
        this.filterPastEvents();
        break;
      case 'today':
        this.filterTodayEvents();
        break;
      case 'future':
        this.filterFutureEvents();
        break;
      default:
        this.viewAllEvents();
        break;
    }
  }
 
  sortByTitle(): void {
    this.eventList.sort((a, b) => a.title.localeCompare(b.title));
    this.updatePaginatedEvents();
  }
 
  sortById(): void {
    this.eventList.sort((a, b) => a.eventID - b.eventID);
    this.updatePaginatedEvents();
  }
 
  sortByDate(): void {
    this.eventList.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
    this.updatePaginatedEvents();
  }
  sortByLocation(): void {
    this.eventList.sort((a, b) => a.location.localeCompare(b.location));
    this.updatePaginatedEvents();
  }

  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.eventList.slice(startIndex, endIndex);
  }
 
  onSortChange(event: any): void {
    const sortValue = event.target.value;
    switch (sortValue) {
      case 'title':
        this.sortByTitle();
        break;
      case 'date':
        this.sortByDate();
        break;
      case 'location':
        this.sortByLocation();
        break;
      case 'id':
        this.sortById();
        break;
    }
  }
 
  private handleSearchResponse(response: any): void {
    this.searchPerformed = true;
    if (response && Object.keys(response).length !== 0) {
      this.eventObj = [response];
      this.showTemporaryMessage('success', 'Event found');
    } else {
      this.eventObj = [];
      this.showTemporaryMessage('error', 'No event found');
    }
  }
 
  private handleSearchError(error: any): void {
    this.searchPerformed = true;
    this.showTemporaryMessage('error', 'Failed to find event');
    this.eventObj = [];
    console.error('Error searching event:', error);
  }
 
  private showTemporaryMessage(type: 'success' | 'error', text: string): void {
    this.message = { type, text };
    setTimeout(() => {
      this.message = null;
    }, 5000);
  }
 
  resetForm(): void {
    this.isUpdate = false;
    this.itemForm.reset();
    this.eventObj = null;
    this.showError = false;
    this.showMessage = false;
    // const modalElement = document.getElementById('updateModal');
    // const modal = bootstrapApplication.Modal.getInstance(modalElement);
    // modal?.hide();
  }
 
}
 