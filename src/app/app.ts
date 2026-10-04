import { Component, signal } from '@angular/core';
import { BulletCalculation } from './bullet-calculation/bullet-calculation/bullet-calculation';

@Component({
  imports: [BulletCalculation],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bullet-calculation');
}
