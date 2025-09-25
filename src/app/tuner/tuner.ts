import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tuner',
  imports: [CommonModule],
  templateUrl: './tuner.html',
  styleUrl: './tuner.css'
})
export class Tuner {
  // Stato che tiene traccia dell'accordatura corrente
  tunerMode: 'standard' | 'dropD' = 'standard';

  // Funzione che commuta l'accordatura
  changeTuner(mode: 'standard' | 'dropD') {
    this.tunerMode = mode;
}
  // Funzione che gestisce la riproduzione audio in modo robusto
  playNote(audioId: string) {
    const audio = document.getElementById(audioId) as HTMLAudioElement;

    if (audio) {
      // Resetta il tempo (riavvolgi)
      audio.currentTime = 0;

      // Prova a riprodurre, gestendo la Promise per evitare errori non catturati.
      audio.play().catch(error => {
        // Opzionale: stampa l'errore in console, ma evita di bloccare l'app
        console.error("Audio playback blocked:", error);

        // Questo è il modo in cui gestiamo l'errore di Safari: l'utente DEVE cliccare.
        // Se il click è stato fatto, l'errore è superato.
      });
    }
  }

  // ... altre funzioni come changeTunerToDropD, ecc. (se le sposti qui)
}
