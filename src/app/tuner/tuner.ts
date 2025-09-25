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
    // 1. Devi ASSICURARTI che NON ci sia più audio.load() da nessuna parte.
    // Il browser farà load() automaticamente quando glielo chiedi di suonare.

    // 2. Forza il riavvolgimento
    audio.currentTime = 0;

    // 3. Esegui la riproduzione gestendo la Promise ESPLICITAMENTE
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // La riproduzione è iniziata con successo (nessun errore di sicurezza)
      })
      .catch(error => {
        // La riproduzione è stata bloccata da un errore (es. NotAllowedError)
        console.error("Safari Blocked Playback:", error.name, error);
        // A questo punto, l'errore non è più risolvibile dal codice.
      });
    }
  }
}
}
