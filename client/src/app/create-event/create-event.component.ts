import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventList: any[] = [];
  showMessage: boolean = false;
  responseMessage: string = '';
  minDate: string;
  eventObj: any;
  isUpdate: boolean = false;
  paginatedEvents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 1;


  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

    this.minDate = this.getTomorrowDate();
  }
  ngOnInit(): void {
    this.searchQuery = '';
    this.getEvents();
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', [Validators.required, this.dateTimeValidator.bind(this)]],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  
    this.searchQuery = '';
    this.getEvents();
  }

  dateTimeValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight
  
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
    return tomorrow.toISOString().slice(0, 16);
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.getEvents(); // Reset to show all events
      return;
    }
  
    const query = this.searchQuery.trim().toLowerCase();
    if (!isNaN(Number(query))) {
      // Search by ID
      this.searchById(Number(query));
    } else {
      // Search by title
      this.searchByTitle(query);
    }
  }
  
  searchById(id: number) {
    this.httpService.getEventById(id).subscribe(
      (data) => {
        this.searchResults = data ? [data] : [];
        this.updatePagination(this.searchResults);
      },
      (error) => {
        console.error('Error searching by ID:', error);
        this.searchResults = [];
        this.updatePagination(this.searchResults);
      }
    );
  }
  
  searchByTitle(title: string) {
    this.httpService.getEventsByTitle(title).subscribe(
      (data) => {
        this.searchResults = data;
        this.updatePagination(this.searchResults);
      },
      (error) => {
        console.error('Error searching by title:', error);
        this.searchResults = [];
        this.updatePagination(this.searchResults);
      }
    );
  }
  
  updatePagination(results: any[]) {
    this.eventList = results;
    this.totalPages = Math.ceil(this.eventList.length / this.itemsPerPage);
    this.currentPage = 1;
    this.setPaginatedEvents();
  }



  getEvents() {
    if (this.searchResults.length > 0) {
      this.eventList = this.searchResults;
      this.totalPages = Math.ceil(this.eventList.length / this.itemsPerPage);
      this.setPaginatedEvents();
    } else {
      this.httpService.GetAllevents().subscribe(
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

  deleteEvent(eventId: any) {
    this.httpService.deleteEventDetailsByID(eventId).subscribe(
      data => {
        this.getEvents();
      },
      error => {
        this.errorMessage = error.message || 'Failed to delete event';
        this.showError = true;
      }
    );
  }



  onSubmit() {
    if (this.itemForm.valid) {
      const formData = { ...this.itemForm.value };
      formData.dateTime = new Date(formData.dateTime).toISOString();
      this.httpService.createEvent(formData).subscribe(
        data => {
          this.responseMessage = 'Event created successfully';
          this.showMessage = true;
          this.itemForm.reset();
          this.getEvents();
          this.autoCloseAlert();
        },
        error => {
          this.errorMessage = 'An error occurred: ' + error;
          this.showError = true;
          this.autoCloseAlert();
        }
      );
    } else {
      this.markFormGroupTouched(this.itemForm);
    }
  }
  
  autoCloseAlert() {
    setTimeout(() => {
      this.closeAlert();
    }, 5000); // Auto close after 5 seconds
  }
  closeAlert() {
    this.showMessage = false;
    this.showError = false;
  }
  

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  onUpdate() {
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

  }

  resetForm(): void {
    this.isUpdate = false;
    this.itemForm.reset();
    this.eventObj = null;
    this.showError = false;
    this.showMessage = false;

  }
}