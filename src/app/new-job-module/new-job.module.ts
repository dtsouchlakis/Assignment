import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewJobComponent } from './new-job/new-job.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
const routes: Routes = [{ path: '', component: NewJobComponent }];

@NgModule({
  declarations: [NewJobComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
})
export class NewJobModule {}
