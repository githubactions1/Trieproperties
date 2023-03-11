import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children: [
      {
        path: 'home', loadChildren: () => import('./../landing-page/landing-page.module').then(m => m.LandingPageModule)
      },
      {
        path: 'blog', loadChildren: () => import('./../Blogs/Blogs.module').then(m => m.BlogsModule)
      },
      {
        path: 'contact-us', loadChildren: () => import('./../Contact-us/Contact-us.module').then(m => m.ContactUsModule)
      },
      {
        path: 'our-projects', loadChildren: () => import('./../Our-projects/Our-projects.module').then(m => m.OurProjectsModule)
      },
      {
        path: 'project-detail/:ProjectID', loadChildren: () => import('./../Product-detail-view/Product-detail-view.module').then(m => m.ProductDetailViewModule)
      },
      {
        path: 'achievements', loadChildren: () => import('./../achievements-rewards/achievements-rewards.module').then(m => m.AchievementsRewardsModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix'
      }
    ]


  },
];

export const NavbarRoutes = RouterModule.forChild(routes);
