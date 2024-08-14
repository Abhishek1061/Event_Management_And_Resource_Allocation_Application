import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventList: any[] = [];
  showMessage: boolean = false;
  responseMessage: string = '';

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Add your initialization logic here
    this.getEvents();
  }

  getEvents() {
    this.httpService.GetAllevents().subscribe(
      data => {
        this.eventList = data;
      },
      error => {
        this.errorMessage = error.message || 'Failed to load events';
        this.showError = true;
      }
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.createEvent(this.itemForm.value).subscribe(
        data => {
          // Handle success
          alert('Event created successfully')
          console.log('Event created:', data);
          this.responseMessage = data;
          this.showMessage = true;
          this.itemForm.reset();
          this.getEvents();
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          // console.log('Error:', error);
        }
      );
    }
  }
}