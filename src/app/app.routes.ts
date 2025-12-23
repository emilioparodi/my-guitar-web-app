import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './home/home';
import { Biography } from './biography/biography';
import { Tools } from './tools/tools';
import { Videos } from './videos/videos';
import { Resources } from './resources/resources';
import { Works } from './works/works';
import { Notes } from './notes/notes';
import { Contacts } from './contacts/contacts';
import { PrivacyAndCookiePolicy } from './privacy-and-cookie-policy/privacy-and-cookie-policy';
import { NotFound } from './not-found/not-found';

// Importa i nuovi componenti delle landing
import { LandingIt } from './pages/landing-it/landing-it';
import { LandingEs } from './pages/landing-es/landing-es';

export const routes: Routes = [
  // --- 1. SITO INTERNAZIONALE (Con Header e Footer) ---
  {
    path: '',
    component: MainLayout,
    children: [
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
    ]
  },

  // --- 2. SHADOW LANDINGS (Senza Header internazionale) ---
  {
    path: 'lezioni-chitarra-san-marino',
    component: LandingIt
  },
  {
    path: 'clases-guitarra-colombia',
    component: LandingEs
  },

  // --- 3. GESTIONE ERRORI ---
  { path: '**', component: NotFound },
];
