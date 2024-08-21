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
  paginatedResources: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  isSuccess: boolean = false;
  showPopup: boolean = false;

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



  getResources() {
    this.httpService.GetAllResources().subscribe(
      (data) => {
        this.resourceList = data;
        this.totalPages = Math.ceil(this.resourceList.length / this.itemsPerPage);
        this.setPaginatedResources();
      },
      (error) => {
        this.showErrorMessage(error.message || 'Failed to load resources');
      }
    );
  }

  setPaginatedResources() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResources = this.resourceList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedResources();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedResources();
    }
  }

  getEvent() {
    this.httpService.GetAllevents().subscribe(
      data => {
        this.eventList = data;
      },
      error => {
        this.showErrorMessage(error.message || 'Failed to load events');
      }
    );
  }

  showSuccessMessage(message: string) {
    this.responseMessage = message;
    this.isSuccess = true;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000); // Message will disappear after 3 seconds
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    this.isSuccess = false;
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
    }, 3000); // Message will disappear after 3 seconds
  }


  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.allocateResources(this.itemForm.value.eventId, this.itemForm.value.resourceId, this.itemForm.value).subscribe(
        data => {
          this.showSuccessMessage(data.message);
          this.itemForm.reset();
        },
        error => {
          if (error.status === 409) {
            this.showErrorMessage(error.error.message);
          } else {
            this.showErrorMessage('An error occurred');
          }
        }
      );
    } else {
      // Form is invalid, display error messages
      this.markFormGroupTouched(this.itemForm);
    }
  }

  // Helper function to mark all controls in the form group as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
