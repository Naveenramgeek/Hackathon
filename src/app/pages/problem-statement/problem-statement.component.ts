import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-problem-statement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './problem-statement.component.html',
  styleUrl: './problem-statement.component.css'
})
export class ProblemStatementComponent {

  code: string = '';  // Code from the textarea
  output: string = 'Output will be displayed here.';  // Placeholder for output

  runCode() {
    // Simulated code execution logic
    if (this.code.includes('nums') && this.code.includes('target')) {
      this.output = '[0, 1]'; // Simulated output for "two sum" problem
    } else {
      this.output = 'Error: Please check your code.';
    }
  }

}
