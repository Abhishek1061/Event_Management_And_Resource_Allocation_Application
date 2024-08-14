import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventObj: any[] = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  isUpdate: any = false;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder,
    private router: Router, private authService: AuthService) {
      this.getAllEvents();
  }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      eventId: ['', Validators.required],
      details: ['', Validators.required],
      dateTime: ['', Validators.required]
    });
    
  }

  getAllEvents() {
    this.httpService.GetAllevents().subscribe(
      data => {
        this.eventObj = data;
      },
      error => {
        this.errorMessage = error.message || 'Failed to load events';
        this.showError = true;
      }
    );
  }

  searchEvent(event: any) {
    const searchTerm = event.target.value.trim();
    if (!searchTerm) {
      this
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.updateEvent(this.itemForm.value.eventId, this.itemForm.value.details).subscribe(
        response => {
          this.isUpdate = true;
          this.itemForm.reset();
          this.responseMessage = 'Event updated successfully.';
          this.showMessage(this.responseMessage);
        },
        error => {
          this.showError = true;
          this.errorMessage = 'An error occurred while updating the event.';
          this.showMessage(this.errorMessage);
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please correct the errors in the form.';
    }
  }

  edit(val: any) {
    this.itemForm.patchValue(val);
    this.itemForm.controls['dateTime'].setValue(new Date(val.dateTime).toISOString().substring(0, 16));
    this.isUpdate = true;
  }
}
