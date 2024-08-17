// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-event',
//   templateUrl: './create-event.component.html',
//   styleUrls: ['./create-event.component.scss']
// })
// export class CreateEventComponent implements OnInit {
//   itemForm: FormGroup;
//   formModel: any = { status: null };
//   showError: boolean = false;
//   errorMessage: any;
//   eventList: any[] = [];
//   showMessage: boolean = false;
//   responseMessage: string = '';
//   minDate: string;

//   constructor(
//     private router: Router,
//     private httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private authService: AuthService
//   ) {

//     this.minDate = this.getTomorrowDate();

//     this.itemForm = this.formBuilder.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       dateTime: ['', [Validators.required, this.dateTimeValidator.bind(this)]],
//       location: ['', Validators.required],
//       status: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {

//     this.getEvents();
//   }

//   dateTimeValidator(control: AbstractControl): ValidationErrors | null {
//     const selectedDate = new Date(control.value);
//     const tomorrow = new Date(this.minDate);

//     if (isNaN(selectedDate.getTime())) {
//       return { invalidDate: true };
//     }

//     if (selectedDate < tomorrow) {
//       return { dateInPast: true };
//     }

//     return null;
//   }

//   getEvents() {
//     this.httpService.GetAllevents().subscribe(
//       data => {
//         this.eventList = data;
//       },
//       error => {
//         this.errorMessage = error.message || 'Failed to load events';
//         this.showError = true;
//       }
//     );
//   }

//   deleteEvent(eventId:  any){
//     this.httpService.deleteEventDetailsByID(eventId).subscribe(
//       data => {
//         this.getEvents();
//       },
//       error => {
//         this.errorMessage = error.message || 'Failed to delete event';
//         this.showError = true;
//       }
//     );
//   }



//   onSubmit() {
//     if (this.itemForm.valid) {
//       this.httpService.createEvent(this.itemForm.value).subscribe(
//         data => {
//           alert('Event created successfully');
//           console.log('Event created:', data);
//           this.responseMessage = data;
//           this.showMessage = true;
//           this.itemForm.reset();
//           this.getEvents();
//         },
//         error => {
//           this.errorMessage = error;
//           this.showError = true;
//         }
//       );
//     } else {
//       this.markFormGroupTouched(this.itemForm);
//     }
//   }

//   private getTomorrowDate(): string {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     tomorrow.setHours(0, 0, 0, 0);
//     return tomorrow.toISOString().slice(0, 16);
//   }

//   private markFormGroupTouched(formGroup: FormGroup) {
//     Object.values(formGroup.controls).forEach(control => {
//       control.markAsTouched();
//       if (control instanceof FormGroup) {
//         this.markFormGroupTouched(control);
//       }
//     });
//   }

// }






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
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventList: any[] = [];
  showMessage: boolean = false;
  responseMessage: string = '';
  minDate: string;



  eventObj: any;
  isUpdate: boolean = false;
  
  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {

    this.minDate = this.getTomorrowDate();

    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', [Validators.required, this.dateTimeValidator.bind(this)]],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.getEvents();
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
      this.httpService.createEvent(this.itemForm.value).subscribe(
        data => {
          alert('Event created successfully');
          console.log('Event created:', data);
          this.responseMessage = data;
          this.showMessage = true;
          this.itemForm.reset();
          this.getEvents();
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
        }
      );
    } else {
      this.markFormGroupTouched(this.itemForm);
    }
  }

  private getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16);
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