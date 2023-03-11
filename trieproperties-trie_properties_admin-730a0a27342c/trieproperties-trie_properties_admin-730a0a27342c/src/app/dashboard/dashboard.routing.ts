import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'admin-section',
        loadChildren: () => import('../admin-section/admin-section.module').then((m) => m.AdminSectionModule),
      },
      {
        path: 'app-versions', loadChildren: () => import('../app-versions/app-versions.module').then((m) => m.AppVersionsModule),
      },

      // {
      //   path: 'blogs', loadChildren: () => import('../blogs/blogs.module').then((m) => m.BlogsModule),
      // },
      {
        path: 'contact-forms', loadChildren: () => import('../contact-forms/contact-forms.module').then((m) => m.ContactFormsModule),
      },
      {
        path: 'bookings', loadChildren: () => import('../project-bookings/project-bookings.module').then((m) => m.ProjectBookingsModule),
      },
      {
        path: 'projects', loadChildren: () => import('../Projects/Projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'contact-info', loadChildren: () => import('../contact-info/contact-info.module').then((m) => m.ContactInfoModule),
      },
      {
        path: 'banners', loadChildren: () => import('../banners/banners.module').then((m) => m.BannersModule),
      },
      {
        path: 'why-work-withus', loadChildren: () => import('../why-work-withus/why-work-withus.module').then((m) => m.WhyWorkWithusModule),
      },
      {
        path: 'client-testimonial', loadChildren: () => import('../client-testimonial/client-testimonial.module').then((m) => m.ClientTestimonialModule),
      },
      // {
      //   path: 'achievements', loadChildren: () => import('../Achievements/Achievements.module').then((m) => m.AchievementsModule),
      // },

      {
        path: '',
        redirectTo: 'admin-section',
        pathMatch: 'prefix',
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
