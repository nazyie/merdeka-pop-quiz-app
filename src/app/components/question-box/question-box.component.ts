import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { style } from '@angular/animations';
import { Question } from '../../model/Question';

@Component({
  selector: 'app-question-box',
  standalone: true,
  imports: [],
  templateUrl: './question-box.component.html',
  styleUrl: './question-box.component.scss'
})
export class QuestionBoxComponent implements OnInit {
  @Input() no!: number;
  @Input()totalQuestion!: number;
  @Input() question!: Question | null;

  @Output() resultEmitter = new EventEmitter<number>();

  iconStyle!: string[];
  selectedIconStyle!: string;
  answer!: string;

  ngOnInit() {
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
