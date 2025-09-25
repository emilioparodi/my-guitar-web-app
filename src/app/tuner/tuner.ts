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
    // 1. Resetta il tempo (riavvolgi)
      audio.currentTime = 0;

      // 2. Esegui la riproduzione catturando ESPLICITAMENTE la Promise
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // La riproduzione è iniziata con successo.
        }).catch(error => {
          // Questo cattura gli errori come 'NotAllowedError' (blocco sicurezza)
          console.error("Audio playback blocked by browser security. Error:", error);

          // A questo punto, il browser ha bloccato la riproduzione e
          // non c'è altro che il codice possa fare.
        });
      }
    }
  }
}

