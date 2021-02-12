import { Difficulty, Question } from "./types/classes";
import {shuffleArray} from './Utils';

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<Question[]> => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    }));
 }