// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-add-resource',
//   templateUrl: './add-resource.component.html',
//   styleUrls: ['./add-resource.component.scss']
// })
// export class AddResourceComponent implements OnInit {
  // itemForm!: FormGroup;
  // @Output() AddResource = new EventEmitter<any>();
  // formModel: any = { status: null };
  // showError: boolean = false;
  // errorMessage: any;
  // resourceList: any = [];
  // assignModel: any = {};
  // showMessage: any;
  // responseMessage: any;
  // paginatedEvents: any[] = [];
  // currentPage: number = 1;
  // itemsPerPage: number = 6;
  // totalPages: number = 1;
  // searchQuery: string = '';


  // constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  //   this.itemForm = this.formBuilder.group(
  //     {
  //       name: ["", [Validators.required]],
  //       type: ["", [Validators.required]],
  //       availability: ["", [Validators.required]]
  //     }
  //   );
  // }
  // ngOnInit(): void {
  //   this.getResource();
  // }
  // getResource() {
  //   this.httpService.GetAllResources().subscribe(data => {
  //     this.resourceList = data
  //   });
  // }

  
  // getResource() {
  //   this.httpService.GetAllResources().subscribe(
  //     (data) => {
  //       this.resourceList = data
  //       this.totalPages = Math.ceil(this.resourceList.length / this.itemsPerPage);
  //       this.setPaginatedEvents();
  //     },
  //     error => {
  //       this.showError = true;
  //       this.errorMessage = error.message || 'Failed to load events';
  //     }
  //   );
  // }

  // setPaginatedEvents() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;
  //   this.paginatedEvents = this.resourceList.slice(startIndex, endIndex);
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //     this.setPaginatedEvents();
  //   }
  // }

  // previousPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //     this.setPaginatedEvents();
  //   }
  // }

  // onSubmit() {
  //   if (this.itemForm.valid) {
  //     this.httpService.addResource(this.itemForm.value).subscribe(res => {
  //       this.itemForm.reset();
  //       this.getResource();
  //     },
  //       error => {
  //         this.showError = true;
  //         this.errorMessage = error;
  //       });

  //   }

  // }

  // onSubmit() {
  //   if (this.itemForm.valid) {
  //     this.httpService.addResource(this.itemForm.value).subscribe(
  //       (data) => {
  //         console.log('Resource added:', data);
  //         this.itemForm.reset({ availability: true });
  //         this.getResources();
  //       },
  //       (error) => {
  //         this.showError = true;
  //         this.errorMessage = 'Failed to add resource: ' + error.message;
  //       }
  //     );
  //   } else {
  //     this.markFormGroupTouched(this.itemForm);
  //   }
  // }

// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  itemForm: FormGroup;
  resourceList: any[] = [];
  paginatedResources: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  showError: boolean = false;
  errorMessage: string = '';
  showSuccess: boolean = false;
  successMessage: string = '';
  searchQuery: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService
  ) {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      availability: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getResources();
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.addResource(this.itemForm.value).subscribe(
        (data) => {
          console.log('Resource added:', data);
          this.showSuccessMessage('Resource added successfully!');
          this.itemForm.reset({ availability: true });
          this.getResources();
        },
        (error) => {
          this.showErrorMessage('Failed to add resource: ' + error.message);
        }
      );
    } else {
      this.markFormGroupTouched(this.itemForm);
      this.showErrorMessage('Please fill in all required fields.');
    }
  }

  getResources() {
    this.httpService.GetAllResources().subscribe(
      (data) => {
        this.resourceList = data;
        this.totalPages = Math.ceil(this.resourceList.length / this.itemsPerPage);
        this.setPaginatedResources();
      },
      (error) => {
        this.showErrorMessage('Failed to load resources: ' + error.message);
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

  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.setPaginatedResources();
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.paginatedResources = this.resourceList.filter(resource => 
      resource.resourceID.toString().includes(query) || 
      resource.name.toLowerCase().includes(query)
    );
    
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.paginatedResources.length / this.itemsPerPage);
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showSuccessMessage(message: string) {
    this.showSuccess = true;
    this.successMessage = message;
    setTimeout(() => {
      this.showSuccess = false;
      this.successMessage = '';
    }, 3000); // Message disappears after 3 seconds
  }

  private showErrorMessage(message: string) {
    this.showError = true;
    this.errorMessage = message;
    setTimeout(() => {
      this.showError = false;
      this.errorMessage = '';
    }, 3000); // Message disappears after 3 seconds
  }
}