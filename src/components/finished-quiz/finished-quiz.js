import React from "react";
import Button from "../UI/button";
import "./finished-quiz.css"

const FinishedQuiz = ({quiz, quizResults, onRetry}) => {

    let rightAnswersCount = Object.values(quizResults).reduce((total, value) => {
        if (value === "right") total++;
        return total
    }, 0);

    const renderResults = (quiz) => {
        return quiz.map((item, idx) => {
            const questionNumber = idx + 1;
            const questionText = item.question;
            const infoClass = quizResults[idx] === "right" ? "fa fa-check" : "fa fa-times";
            return (
                <li className="finished-quiz-list-item" key={idx}>
                    <span>{questionNumber}.</span>
                    <span>{questionText}</span>
                    <i className={infoClass}></i>
                </li>
            )
        })
    };

    return (
        <div className="finished-quiz">
            <h3 className="finished-quiz-title">Викторина завершена</h3>
            <p>Правильно отвеченных вопросов {rightAnswersCount} из {quiz.length}</p>
            <ul className="finished-quiz-list">
                {renderResults(quiz)}
            </ul>
            <Button onClick={onRetry} type={"primary"}>Повторить</Button>
            <Button onClick={onRetry} type={"primary-arrow"}>Перейти к списку тестов</Button>
        </div>
    )
};

export default FinishedQuiz