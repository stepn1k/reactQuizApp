import React from "react"
import styles from './answer-item.module.css';

const AnswerItem = ({answer, onAnswerClick, answerStatus}) => {
    const cls = [styles.answer_item];

    if (answerStatus) {
        cls.push(styles[answerStatus])
    }

    return (
        <li className={cls.join(' ')} onClick={() => onAnswerClick()}>{answer}</li>
    )
}

export default AnswerItem