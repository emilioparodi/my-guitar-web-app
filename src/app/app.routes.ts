import { Routes, RouterLink, RouterLinkActive } from '@angular/router';
import { Home } from './home/home';
import { Biography } from './biography/biography';
import { Tools } from './tools/tools';
import { Videos } from './videos/videos';
import { Resources } from './resources/resources';
import { Contacts } from './contacts/contacts';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'biography', component: Biography },
  { path: 'tools', component: Tools },
  { path: 'videos', component: Videos },
  { path: 'resources', component: Resources },
  { path: 'contacts', component: Contacts },
];
