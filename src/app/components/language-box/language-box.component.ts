import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-language-box',
  standalone: true,
  imports: [],
  templateUrl: './language-box.component.html',
  styleUrl: './language-box.component.scss'
})
export class LanguageBoxComponent {
  @Output() prefLang = new EventEmitter<string>();

  greeetingText = [
    { id: 1, text: 'Champions! Pilih bahasa anda' },
    { id: 2, text: 'Champions! Choose your language' }
  ];

  languages = [
    { code: 'my', label: 'Bahasa Malaysia' },
    { code: 'en', label: 'English' }
  ];

  languageOption: number = 1;
  contentText: string = this.greeetingText[0].text;
  blurred: boolean = false;


  constructor() {
    this.contentText = 'Champions! Choose your language';
  }

  ngOnInit() {
    setInterval(() => this.switchTextContentByInterval(), 1500);
  }

  switchTextContentByInterval() {
    if (this.blurred) {
      const lang = this.greeetingText.find(l => l.id === this.languageOption);
      this.contentText = lang ? lang.text : this.greeetingText[0].text;
      this.languageOption = this.languageOption % this.greeetingText.length + 1;
    }

    this.blurred = !this.blurred;
  }

  chooseLanguage(lang: string) {
    this.prefLang.emit(lang);
  }
}
