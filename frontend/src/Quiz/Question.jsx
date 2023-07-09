import React from 'react';

const Question = ({ question, options, type, onNext, onPrev, onAnswerChange, answer, index }) => {
  return (
    <div>
      <h2>{question}</h2>
      <p class="question-type">{type === 'single' ? 'Einfachauswahl' : 'Mehrfachauswahl'}</p>
      <div className="options">
        {options.map((option, idx) => (
          <button 
            key={idx}
            className={`option ${answer.includes(option.value) ? 'selected' : ''} ${option.recommend ? 'recommended' : ''}`}
            onClick={() => onAnswerChange(option.value)}
          >
            <img src={option.imageSrc} alt={option.value}/>
            <p>{option.value}</p>
            {option.recommend && <span className="recommend-badge">Empfohlen</span>}
          </button>
        ))}
      </div>
      <div className="navigation-buttons">
        {index > 0 && <button onClick={onPrev}>Back</button>}
        {type === 'multiple' && <button onClick={onNext}>Next</button>}
      </div>
    </div>
  );
};

export default Question;
