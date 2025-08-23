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


  greetingText = [
    { id: 1, lang: 'my', text: 'Champions! Pilih bahasa anda' },
    { id: 2, lang: 'en', text: 'Champions! Choose your language' },
    { id: 3, lang: 'cn', text: '冠军们！请选择你的语言' },
    { id: 4, lang: 'tm', text: 'சாம்பியன்ஸ்! உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்' }
  ];

  languages = [
    { code: 'my', label: 'Bahasa Malaysia' },
    { code: 'en', label: 'English' },
    { code: 'cn', label: '中文 (Chinese)' },
    { code: 'tm', label: 'தமிழ் (Tamil)' }
  ];


  languageOption: number = 1;
  contentText: string = this.greetingText[0].text;
  blurred: boolean = false;


  constructor() {
    this.contentText = 'Champions! Choose your language';
  }

  ngOnInit() {
    setInterval(() => this.switchTextContentByInterval(), 1500);
  }

  switchTextContentByInterval() {
    if (this.blurred) {
      const lang = this.greetingText.find(l => l.id === this.languageOption);
      this.contentText = lang ? lang.text : this.greetingText[0].text;
      this.languageOption = this.languageOption % this.greetingText.length + 1;
    }

    this.blurred = !this.blurred;
  }

  chooseLanguage(lang: string) {
    this.prefLang.emit(lang);
  }
}
