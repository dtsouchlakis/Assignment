import { Component, OnInit } from '@angular/core';
import { Job } from '../../core/models/job';
import { AppService } from '../../core/services/app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent {
  jobs: Job[] = [];
  constructor(
    private appService: AppService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  onEdit(job: Job): void {
    this.router.navigate(['/jobs', job.id]);
  }
  ngOnInit(): void {
    this.appService.getJobs().subscribe(
      (jobs) => (this.jobs = jobs),
      (error) => {
        console.error(error);
        this._snackBar.open('Server error', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['red-snackbar'],
        });
      }
    );
  }
}
