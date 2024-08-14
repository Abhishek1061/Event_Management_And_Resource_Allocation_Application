import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
  
  
  formModel: any = {status: null};
  showError: boolean = false;
  errorMessage: any;
  eventObj: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  isUpdate: any = false;
constructor(private httpService:HttpService,private router:Router,private formBuilder:FormBuilder,private authService:AuthService)
{

}
  ngOnInit(): void {
    
  }
  getBookings() {
     this.eventObj = this.httpService.getBookingDetails(this.formModel.eventID);
    }
  searchEvent(event:any)
  {
    const searchTerm=event.target.value.trim();
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
}

//   constructor(
//     private httpService: HttpService,
//     private router: ActivatedRoute,
//     private authService: AuthService,
//     private formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.router.params.subscribe(data=>
//       {
//         const id=data['id'];
//         this.getBookingDetails(id);
//       })
    
//   }
//   getBookingDetails(id:any)
//   {
//     this.eventObj=this.httpService.getBookingDetails(id);
//   }
// }

  // getBookings() {
  //   this.booking$ = this.httpService.getBookingDetails(this.formModel.eventID);
  //   this.filteredBooking$ = this.booking$;
  //   if (this.filteredBooking$) {
  //     this.filteredBooking$.pipe(toArray());
  //     let bookingArray;
  //     this.filteredBooking$.subscribe(booking => {
  //       bookingArray = booking;
  //       if (bookingArray) {
  //         const Array = JSON.stringify(bookingArray);
  //         localStorage.setItem('BookingData', Array);
  //       }
  //     });
  //   }
  // }

  // searchBooking(event: any) {
  //   const searchTerm = event.target.value.trim();
  //   if (!searchTerm) {
  //     this.filteredBooking$ = this.booking$;
  //     return;
  //   }
  //   this.filteredBooking$ = this.booking$.pipe(
  //     map((events) => {
  //       return events.filter((event: { eventID: { toString: () => string | any[]; }; }) => event.eventID.toString().includes(searchTerm));
  //     })
  //   );
  // }


