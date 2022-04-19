import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.scss'],
})
export class AddEmployeesComponent implements OnInit {
  formData = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });
  constructor() {}

  ngOnInit() {
  }

  onRegisterEmployees(e : Event) {
   
  }
}
