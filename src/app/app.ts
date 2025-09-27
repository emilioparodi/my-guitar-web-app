import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { NotFound } from "./not-found/not-found";
import { MatIconModule } from '@angular/material/icon';
import { CookieBanner } from "./cookie-banner/cookie-banner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, MatIconModule, CookieBanner],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guitar-web-app');
}
