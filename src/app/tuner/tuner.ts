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
    // RIMUOVI audio.load(); <-- CAUSAVA IL CONFLITTO

    // Resetta il tempo (riavvolgi)
    audio.currentTime = 0;

    // Esegui la riproduzione
    audio.play().catch(error => {
      // Se c'è un errore (dovrebbe essere raro ora), stampalo.
      console.error("Final Audio Playback Error:", error);
      });
    }
  }
}
