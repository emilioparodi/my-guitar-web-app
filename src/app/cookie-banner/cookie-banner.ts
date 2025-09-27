import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  // Assumi che il componente sia standalone, altrimenti le imports vanno nel modulo
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css'
})
export class CookieBanner implements OnInit {
  // Proprietà per controllare la visibilità del banner
  showBanner: boolean = false;

  // Chiave usata nel localStorage per salvare lo stato
  private readonly COOKIE_KEY = 'cookies_accepted';

  // INIEZIONE DELLA PIATTAFORMA
  private platformId = inject(PLATFORM_ID);

  // Variabile per sapere se siamo nel browser
  isBrowser = isPlatformBrowser(this.platformId);

  ngOnInit(): void {
    // ESEGUI LA LOGICA SOLO SE SIAMO NEL BROWSER
    if (this.isBrowser) {
      this.checkCookieStatus();
    } else {
      // Se siamo sul server (SSR), non fare nulla. showBanner è false di default,
      // ma verrà aggiornato non appena l'app si idrata sul client.
    }
  }

  /**
   * Verifica lo stato in localStorage e imposta showBanner.
   * Viene chiamata SOLO se isBrowser è true.
   */
  checkCookieStatus(): void {
    try {
      const status = localStorage.getItem(this.COOKIE_KEY);
      this.showBanner = status !== 'true';
    } catch (e) {
      // Cattura eventuali errori di accesso a localStorage (es. browser in modalità privata)
      console.error('LocalStorage access failed:', e);
      this.showBanner = true; // Mostra il banner per sicurezza
    }
  }

  /**
   * Imposta lo stato a 'true' nel localStorage e nasconde il banner.
   */
  acceptCookies(): void {
    // ESEGUI LA SCRITTURA SOLO SE SIAMO NEL BROWSER
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.COOKIE_KEY, 'true');
        console.log('Cookies accepted and status saved.');
      } catch (e) {
        console.error('Error saving cookie preference to localStorage', e);
      }
    }
    // Nascondi il banner immediatamente, indipendentemente dal salvataggio
    this.showBanner = false;
  }
}
