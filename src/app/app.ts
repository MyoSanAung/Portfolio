import { Component } from '@angular/core';
import { AnimationModule } from './animations';

@Component({
  selector: 'app-root',
  imports: [AnimationModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly title = 'Myo San Aung | Portfolio';
  // 3D Tilt enabled
}
