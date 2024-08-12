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
  getResource() {
    this.httpService.GetAllResources().subscribe(data => {
      this.resourceList = data
    });
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

