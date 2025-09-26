import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cookie-banner',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css'
})
export class CookieBanner {
 // Proprietà per controllare la visibilità del banner
  showBanner: boolean = false;

  // Chiave usata nel localStorage per salvare lo stato
  private readonly COOKIE_KEY = 'cookies_accepted';

  ngOnInit(): void {
    // Controlla se l'utente ha già accettato i cookie in precedenza
    this.checkCookieStatus();
  }

  /**
   * Verifica lo stato in localStorage e imposta showBanner.
   */
  checkCookieStatus(): void {
    // Se non troviamo la chiave nel localStorage, mostriamo il banner
    const status = localStorage.getItem(this.COOKIE_KEY);
    this.showBanner = status !== 'true';
  }

  /**
   * Imposta lo stato a 'true' nel localStorage e nasconde il banner.
   */
  acceptCookies(): void {
    try {
      localStorage.setItem(this.COOKIE_KEY, 'true');
      this.showBanner = false;
      console.log('Cookies accepted and status saved.');
    } catch (e) {
      console.error('Error saving cookie preference to localStorage', e);
      // In caso di errore (es. storage pieno o bloccato), nascondiamo comunque il banner per l'esperienza utente
      this.showBanner = false;
    }
  }
}
