import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./jobs-module/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./new-job-module/new-job.module').then((m) => m.NewJobModule),
  },
  {
    path: 'jobs/:id',
    loadChildren: () =>
      import('./job-details-module/job-details.module').then(
        (m) => m.JobDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
