import React, {Component} from "react"
import ActiveQuiz from "../../components/active-quiz";
import FinishedQuiz from "../../components/finished-quiz";
import classes from "./quiz.module.css";

export default class Quiz extends Component {
    state = {
        //  когда викторина завершена переводим в состояние true
        isFinished: null,
        // результаты по викторине
        quizResults: {},
        // текущий активный вопрос
        activeQuestionNumber: 0,
        // меняется когда пользователь нажимает на ответ переходит в состояние right или wrong
        answerStatus: null,
        // массив всех вопросов в тесте с ID правильных ответов
        quiz: [
            {
                question: "What function allows you to render React content in an HTML page?",
                rightAnswerId: 1,
                answers: [
                    {text: "ReactDOM.render()", id: 1},
                    {text: "React.mount()", id: 2},
                    {text: "ReactDOM.start()", id: 3},
                    {text: "React.render()", id: 4}
                ]
            },
            {
                question: "Which is used to keep the value of components unique?",
                rightAnswerId: 1,
                answers: [
                    {text: "key", id: 1},
                    {text: "ref", id: 2},
                    {text: "data", id: 3},
                    {text: "store", id: 4}
                ]
            },
            // {
            //     question: "In component lifecycle which one is executed before rendering?",
            //     rightAnswerId: 3,
            //     answers: [
            //         {text: "shouldComponentUpdate", id: 1},
            //         {text: "componentDidMount", id: 2},
            //         {text: "componentWillMount", id: 3},
            //         {text: "componentWillReceiveProps", id: 4}
            //     ]
            // },
            // {
            //     question: "Which is used to update the state?",
            //     rightAnswerId: 3,
            //     answers: [
            //         {text: "setNewnumber", id: 1},
            //         {text: "setnumber", id: 2},
            //         {text: "setState", id: 3},
            //         {text: "setInitialnumber", id: 4}
            //     ]
            // },
            // {
            //     question: "Who Develop React.js?",
            //     rightAnswerId: 3,
            //     answers: [
            //         {text: "Twitter", id: 1},
            //         {text: "Google", id: 2},
            //         {text: "Facebook", id: 3},
            //         {text: "microsoft", id: 4}
            //     ]
            // },
            // {
            //     question: "Which functions allow to bind the context of the components?",
            //     rightAnswerId: 2,
            //     answers: [
            //         {text: ":", id: 1},
            //         {text: "=>", id: 2},
            //         {text: ".", id: 3},
            //         {text: "::", id: 4}
            //     ]
            // },
            // {
            //     question: "JSX is necessary to work with React.js?",
            //     rightAnswerId: 2,
            //     answers: [
            //         {text: "false", id: 1},
            //         {text: "true", id: 2}
            //     ]
            // },
        ]
    };

    onAnswerClickHandler = answerID => {
        let {activeQuestionNumber, quiz, answerStatus} = this.state;
        // правильный вариант ответа текущего вопроса
        const rightID = quiz[activeQuestionNumber].rightAnswerId;
        // массив резульататов в который будем добавлять ответ на который нажал пользователь
        const results = {...this.state.quizResults};

        // пока у нас есть незавершенный таймаут при нажатии на пункт не должен увеличиваться счетчик
        if (answerStatus) {
            const key = Object.keys(answerStatus)[0];
            if (answerStatus[key] === "right") return
        }

        // если пользователь ответил правильно
        if (answerID === rightID) {
            // если первая попытка защитываем вопрос
            if (!results[activeQuestionNumber]) {
                results[activeQuestionNumber] = "right"
            }
            // и записываем в результат
            this.setState({
                answerStatus: {[answerID]: "right"},
                quizResults: results
            });
            // переходим к следующему вопросу или заканчиваем викторину
            this.nextQuestion(activeQuestionNumber);

        } else {
            // если ответил неправильно
            this.setState({
                answerStatus: {[answerID]: "wrong"},
                quizResults: {...results, [activeQuestionNumber]: "wrong"}
            });
        }
    };

    nextQuestion = (activeQuestionNumber) => {
        const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState({
                    activeQuestionNumber: activeQuestionNumber + 1,
                    answerStatus: null
                })
            }
            window.clearTimeout(timeout)
        }, 1000);
    };

    isQuizFinished = () => {
        const {activeQuestionNumber, quiz} = this.state;
        return activeQuestionNumber === quiz.length - 1
    };

    onRetryQuiz = () => {
        this.setState({
            isFinished: null,
            quizResults: {},
            activeQuestionNumber: 0,
            answerStatus: null,
        })
    };

    render() {
        const {activeQuestionNumber, quiz, answerStatus, isFinished, quizResults} = this.state;

        let finish = (
            <FinishedQuiz
                quiz={quiz}
                quizResults={quizResults}
                onRetry={this.onRetryQuiz}
            />
        );

        let activeQuiz = (
            <div>
                <h1 className={classes.title}>Choose the correct answer:</h1>
                <ActiveQuiz
                    quiz={quiz}
                    activeQuestionNumber={activeQuestionNumber}
                    answerStatus={answerStatus}
                    onAnswerClick={this.onAnswerClickHandler}
                />
            </div>
        );

        return isFinished ? finish : activeQuiz
    }
}