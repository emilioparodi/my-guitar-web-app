import { Routes, RouterLink, RouterLinkActive } from '@angular/router';
import { Home } from './home/home';
import { Biography } from './biography/biography';
import { Tools } from './tools/tools';
import { Videos } from './videos/videos';
import { Resources } from './resources/resources';
import { Works } from './works/works';
import { Notes } from './notes/notes';
import { Contacts } from './contacts/contacts';
import { PrivacyAndCookiePolicy } from './privacy-and-cookie-policy/privacy-and-cookie-policy';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'biography', component: Biography },
  { path: 'tools', component: Tools },
  { path: 'videos', component: Videos },
  { path: 'resources', component: Resources },
  { path: 'works', component: Works },
  { path: 'notes', component: Notes },
  { path: 'contacts', component: Contacts },
  { path: 'privacy-&-cookie-policy', component: PrivacyAndCookiePolicy },
];
