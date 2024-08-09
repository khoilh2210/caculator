import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {CounterState} from "./ngrx/calculator.state";
import  * as CalculatorActions from "../app/ngrx/caculator.action";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  display: string = '';
  currentNumber: string = '';
  operator: string | null = null;
  previousNumber: string = '';

  constructor(private store: Store<{ counter: CounterState }>) {}

  appendNumber(number: string) {
    this.currentNumber += number;
    this.updateDisplay();
  }

  setOperator(operator: string) {
    if (this.currentNumber === '') return;
    if (this.previousNumber !== '') {
      this.calculate();
    }
    this.operator = operator;
    this.previousNumber = this.currentNumber;
    this.currentNumber = '';
  }

  calculate() {
    if (
      this.currentNumber === '' ||
      this.previousNumber === '' ||
      this.operator === null
    )
      return;
    const a = parseFloat(this.previousNumber);
    const b = parseFloat(this.currentNumber);
    let result: number;

    switch (this.operator) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      default:
        return;
    }

    this.currentNumber = result.toString();
    this.previousNumber = '';
    this.operator = null;
    this.updateDisplay();
  }

  clear() {
    this.display = '';
    this.currentNumber = '';
    this.previousNumber = '';
    this.operator = null;
  }

  private updateDisplay() {
    this.display = this.currentNumber;
  }
}
