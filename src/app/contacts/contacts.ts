import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contacts implements OnInit {

  private correctAnswer: number = 0;
  public captchaQuestion: string = '';
  public formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor(private cdr: ChangeDetectorRef) {
    // NON CHIAMIAMO generateCaptcha() qui. La sposteremo in ngOnInit
    // Questo previene l'errore di Change Detection precoce.
  }

  ngOnInit(): void {
    // Spostiamo qui la generazione iniziale del CAPTCHA
    this.generateCaptcha();
  }

  // 1. GENERAZIONE CAPTCHA: NON FORZA L'AGGIORNAMENTO
  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = num1 + num2;
    this.captchaQuestion = `How much is ${num1} + ${num2}?`;

    // RIMOZIONE: this.cdr.detectChanges(); <-- QUESTA ERA LA CAUSA DELL'ERRORE
  }

  // 2. VALIDAZIONE: Controlla gli input
  validateForm(event: Event): void {
    event.preventDefault();

    // Riferimenti agli elementi DOM (lasciamo il codice come prima)
    const captchaInput = document.getElementById('captchaInput') as HTMLInputElement;
    const privacyCheck = document.getElementById('privacyCheck') as HTMLInputElement;
    const errorMessage = document.getElementById('error-message') as HTMLElement;
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;

    this.formStatus = 'idle';

    const userAnswer = parseInt(captchaInput.value, 10);
    const isCaptchaCorrect = userAnswer === this.correctAnswer;
    const isPrivacyChecked = privacyCheck.checked;

    if (isCaptchaCorrect && isPrivacyChecked) {
        errorMessage.style.display = 'none';
        this.submitForm(contactForm);
    } else {
        // Logica errore di validazione
        errorMessage.style.display = 'block';
        captchaInput.value = '';
        this.generateCaptcha();
        this.cdr.detectChanges(); // QUI IL CHANGE DETECTION VA BENE
    }
  }

  // 3. AGGIORNAMENTO STATO: Funzione centrale (NON MODIFICARE)
  public updateStatus(newStatus: 'idle' | 'success' | 'error', form?: HTMLFormElement): void {
      this.formStatus = newStatus;

      // FORZA L'AGGIORNAMENTO IMMEDIATO DELLA VISTA DOPO IL CAMBIO DI STATO
      this.cdr.detectChanges();

      if (newStatus === 'success' && form) {
          form.reset();
          this.generateCaptcha(); // Rigenera il CAPTCHA

          // Ritorna a 'idle' dopo 5 secondi
          setTimeout(() => {
              this.formStatus = 'idle';
              this.cdr.detectChanges();
          }, 5000);
      }
  }

  // 4. FUNZIONE AJAX: Invia i dati a Formspree (NON MODIFICARE)
  private submitForm(form: HTMLFormElement): void {
    this.formStatus = 'sending';
    this.cdr.detectChanges(); // FORZA SUBITO: Mostra 'Invio in corso...'

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            this.updateStatus('success', form);
        } else {
            this.updateStatus('error');
        }
    })
    .catch(error => {
        this.updateStatus('error');
    });
  }
}
