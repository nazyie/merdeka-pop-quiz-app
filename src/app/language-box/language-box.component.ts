import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-language-box',
  standalone: true,
  imports: [],
  templateUrl: './language-box.component.html',
  styleUrl: './language-box.component.scss'
})
export class LanguageBoxComponent {

  @Output()
  pageEventEmitter = new EventEmitter<string>();

  currLang: number = 1;
  text: string;
  intervalId: any;
  blurred: boolean = false;

  constructor() {
    this.text = 'Champions! Choose your language';
  }

  ngOnInit() {
    this.intervalId = setInterval(() => this.toggleText(), 1500);
  }

  toggleText() {
    if (this.blurred) {
      if (this.currLang == 1)
        this.text = 'Champions! Pilih bahasa anda';
      if (this.currLang == 2)
        this.text = 'Champions! Choose your language';
      this.currLang++;
    }

    this.blurred = !this.blurred;
    if (this.currLang > 2)
      this.currLang = 1;
  }

  chooseLanguage(lang: string) {
    this.pageEventEmitter.emit(lang);
  }
}
