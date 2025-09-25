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
  audioBlocked: boolean = false; // Nuovo stato per il messaggio di errore

  playNote(audioId: string) {
    const audio = document.getElementById(audioId) as HTMLAudioElement;

    if (audio) {
      audio.currentTime = 0;
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Se si verifica un errore di blocco, attiva il messaggio
          this.audioBlocked = true;
          console.error("Audio playback blocked by browser security.", error);
        });
      }
    }
  }
}

