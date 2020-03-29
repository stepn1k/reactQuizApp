import React from "react";
import AnswerItem from "../answer-item";
import styles from "./answer-list.module.css"

const AnswerList = ({answers, onAnswerClick, answerStatus}) => {
    return (
        <ul className={styles.answer_list}>
            {answers.map(({text, id}) => {
                return (
                    <AnswerItem
                        answer={text}
                        key={id}
                        onAnswerClick={() => onAnswerClick(id)}
                        answerStatus={answerStatus ? answerStatus[id] : null}
                    />
                )
            })}
        </ul>
    )
}

export default AnswerList