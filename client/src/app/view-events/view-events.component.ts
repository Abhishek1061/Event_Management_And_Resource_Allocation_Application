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

  //   itemForm!:FormGroup;
  //   formModel:any={status:null};
  //   showError:boolean=false;
  //   errorMessage:any;
  //   eventObj:any=[];
  //   assignModel: any={};
  //   showMessage: any;
  //   responseMessage: any;
  //   isUpdate: any=false;

  //   constructor(private httpService:HttpService,private formBuilder:FormBuilder,
  //     private router:Router,private authService: AuthService ){
  //       this.itemForm = this.formBuilder.group({
  //         title: ["", [Validators.required]],
  //         description: ["", [Validators.required]],
  //         dateTime: ["", [Validators.required]],
  //         location: ["", [Validators.required]],
  //         status: ["", [Validators.required]],
  //       });
  //     }

  //   ngOnInit(): void {
  //     // this.searchEvent();

  //   }

  //   onSubmit() {
  //     // if(this.itemForm.invalid){
  //     //   this.httpService.updateEvent(this.itemForm.value.eventId,this.itemForm.value.details).subscribe((res)=>{
  //     //     this.router.navigateByUrl(`booking-details`);
  //     //   });
  //     // }
  //   }


  //   // GetEventdetails(eventId:any){
  // //     this.event$ = this.httpservice.GetEventdetails(eventId);
  // //      this.filteredEvent$ = this.event$;
  // //      if(this.filteredEvent$){
  // //      this.filteredEvent$.pipe(toArray());
  // //      let eventArray;
  // //      this.filteredEvent$.subscribe(eve => {
  // //      eventArray = eve;
  // //      if (eventArray) {
  // //       const Array = JSON.stringify(eventArray);
  // //       localStorage.setItem('EventData', Array);
  // //     }
  // //  });
  // //      }
  //   // }

  //   searchEvent() {
  //     // if (this.formModel.eventID) {
  //     //   this.httpService.getEventDetails(this.formModel.eventID).subscribe(
  //     //     data => {
  //     //       this.eventObj = data;
  //     //     },
  //     //     error => {
  //     //       this.errorMessage = error;
  //     //       this.showError = true;
  //     //       // console.log('Error:', error);
  //     //     }
  //     //   );
  //     // }
  //   }

  //   // searchEvent() {

  //     // const searchT =  this.formModel.value;
  //     // if(!searchT){
  //     //   this.e
  //     // }
  //     // const searchTerm =  this.formModel.eventId;
  //     // if (!searchTerm) {
  //     //   this.eventObj = this.httpService.updateEvent();
  //     //   return;
  //     // }
  //     // // this.eventObj = this.httpService..pipe(
  //     //   map((events) => events.filter((event) =>
  //     //         event.eventId.toString().includes(searchTerm)
  //     //     )),
  //     //     catchError((error) => {
  //     //       this.showError = true;
  //     //       this.errorMessage = error.message;
  //     //       return throwError(error);
  //     //     }));
  //   // }

  //   }



  itemForm!: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  eventObj: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  isUpdate: any = false;

  constructor(private httpService: HttpService, private formBuilder: FormBuilder,
    private router: Router, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      dateTime: ["", [Validators.required]],
      location: ["", [Validators.required]],
      status: ["", [Validators.required]],
    });
  }

  ngOnInit(): void { }

  searchEvent() {
    const searchTerm = this.formModel.eventId;
    if (searchTerm) {
      this.httpService.GetEventdetails(searchTerm).subscribe(data => {
        this.eventObj = data;
      },
        error => {
          this.errorMessage = error;
          this.showError = true;
        });
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.updateEvent(this.itemForm.value.eventId, this.itemForm.value.details).subscribe(
        response => {
          this.isUpdate = true;
          this.formModel.reset();
          this.responseMessage = 'Event updated successfully.';
          this.showMessage(this.responseMessage);
        },
        error => {
          this.showError = true;
          this.errorMessage = 'An error occurred while updating the event.';
          this.showMessage(this.errorMessage);
        });
    } else {
      // If the form is not valid
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