import { useState, useEffect } from 'react';
import './App.css';
import { z } from 'zod';

function App() {
  const [count, setCount] = useState(0);
  const [limits, setLimits] = useState({
    min: -10,
    max: 10,
  });

  const [inputs, setInputs] = useState({
    min: -10,
    max: 10,
  });

  const [clicks, setClicks] = useState(0);
  const [valueUser, setValueUser] = useState(0);

  useEffect(() => {
    if (count >= limits.max || count <= limits.min) {
      // después vas a mostrar un mensaje acá con Zod o en la interfaz
    }
  }, [count, limits]);

  const changeCount = (change) => {
    const nextCount = count + change;

    if (nextCount > limits.max || nextCount < limits.min) return;

    setCount(nextCount);
    setClicks((clicks) => clicks + 1);
  };

  const Reset = () => {
    setCount(0);
    setLimits({ min: -10, max: 10 });
    setInputs({ min: -10, max: 10 });
    setValueUser(0);
    setClicks(0);
  };

  const sendValue = () => {
    const valueCounter = z.object({
      value: z.number().min(limits.min).max(limits.max),
    });
    const result = valueCounter.safeParse({ value: valueUser });

    if (result.success) {
      setCount(valueUser);
    } else {
      alert(`El valor pillin no está entre ${limits.min} y ${limits.max}`);
    }
    setValueUser(valueUser);
  };

  const sendMaxValue = () => {
    if (inputs.max < inputs.min) {
      alert('El valor maximo no puede ser mas chico que el valor minimo');
      return;
    }
    setLimits((prevMax) => ({ ...prevMax, max: inputs.max }));
    setClicks((clicks) => clicks + 1);
  };

  const sendMinValue = () => {
    if (inputs.min > limits.max) {
      alert('El valor minimo no puede ser mas grande que el valor maximo');
      return;
    }
    setLimits((prevMin) => ({ ...prevMin, min: inputs.min }));
    setClicks((clicks) => clicks + 1);
  };

  const currentColor = count > 0 ? 'green' : count < 0 ? 'red' : '';
  const minButton = count > limits.min ? 'red' : '';
  const maxButton = count < limits.max ? 'green' : '';

  return (
    <>
      <div className="container-titles">
        <h1 style={{ color: currentColor }}>Contador</h1>
        <h2>Valor Actual </h2>
        <p className="current-value" style={{ color: currentColor }}>
          {count}
        </p>
      </div>
      <h3>
        Lamentablemente este contador es especial y no te deja pasar entre{' '}
      </h3>
      <div className="container-value">
        <p style={{ color: 'red' }}>{limits.min}</p>{' '}
        <p style={{ color: 'green' }}>{limits.max}</p>
      </div>
      <p>A menos que ahi abajo quieras cambiar estos valores.....</p>

      <div className="container-button">
        <button
          style={{ backgroundColor: minButton }}
          onClick={() => changeCount(-1)}
          disabled={count <= limits.min}
        >
          -
        </button>
        <button onClick={() => Reset()}>Reset</button>
        <button
          style={{ backgroundColor: maxButton }}
          onClick={() => changeCount(1)}
          disabled={count >= limits.max}
        >
          +
        </button>
      </div>
      <div className="container-inputs">
        <input
          type="number"
          value={inputs.min}
          onChange={(e) => {
            setInputs((prevMin) => ({
              ...prevMin,
              min: Number(e.target.value),
            }));
          }}
        />
        <button onClick={sendMinValue}>Valor Minimo Click</button>
        <input
          type="number"
          value={valueUser}
          onChange={(e) => {
            setValueUser(Number(e.target.value));
          }}
        />
        <button onClick={sendValue}>Valor Contador Inicial</button>
        <input
          type="number"
          value={inputs.max}
          onChange={(e) => setValueUser(Number(e.target.value))}
        />
        <button onClick={sendMaxValue}>Valor Maximo Click</button>
      </div>
      <p>Las veces que hiciste click {clicks} en los botones pillin</p>
    </>
  );
}

export default App;
