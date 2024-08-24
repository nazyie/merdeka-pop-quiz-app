import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../model/Question';
import { style } from '@angular/animations';

@Component({
  selector: 'app-question-box',
  standalone: true,
  imports: [],
  templateUrl: './question-box.component.html',
  styleUrl: './question-box.component.scss'
})
export class QuestionBoxComponent {
  @Input()
  no: number;

  @Input()
  totalQuestion: number;

  @Input()
  question: Question | null;

  @Output()
  resultEmitter = new EventEmitter<number>();

  iconStyle : string [];
  selectedIconStyle: string;
  answer: string;

  constructor() {
    this.no = 0;
    this.totalQuestion = 0;
    this.answer = "";
    this.question = null;
    this.iconStyle = [
      "nes-mario",
      "nes-ash",
      "nes-pokeball",
      "nes-bulbasaur",
      "nes-charmander",
      "nes-squirtle",
      "nes-kirby"
    ];
    this.selectedIconStyle = "";
  }

  ngOnInit() {
    this.randomizingIconStyle();
  }

  confirmAnswer() {
    let result = 0;
    if (this.answer === this.question?.answer) {
      result = 1;
    }

    this.randomizingIconStyle();
    this.clearAnswer();
    this.resultEmitter.emit(result);
  }

  randomizingIconStyle() {
    this.selectedIconStyle = this.getRandomElement(this.iconStyle);
  }

  chooseAnswer(answer: string) {
    this.answer = answer;
  }

  clearAnswer() {
    this.answer = "";
  }

  getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

}
