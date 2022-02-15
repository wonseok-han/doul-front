import React, { useState } from 'react';
const Second: React.FC = () => {
  const [test, setTest] = useState(0);

  return (
    <div>
      <div>{test}</div>
      <button onClick={() => setTest(test + 1)}>버튼</button>
    </div>
  );
};

export default Second;
