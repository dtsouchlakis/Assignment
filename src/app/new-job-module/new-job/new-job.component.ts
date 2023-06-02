import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../core/services/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
})
export class NewJobComponent {
  jobForm: FormGroup;
  today: string;
  constructor(
    private appService: AppService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    let currentDate = new Date();
    this.today =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.jobForm = new FormGroup({
      job_number: new FormControl('', [
        Validators.pattern(/^\d{3}-[A-Z]{3}$/),
        Validators.required,
      ]),
      job_title: new FormControl('', Validators.required),
      job_start_date: new FormControl(this.today, Validators.required),
      job_close_date: new FormControl(''),
      experience_required: new FormControl(false),
      number_of_openings: new FormControl(1, [
        Validators.required,
        Validators.min(0),
      ]),
      job_notes: new FormControl('', Validators.maxLength(1000)),
    });
  }
  onSubmit(): void {
    if (this.jobForm.valid) {
      this.appService.addJob(this.jobForm.value).subscribe(
        (data) => {
          this.snackBar.open('Job added successfully', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
            verticalPosition: 'top',
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Server error', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
          });
        }
      );
    } else {
      Object.keys(this.jobForm.controls).forEach((field) => {
        const control = this.jobForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/']);
  }
}
