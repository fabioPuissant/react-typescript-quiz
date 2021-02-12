import React, { Fragment, useState } from 'react';
import './App.css';
import { fetchQuizQuestions } from './Api';

// styles
import { GlobalStyle, Wrapper } from './App.styles';

// components
import { QuestionCard } from './components/QuestionCard'

// Types
import { AnswerObject, Difficulty, Question } from './types/classes';

// Constants
const TOTAL_QUESTIONS = 10;

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    resetForNewGame();
    setLoading(false)
  }

  const resetForNewGame = () => {
    setGameOver(false);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
  }

  const checkAnswer: CheckAnswerFunc = (answer) => {
    if (!gameOver) {
      // Get the users answer
      const correct = questions[number].correct_answer === answer;

      // Increment Score if answer is correct
      setScore((prev) => correct ? prev + 1 : prev);

      // Adding the user given answer to the UserAnswer Array
      {
        // First, build new AnswerObject
        const userAnswerObj: AnswerObject =
        {
          question: questions[number].question,
          answer: answer,
          correct: correct,
          correctAnswer: questions[number].correct_answer
        };

        // Then, Save the AnswerObject of user in the UsersAnswers array
        setUserAnswers((prev) => [...prev, userAnswerObj]);


        console.log("User Answers given:");
        console.log(userAnswers);
      }
    }
  }

  const nextQuestion = () => {
    // If this is not the last question => Move on to the next question
    const nextQuestionNr = number + 1;

    if (nextQuestionNr === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionNr);
    }
  }



  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {
          // see if start button must be shown
          gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startQuiz}>
              Start
            </button>)
            : null
        }

        {
          // if game over, stop showing score
          !gameOver ? (<p className="score">Score: {score}</p>) : null
        }


        {
          // if loading show indication that it is loading
          loading ? (<p>Loading Questions ...</p>) : null
        }

        {
          // Only show when game is ongoing
          !loading && !gameOver &&
          (<QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number]}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />)
        }
        {
          // show if user has answered
          !gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
          <button className="next" onClick={nextQuestion}>Next Question</button>
        }
      </Wrapper >
    </Fragment>
  );
}

