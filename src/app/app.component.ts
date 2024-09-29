import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodingWindowComponent } from './pages/coding-window/coding-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CodingWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Hackathon';
}
