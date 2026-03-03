import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { JudithComponent } from './pages/judith/judith.component';
import { ParisComponent } from './pages/paris/paris.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: 'judith', component: JudithComponent },
  { path: 'paris', component: ParisComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
