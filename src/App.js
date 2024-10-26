import React, { useState } from 'react';
import './App.css';

function App() {
  const [answers, setAnswers] = useState(Array(100).fill(''));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div>
      <h1>百マス計算</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '10px' }}>
        {answers.map((answer, i) => (
          <input
            key={i}
            type="text"
            value={answer}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{ width: '40px', height: '40px', textAlign: 'center' }}
          />
        ))}
      </div>
      <button onClick={() => alert('ここに採点機能を追加予定です！')}>採点する</button>
    </div>
  );
}

export default App;
