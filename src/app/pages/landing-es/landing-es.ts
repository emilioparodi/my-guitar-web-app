import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-es',
  imports: [MatIcon],
  templateUrl: './landing-es.html',
  styleUrl: './landing-es.css'
})
export class LandingEs implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Clases de Guitarra en Armenia Quindío | Maestro Emilio Parodi Garcia');

    this.meta.updateTag({
      name: 'description',
      content: 'Clases profesionales de guitarra en Armenia, Quindío y online para toda Colombia. Profesor titulado en Conservatorio de Italia con 10+ años de experiencia.'
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'clases de guitarra Armenia, profesor de guitarra Quindío, clases de música Colombia, guitarra clásica, guitarra moderna, Emilio Parodi Garcia'
    });
  }
}
