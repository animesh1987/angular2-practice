import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PassengerDashboardComponent } from './containers/passenger-dashboard/passenger-dashboard.component';
import { PassengerViewerComponent } from './containers/passengers-viewers/passengers-viewers.component';
import { PassengerDetailCompoent } from './components/passenger-detail/passenger-detail.component';
import { PassengerCountCompoent } from './components/passenger-count/passenger-count.component';
import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';


// Service
import { PassengerDashboardService } from './passenger-dashboard.service';

const routes: Routes = [
  {
    path: 'passengers',
    children: [
      {path: '', component: PassengerDashboardComponent },
      {path: ':id', component: PassengerViewerComponent }
    ]
];

@NgModule({
  declarations: [
    PassengerDashboardComponent,
    PassengerViewerComponent,
    PassengerDetailCompoent,
    PassengerCountCompoent,
    PassengerFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PassengerDashboardService
  ]
})

export class PassengerDashboardModule {}
