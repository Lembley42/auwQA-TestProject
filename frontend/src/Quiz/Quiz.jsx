import React from 'react';
import Question from './Question';
import Result from './Result';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      answers: {},
    };
  }

  onNext = () => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
    }));
  };

  onPrev = () => {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex - 1,
    }));
  };

  onAnswerChange = (selectedAnswer) => {
    const { questionIndex, answers } = this.state;
    const question = this.props.questions[questionIndex].question;

    if (this.props.questions[questionIndex].type === 'single') {
      answers[question] = [selectedAnswer];
      this.onNext();
    } else if (this.props.questions[questionIndex].type === 'multiple') {
      if (answers[question] && answers[question].includes(selectedAnswer)) {
        answers[question] = answers[question].filter((answer) => answer !== selectedAnswer);
      } else {
        answers[question] = [...(answers[question] || []), selectedAnswer];
      }
    }

    this.setState({ answers });
  };

  getModifiedQuestion = (question, answers) => {
    // If the question does not have a `setRecommendations` function, return it as is
    if (!question.setRecommendations) {
      return question;
    }

    // If it does, use it to update the options based on the answers given so far
    const newOptions = question.setRecommendations(question.options, answers);
    return {
      ...question,
      options: newOptions,
    };
  };

  render() {
    const { questions } = this.props;
    const { questionIndex, answers } = this.state;

    if (questionIndex >= questions.length) {
      return <Result answers={answers} />;
    }

    const currentQuestion = this.getModifiedQuestion(questions[questionIndex], answers);

    return (
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        type={currentQuestion.type}
        onNext={this.onNext}
        onPrev={this.onPrev}
        onAnswerChange={this.onAnswerChange}
        answer={answers[currentQuestion.question] || []}
        index={questionIndex}
      />
    );
  }
}

export default Quiz;
