export interface Question {
  question: string;
  options: string [];
  answer: string;
  fact?: string;
}


export interface QuestionList {
  lang: string;
  questions: Question[];
}
