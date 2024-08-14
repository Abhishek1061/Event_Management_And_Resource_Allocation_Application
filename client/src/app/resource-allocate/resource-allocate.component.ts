import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resource-allocate',
  templateUrl: './resource-allocate.component.html',
  styleUrls: ['./resource-allocate.component.scss']
})
export class ResourceAllocateComponent implements OnInit {
  itemForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  resourceList: any[] = [];
  showMessage: boolean = false;
  responseMessage: string = '';
  eventList: any[] = [];

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      eventId: ['', Validators.required],
      resourceId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getResources();
    this.getEvent();
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.allocateResources(this.itemForm.value.eventId, this.itemForm.value.resourceId, this.itemForm.value).subscribe(
        data => {
          this.responseMessage = data;
          this.showMessage = true;
          this.itemForm.reset();
        },
        error => {
          if (error.status === 409) {
            this.errorMessage = error.error.message;
            this.showError = true;
          }
          // this.errorMessage = error.message || 'An error occurred';
          
        }
      );
    }
  }



  getResources() {
    this.httpService.GetAllResources().subscribe(
      data => {
        this.resourceList = data;
      },
      error => {
        this.errorMessage = error.message || 'Failed to load resources';
        this.showError = true;
      }
    );
  }

  getEvent() {
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
}
