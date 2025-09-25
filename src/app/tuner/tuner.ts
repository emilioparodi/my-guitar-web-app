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
    // 1. CARICA ESPLICITAMENTE l'audio, in modo che il browser lo prepari subito.
    audio.load();

    // 2. Resetta il tempo (riavvolgi)
    audio.currentTime = 0;

    // 3. Esegui la riproduzione
    audio.play().catch(error => {
      // Se c'è un errore (es. ancora bloccato), stampalo ma non bloccare l'app
      console.error("Audio playback attempted but failed silently:", error);
    });
  }
}

  // ... altre funzioni come changeTunerToDropD, ecc. (se le sposti qui)
}
