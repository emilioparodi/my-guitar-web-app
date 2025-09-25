import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class Contacts implements OnInit {

  private correctAnswer: number = 0;
  public captchaQuestion: string = '';
  public formStatus: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  constructor() {
    this.generateCaptcha();
  }

  ngOnInit(): void { }

  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = num1 + num2;
    this.captchaQuestion = `Quanto fa ${num1} + ${num2}?`;
  }

  validateForm(event: Event): void {
    event.preventDefault();

    // ... (Logica di validazione rimane invariata) ...
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

  // NUOVA FUNZIONE TRACCIABILE DA ANGULAR
  public updateStatus(newStatus: 'idle' | 'success' | 'error', form?: HTMLFormElement): void {
      this.formStatus = newStatus;

      if (newStatus === 'success' && form) {
          form.reset();
          this.generateCaptcha();

          // Dopo 5 secondi, simuliamo un altro evento per tornare a IDLE
          setTimeout(() => {
              this.formStatus = 'idle';
              // Forza il rendering finale simulando un evento mouseover su un elemento
              document.dispatchEvent(new Event('mouseover'));
          }, 5000);
      }
  }


  // FUNZIONE AJAX: Ora usa la funzione pubblica per garantire il tracciamento
  private submitForm(form: HTMLFormElement): void {
    this.formStatus = 'sending';

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            // Successo: Usa la funzione pubblica di Angular per il tracciamento
            this.updateStatus('success', form);
        } else {
            // Errore: Sblocca il pulsante
            this.updateStatus('error');
        }
    })
    .catch(error => {
        // Errore di rete: Sblocca il pulsante
        this.updateStatus('error');
    });
  }
}
