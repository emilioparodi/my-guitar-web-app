import { Component } from '@angular/core';
import { YoutubeGallery } from '../youtube-gallery/youtube-gallery';

@Component({
  selector: 'app-videos',
  imports: [YoutubeGallery],
  templateUrl: './videos.html',
  styleUrl: './videos.css'
})
export class Videos {

}
