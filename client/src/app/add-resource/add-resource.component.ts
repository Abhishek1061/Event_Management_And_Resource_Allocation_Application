import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  itemForm!: FormGroup;
  @Output() AddResource = new EventEmitter<any>();
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  resourceList: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  paginatedEvents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.itemForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        type: ["", [Validators.required]],
        availability: ["", [Validators.required]]
      }
    );
  }
  ngOnInit(): void {
    this.getResource();
  }
  // getResource() {
  //   this.httpService.GetAllResources().subscribe(data => {
  //     this.resourceList = data
  //   });
  // }

  
  getResource() {
    this.httpService.GetAllResources().subscribe(
      (data) => {
        this.resourceList = data
        this.totalPages = Math.ceil(this.resourceList.length / this.itemsPerPage);
        this.setPaginatedEvents();
      },
      error => {
        this.showError = true;
        this.errorMessage = error.message || 'Failed to load events';
      }
    );
  }

  setPaginatedEvents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.resourceList.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.setPaginatedEvents();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedEvents();
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.addResource(this.itemForm.value).subscribe(res => {
        this.itemForm.reset();
        this.getResource();
      },
        error => {
          this.showError = true;
          this.errorMessage = error;
        });

    }

  }
}

