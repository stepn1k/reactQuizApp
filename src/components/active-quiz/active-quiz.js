import React from "react";
import styles from "./active-quiz.module.css"
import AnswerList from "../answer-list";

const ActiveQuiz = ({quiz, activeQuestionNumber, onAnswerClick, answerStatus}) => {
    const {active_quiz, status, title} = styles;
    const activeQuestion = quiz[activeQuestionNumber];

    return (
        <div className={active_quiz}>
            <div className={status}> {activeQuestionNumber + 1} of {quiz.length} </div>
            <h3 className={title}>{activeQuestion.question}</h3>
            <AnswerList
                answers={activeQuestion.answers}
                onAnswerClick={onAnswerClick}
                answerStatus={answerStatus}
            />
        </div>
    )
};

export default ActiveQuiz