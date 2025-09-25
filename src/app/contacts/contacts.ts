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

  // Variabili di Stato
  private correctAnswer: number = 0;
  public captchaQuestion: string = '';
  // Lo stato del form controlla l'interfaccia utente (Visibile nel template)
  public formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  // INIETTA ChangeDetectorRef
  constructor(private cdr: ChangeDetectorRef) {
    this.generateCaptcha();
  }

  ngOnInit(): void { }

  // 1. GENERAZIONE CAPTCHA: Aggiorna la domanda
  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = num1 + num2;
    this.captchaQuestion = `Quanto fa ${num1} + ${num2}?`;

    // Forzo l'aggiornamento dopo la generazione del CAPTCHA
    this.cdr.detectChanges();
  }

  // 2. VALIDAZIONE: Controlla gli input
  validateForm(event: Event): void {
    event.preventDefault();

    // Riferimenti agli elementi DOM
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
        this.cdr.detectChanges(); // Forzo aggiornamento se c'è errore di validazione
    }
  }

  // 3. AGGIORNAMENTO STATO: Funzione centrale per il Change Detection
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

  // 4. FUNZIONE AJAX: Invia i dati a Formspree
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
        // Errore di rete
        this.updateStatus('error');
    });
  }
}
