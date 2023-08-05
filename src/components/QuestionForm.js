import React, { useState } from 'react';

function QuestionForm({ examId, onAddQuestion }) {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctChoiceIndex, setCorrectChoiceIndex] = useState(0);

  const handleAddQuestion = () => {
    // Yeni soruyu eklemek için bir işlev çağrılabilir.
    onAddQuestion({
      examId,
      questionText,
      options,
      correctChoiceIndex,
    });
  };

  return (
    <div>
      <h2>Add Question</h2>
      <input
        type="text"
        placeholder="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => {
            const updatedOptions = [...options];
            updatedOptions[index] = e.target.value;
            setOptions(updatedOptions);
          }}
        />
      ))}
      <select
        value={correctChoiceIndex}
        onChange={(e) => setCorrectChoiceIndex(Number(e.target.value))}
      >
        {options.map((_, index) => (
          <option key={index} value={index}>
            Option {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleAddQuestion}>Add Question</button>
    </div>
  );
}

export default QuestionForm;
