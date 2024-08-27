import { Component, Input } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-judging-box',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './judging-box.component.html',
  styleUrl: './judging-box.component.scss'
})
export class JudgingBoxComponent {
  HEART_MAX: number = 5;

  @Input()
  score: number;

  @Input()
  totalQuestion: number;

  @Input()
  localize: string;


  judgeTitle: string | undefined;
  judgeText: string | undefined;

  hasHalfHeart: boolean = false;
  emptyHeartCount: number [] = [];
  heartCount: number [] = [];

  constructor() {
    this.localize = 'en';
    this.totalQuestion = 0;
    this.score = 0;
    this.judgeTitle = "";
    this.judgeText = "";
  }

  ngOnInit() {
    this.createJudgementText();
  }

  createJudgementText() {
    const judgementTextMap = new Map<number, {
      judgeTitleMy: string,
      judgeTitleEng: string,
      judgeTextMy: string,
      judgeTextEng: string
    }>([
      [0, {
        judgeTitleMy: "Bencana Besar",
        judgeTitleEng: "Total Disaster",
        judgeTextMy: "Wah, ini memang dah melampau. Macam tak pernah dengar pasal Malaysia pun. Mungkin sejarah bukan untuk kau… atau apa-apa pun sebenarnya.",
        judgeTextEng: "Wow, this is beyond bad. It’s like you’ve never heard of Malaysia before. Maybe history isn’t your thing… or anything, really."
      }],
      [1, {
        judgeTitleMy: "Memalukan Negara",
        judgeTitleEng: "National Embarrassment",
        judgeTextMy: "Tidur masa kelas sejarah ke? Jawapan ni terlalu teruk, sampai rasa macam tak sayang negara. Cuba lagi, atau pindah je la.",
        judgeTextEng: "Did you sleep through history class? This answer is so bad, it’s practically unpatriotic. Try again, or consider relocating."
      }],
      [2, {
        judgeTitleMy: "Patriot Setengah Masak",
        judgeTitleEng: "Half-Baked Patriot",
        judgeTextMy: "Kau macam tahu, tapi tak tahu sangat. Macam kibarkan bendera dengan malas—sedih je tengok. Kaji balik sejarah kau, kawan.",
        judgeTextEng: "You’re kind of there, but mostly not. It’s like waving a flag with no enthusiasm—just sad. Brush up on your history, champ."
      }],
      [3, {
        judgeTitleMy: "Rakyat Malaysia Biasa-Biasa",
        judgeTitleEng: "Mediocre Malaysian",
        judgeTextMy: "Kau tahu cukup untuk tak memalukan diri sepenuhnya, tapi jujurnya—kau takkan menang anugerah 'Patriot Sejati' dengan jawapan ni.",
        judgeTextEng: "You know just enough to not be completely embarrassing, but let’s be honest—you’re not winning any 'True Patriot' awards with this."
      }],
      [4, {
        judgeTitleMy: "Hampir Anak Malaysia",
        judgeTitleEng: "Almost Anak Malaysia",
        judgeTextMy: "Kau hampir jadi juara, tapi belum cukup lagi. Semangat ada, tapi nampak macam kau baca sinopsis sejarah je. Lain kali, fokus betul-betul!",
        judgeTextEng: "You’re close, but not close enough. You’ve got the spirit, but it seems like you skimmed the textbook. Go all in next time!"
      }],
      [5, {
        judgeTitleMy: "Merdeka Mastermind",
        judgeTitleEng: "Merdeka Mastermind",
        judgeTextMy: "Wah, nampaknya kau ensiklopedia berjalan tentang Malaysia! Macam kau ada kat sana masa 1957 dulu. Jangan terlalu bangga sangat pulak.",
        judgeTextEng: "Well, well, well, look who’s a walking encyclopedia of Malaysia! It’s almost like you were there in 1957. Don’t let it go to your head."
      }]
    ]);

    let result = judgementTextMap.get(this.calculateHeartAppearance());

    this.judgeTitle = this.localize === "my" ?
      result?.judgeTitleMy
      : result?.judgeTitleEng;

    this.judgeText = this.localize === "my" ?
      result?.judgeTextMy
      : result?.judgeTextEng;
  }

  calculateHeartAppearance() : number {
    this.hasHalfHeart = this.checkForDecimalValue(this.score, this.totalQuestion);

    let scorePoint = Math.floor((this.score / this.totalQuestion) * 5);
    let failScorePoint = !this.hasHalfHeart ?
      this.HEART_MAX - scorePoint
      : this.HEART_MAX - scorePoint - 1;

    this.heartCount = Array(scorePoint).fill(0).map((x,i) => i);

    this.emptyHeartCount = Array(failScorePoint).fill(0).map((x,i) => i);

    return scorePoint;
  }

  checkForDecimalValue(score: number, totalQuestion: number): boolean {
    return ((score / totalQuestion) * 5) % 1 != 0 ? true : false;
  }


}
