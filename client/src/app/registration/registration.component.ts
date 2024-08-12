// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// // import { Observable, of } from 'rxjs';
// // import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';


// @Component({
//   selector: 'app-registration',
//   templateUrl: './registration.component.html',
//   styleUrls: ['./registration.component.scss']
// })
// export class RegistrationComponent implements OnInit {

//   itemForm!: FormGroup;
//   formModel: any = { role: null, email: '', password: '', username: '' };
//   showMessage: boolean = false;
//   responseMessage: any;
//   // userError$: Observable<string> | undefined; // Observable for error messages
//   // userSuccess$: Observable<string> | undefined;
//   //todo: Complete missing code..

//   usernamePattern = '^[a-z]+$';
//   passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$';

//   constructor(
//     private formBuilder: FormBuilder,
//     private bookService: HttpService,
//     private router: Router
//   ) {
//     this.itemForm = this.formBuilder.group({
//       username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
//       email: ['', [Validators.required, this.emailValidator]],
//       password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
//       role: ['', [Validators.required]],
//     });
//   }

//   ngOnInit(): void {

//   }


//   // hasSpecialCharacters(inputString:string):boolean {
//   //   // Define a regular expression for special characters
//   //   const specialCharactersRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

//   //   // Test if the inputString contains any special characters
//   //   return specialCharactersRegex.test(inputString);
//   // }

//   emailValidator(control: AbstractControl): ValidationErrors | null {
//     const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     if (!emailRegex.test(control.value)) {
//       return { invalidEmailFormat: true }
//     }
//     return null;
//   }



//   onRegister(): void {
//     if (this.itemForm.valid) {
//       this.bookService.registerUser(this.itemForm.value).subscribe(
//         data => {
//           this.showMessage = true;
//           this.responseMessage = data.message;
//           this.itemForm.reset();
//           // this.userSuccess$ = data.message;
//         },
//         error => {
//           this.showMessage = true;
//           this.responseMessage = error.message;
//           // this.userError$ =error.message;
//         }
//       );
//     } else {
//       this.itemForm.markAllAsTouched();
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;
  usernamePattern = '^[a-z]+$';
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$';

  constructor(
    private formBuilder: FormBuilder,
    private bookService: HttpService,
    private router: Router
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(control.value)) {
      return { invalidEmailFormat: true }
    }
    return null;
  }

  onRegister(): void {
    if (this.itemForm.valid) {
      this.bookService.registerUser(this.itemForm.value).subscribe(
        data => {
          this.showMessage = true;
          this.responseMessage = data.message;
          this.itemForm.reset();
        },
        error => {
          this.showMessage = true;
          this.responseMessage = error.message;
        }
      );
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}

