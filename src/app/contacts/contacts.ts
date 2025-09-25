import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class Contacts implements OnInit {

  // Variabili di Stato
  private correctAnswer: number = 0;
  public captchaQuestion: string = '';
  // Lo stato del form controlla l'interfaccia utente
  public formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  // INIETTA ChangeDetectorRef: CRUCIALE per forzare l'aggiornamento in modalità Prod
  constructor(private cdr: ChangeDetectorRef) {
    this.generateCaptcha();
  }

  ngOnInit(): void { }

  // DEFINIZIONE CORRETTA: Metodo della classe
  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = num1 + num2;
    this.captchaQuestion = `Quanto fa ${num1} + ${num2}?`;
  }

  // Funzione principale di validazione
  validateForm(event: Event): void {
    event.preventDefault();

    // Riferimenti agli elementi DOM (Nessuna modifica qui)
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
        errorMessage.style.display = 'block';
        captchaInput.value = '';
        this.generateCaptcha();
    }
  }

  // FUNZIONE DI AGGIORNAMENTO STATO: Bypassa il Change Detection bloccato
  public updateStatus(newStatus: 'idle' | 'success' | 'error', form?: HTMLFormElement): void {
      this.formStatus = newStatus;

      // FORZA L'AGGIORNAMENTO IMMEDIATO DELLA VISTA
      this.cdr.detectChanges();

      if (newStatus === 'success' && form) {
          form.reset();
          this.generateCaptcha();

          // Dopo 5 secondi, torna a IDLE e forza un altro aggiornamento
          setTimeout(() => {
              this.formStatus = 'idle';
              // Ultimo tentativo di forzare la pulizia, anche se CDR dovrebbe bastare
              this.cdr.detectChanges();
          }, 5000);
      }
  }


  // FUNZIONE AJAX: Ora usa la funzione pubblica per garantire il tracciamento
  private submitForm(form: HTMLFormElement): void {
    this.formStatus = 'sending';
    // Forza subito l'aggiornamento a 'Invio in corso...'
    this.cdr.detectChanges();

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            // Successo: Usa la funzione pubblica per l'aggiornamento
            this.updateStatus('success', form);
        } else {
            // Errore HTTP: Sblocca il pulsante
            this.updateStatus('error');
        }
    })
    .catch(error => {
        // Errore di rete/CORS: Sblocca il pulsante
        this.updateStatus('error');
    });
  }
}
