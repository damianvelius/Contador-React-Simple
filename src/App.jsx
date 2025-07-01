import { useState, useEffect } from 'react';
import './App.css';
import { z } from 'zod';

function App() {
  const [count, setCount] = useState(0);
  const [valueMaxDefault, setValueMaxDefault] = useState(10);
  const [valueMinDefault, setValueMinDefault] = useState(-10);
  const [clicks, setClicks] = useState(0);
  const [valueUser, setValueUser] = useState(0);
  const [valueMinUser, setValueMinUser] = useState(0);
  const [valueMaxUser, setValueMaxUser] = useState(0);

  useEffect(() => {
    if (count >= valueMaxDefault) {
      alert(`Llegaste al tope ${valueMaxDefault} pillín`);
    } else if (count <= valueMinDefault) {
      alert(`Llegaste al tope ${valueMinDefault} pillín`);
    }
  }, [count]);

  const Increment = () => {
    if (count >= valueMaxDefault) {
    } else {
      setCount((count) => count + 1);
      setClicks((clicks) => clicks + 1);
    }
  };

  const Decrement = () => {
    if (count <= valueMinDefault) {
    } else {
      setCount((count) => count - 1);
      setClicks((clicks) => clicks + 1);
    }
  };

  const Reset = () => {
    setCount(0);
    setValueMaxDefault(10);
    setValueMinDefault(-10);
    setValueUser(0);
    setValueMaxUser(0);
    setValueMinUser(0);
    setClicks(0);
  };

  const sendValue = () => {
    const valueCounter = z.object({
      value: z.number().min(valueMinDefault).max(valueMaxDefault),
    });
    const result = valueCounter.safeParse({ value: valueUser });

    if (result.success) {
      setCount(valueUser);
    } else {
      alert(
        `El valor pillin no está entre ${valueMinDefault} y ${valueMaxDefault}`
      );
    }
    setValueUser(valueUser);
  };

  const sendMaxValue = () => {
    if (valueMaxUser < valueMinDefault) {
      alert('El valor maximo no puede ser mas chico que el valor minimo');
      return;
    }
    setValueMaxUser(valueMaxUser);
    setValueMaxDefault(valueMaxUser);
    setClicks((clicks) => clicks + 1);
  };

  const sendMinValue = () => {
    if (valueMinUser > valueMaxDefault) {
      alert('El valor minimo no puede ser mas grande que el valor maximo');
      return;
    }
    setValueMinUser(valueMinUser);
    setValueMinDefault(valueMinUser);
    setClicks((clicks) => clicks + 1);
  };

  let colorIncrement = count > 0 ? 'green' : '';
  let colorDecrement = count < 0 ? 'red' : '';

  return (
    <>
      <div className="container-titles">
        <h1 style={{ color: count > 0 ? colorIncrement : colorDecrement }}>
          Contador
        </h1>
        <h2>Valor Actual </h2>
        <p
          className="current-value"
          style={{ color: count > 0 ? colorIncrement : colorDecrement }}
        >
          {count}
        </p>
      </div>
      <h3>
        Lamentablemente este contador es especial y no te deja pasar entre{' '}
      </h3>
      <div className="container-value">
        <p style={{ color: 'red' }}>{valueMinDefault}</p>{' '}
        <p style={{ color: 'green' }}>{valueMaxDefault}</p>
      </div>
      <p>A menos que ahi abajo quieras cambiar estos valores.....</p>

      <div className="container-button">
        <button
          style={{ backgroundColor: colorDecrement }}
          onClick={() => Decrement()}
          disabled={count <= valueMinDefault}
        >
          -
        </button>
        <button onClick={() => Reset()}>Reset</button>
        <button
          style={{ backgroundColor: colorIncrement }}
          onClick={() => Increment()}
          disabled={count >= valueMaxDefault}
        >
          +
        </button>
      </div>
      <div className="container-inputs">
        <input
          type="number"
          value={valueMinUser}
          onChange={(e) => {
            setValueMinUser(Number(e.target.value));
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
          value={valueMaxUser}
          onChange={(e) => {
            setValueMaxUser(Number(e.target.value));
          }}
        />
        <button onClick={sendMaxValue}>Valor Maximo Click</button>
      </div>
      <p>Las veces que hiciste click {clicks} en los botones pillin</p>
    </>
  );
}

export default App;
