import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class Contacts implements OnInit {
  contactForm!: FormGroup;
  captchaSolution: number = 0;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generateCaptcha();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      privacy: [false, Validators.requiredTrue], // Validazione per il check privacy
      captcha: ['', [Validators.required, this.captchaValidator.bind(this)]]
    });
  }

  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.captchaSolution = num1 + num2;
  }

  captchaValidator(control: any) {
    const isCorrect = control.value == this.captchaSolution;
    return isCorrect ? null : { invalidCaptcha: true };
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      console.log('Form inviato correttamente:', this.contactForm.value);
      alert('Messaggio inviato con successo!');
      this.contactForm.reset();
      this.isSubmitted = false;
      this.generateCaptcha();
    } else {
      console.log('Il form non è valido.');
      alert('Per favore, compila tutti i campi correttamente.');
    }
  }
}
