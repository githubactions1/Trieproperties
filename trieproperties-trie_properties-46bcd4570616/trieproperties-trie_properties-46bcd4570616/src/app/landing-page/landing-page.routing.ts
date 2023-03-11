import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },

];

export const LandingPageRoutes = RouterModule.forChild(routes);
