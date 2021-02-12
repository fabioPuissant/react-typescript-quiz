export class Question { 
    category: string ="";
    correct_answer: string ="";
    difficulty:string ="";
    incorrect_answers: string[] =[];
    question: string ="";
    type: string="";
    answers: string[] = [];
}

export class AnswerObject {
    question: string ="";
    answer: string="";
    correct: boolean= false;
    correctAnswer: string = "";
  }
  

export enum Difficulty {
    EASY='easy', 
    MEDIUN='medium',
    HARD='hard',

}