import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;

  usernamePattern = '^[a-z]+$';
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$';

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['',[ Validators.required,  Validators.pattern(this.usernamePattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });
  }

  ngOnInit(): void {
    // No specific actions are taken here.
  }

  onLogin() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.Login(this.itemForm.value).subscribe(
        (data : any)=> {
          this.authService.setRole(data.role);
          this.authService.saveToken(data.token);
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('dashboard').then(() => {
            window.location.reload();
          });
        },
        error => {
          if (error.status === 401) {
            this.showError = true;
            this.errorMessage = 'Incorrect username or password.';
          } else {
            this.showError = true;
            this.errorMessage = 'An error occurred during the request.';
          }
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Form is not valid.';
      this.itemForm.markAllAsTouched();
    }
  }

  registration() {
    this.router.navigate(['/registration']);
  }
}

