import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BulletCalculation } from './bullet-calculation/bullet-calculation/bullet-calculation';

@Component({
  imports: [RouterOutlet, BulletCalculation],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bullet-calculation');
}
