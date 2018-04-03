import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminSubscribersComponent } from './subscribers/subscribers.component';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { AdminAuthResolver } from './admin-auth-resolver.service';
import { AdminDashboardResolver } from './dashboard/admin-dashboard-resolver.service'
import { SharedModule, FooterComponent, HeaderComponent, SidebarComponent } from '../shared';
import { CountdownComponent } from './countdown/countdown.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      isAuthenticated: AdminAuthResolver
    },
    children: [
      {
        path: 'subscribers',
        component: AdminSubscribersComponent
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        resolve: {
          countdown: AdminDashboardResolver
        }
      }
    ]
  }

]);

@NgModule({
  imports: [
    adminRouting,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    AdminSubscribersComponent,
    AdminDashboardComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    CountdownComponent,
  ],
  providers: [
    AdminAuthResolver,
    AdminDashboardResolver
  ]
})
export class AdminModule {}
