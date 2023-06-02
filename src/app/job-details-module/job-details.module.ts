import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobDetailsComponent } from './job-details/job-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [{ path: '', component: JobDetailsComponent }];

@NgModule({
  declarations: [JobDetailsComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class JobDetailsModule {}
