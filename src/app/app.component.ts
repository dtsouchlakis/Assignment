import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<div
    class=" bg-slate-300 h-screen w-screen flex justify-center items-center"
  >
    <div class="bg-white rounded-md w-10/12 h-5/6 shadow-lg shadow-gray-500">
      <router-outlet></router-outlet>
    </div>
  </div>`,
})
export class AppComponent {
  title = 'Assignment';
}
