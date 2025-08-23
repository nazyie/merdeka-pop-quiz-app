import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../model/Question';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-question-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './question-box.component.html',
  styleUrl: './question-box.component.scss'
})
export class QuestionBoxComponent implements OnInit {
  @Input() question!: Question;
  @Input() questionMetadata!: { questionNo: number, totalQuestion: number };

  @Output() resultEmitter = new EventEmitter<string>();

  btnColors: string[] = [
    'is-primary',
    'is-success',
    'is-warning',
    'is-error'
  ];

  iconStyle: string[] = [
    "nes-mario",
    "nes-ash",
    "nes-pokeball",
    "nes-bulbasaur",
    "nes-charmander",
    "nes-squirtle",
    "nes-kirby"
  ];

  selectedIconStyle!: string;
  answer!: string;
  confirmSelectedAnswer : boolean = false;
  resultIcon!: string;

  ngOnInit() {
    this.randomizingIconStyle();
  }

  confirmAnswer() {
    this.confirmSelectedAnswer = true;
  }

  proceedNextQuestion() {
    this.resultEmitter.emit(this.answer);
    this.resetValue();
  }

  chooseAnswer(answer: string) {
    this.answer = answer;
    this.resultIcon = (this.question.answer == answer) ?
    '✔' : '✖';
  }

  private resetValue() {
    this.answer = "";
    this.confirmSelectedAnswer = false;
    this.randomizingIconStyle();
    this.resultIcon = "";
  }

  private getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private randomizingIconStyle() {
    this.selectedIconStyle = this.getRandomElement(this.iconStyle);
  }

}
