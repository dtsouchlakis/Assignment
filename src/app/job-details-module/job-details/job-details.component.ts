import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../core/services/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
})
export class JobDetailsComponent {
  jobForm: FormGroup;
  today: string;
  id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private _snackBar: MatSnackBar
  ) {
    this.id = this.route.snapshot.params['id'];
    let currentDate = new Date();
    this.today =
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2);

    this.jobForm = new FormGroup({
      job_number: new FormControl('', [
        Validators.pattern(/^\d{3}-[A-Z]{3}$/i),
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
  ngOnInit(): void {
    const jobId = this.route.snapshot.params['id'];
    this.appService.getJob(jobId).subscribe(
      (data) => {
        this.jobForm.patchValue(data);
      },
      (error) => {
        console.error(error);

        this._snackBar.open('Server error', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    );
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      console.log(this.jobForm.value);
      this.appService.updateJob(this.jobForm.value, this.id).subscribe(
        (data) => {
          this.jobForm.reset();
          this._snackBar.open('Job updated successfully', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.error(error);
          this._snackBar.open('Server error', 'Close', {
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
  delete(): void {
    this.appService.deleteJob(this.id).subscribe(
      (data) => {
        this._snackBar.open('Job deleted successfully', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
        this._snackBar.open('Server error', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
    );
  }
}
