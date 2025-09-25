import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; // Importa CommonModule per *ngFor

interface YoutubeVideo {
  id: string;
  title: string;
  embedUrl: SafeResourceUrl;
  originalUrl: string;
}

@Component({
  selector: 'app-youtube-gallery',
  imports: [CommonModule],
  templateUrl: './youtube-gallery.html',
  styleUrl: './youtube-gallery.css'
})
export class YoutubeGallery implements OnInit {
  videoData: YoutubeVideo[] = [];

  // Inserisci qui gli ID dei tuoi video e i loro titoli
  private myVideoList: { id: string, title: string }[] = [
    { id: 'alvt70iSQkg', title: 'El día y la noche' },
    { id: 'hdawGRr1sIk', title: 'Hormigas, comida para guitarra' },
    { id: 'lp8UazNVfBY', title: 'One' }
  ];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.myVideoList.forEach(video => {
      const embedUrl = `https://www.youtube.com/embed/${video.id}`;
      this.videoData.push({
        id: video.id,
        title: video.title,
        embedUrl: this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl),
        originalUrl: `https://www.youtube.com/watch?v=${video.id}`
      });
    });
  }
}
