import React from 'react';
import { Question, AnswerObject } from '../types/classes';

interface QuestionCardProps {
    question: Question;
    callback: CheckAnswerFunc;
    userAnswer: AnswerObject | undefined;
    totalQuestions: number;
    questionNumber: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, callback, userAnswer: userAnwser, totalQuestions, questionNumber }) => {

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        //todo: check next line on userAnswer hardcoded index!!!
        const answer = e.currentTarget.value;
        callback(answer);
    }

    return (<div>
        <p className="q__number">
            Question: {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
        <div>
            {question.answers.map(answer => (
                <div key={answer}>
                    <button disabled={!!userAnwser} value={answer} onClick={onClickHandler}>
                        <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                    </button>
                </div>
            )
            )}
        </div>
    </div >);
}