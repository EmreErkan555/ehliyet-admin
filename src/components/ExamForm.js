import React, { useState } from 'react';

function ExamForm({ onAddExam }) {
  const [examName, setExamName] = useState('');

  const handleAddExam = () => {
    // Yeni sınavı eklemek için bir işlev çağrılabilir.
    onAddExam({ name: examName });
  };

  return (
    <div>
      <h2>Add Exam</h2>
      <input
        type="text"
        placeholder="Exam Name"
        value={examName}
        onChange={(e) => setExamName(e.target.value)}
      />
      <button onClick={handleAddExam}>Add Exam</button>
    </div>
  );
}

export default ExamForm;
