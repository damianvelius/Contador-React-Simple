import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [valueMaxDefault, setValueMaxDefault] = useState(10);
  const [valueMinDefault, setValueMinDefault] = useState(-10);
  const [clicks, setClicks] = useState(0);
  const [valueUser, setValueUser] = useState(0);
  const [valueMinUser, setValueMinUser] = useState(0);
  const [valueMaxUser, setValueMaxUser] = useState(0);

  count > 0 ? 'green' : '';
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
    setValueUser(valueUser);
    setCount(valueUser);
  };

  const sendMaxValue = () => {
    setValueMaxUser(valueMaxUser);
    setValueMaxDefault(valueMaxUser);
    setClicks((clicks) => clicks + 1);
  };

  const sendMinValue = () => {
    setValueMinUser(valueMinUser);
    setValueMinDefault(valueMinUser);
    setClicks((clicks) => clicks + 1);
  };

  let colorIncrement = count > 0 ? 'green' : '';
  let colorDecrement = count < 0 ? 'red' : '';

  return (
    <>
      <h1 style={{ color: count > 0 ? colorIncrement : colorDecrement }}>
        Contador
      </h1>
      <h2>
        Valor Actual{' '}
        <p style={{ color: count > 0 ? colorIncrement : colorDecrement }}>
          {count}
        </p>
      </h2>
      <h2>
        Lamentablemente este contador es especial y no te deja pasar entre{' '}
        <p style={{ color: 'green' }}>{valueMaxDefault}</p>{' '}
        <p style={{ color: 'red' }}>{valueMinDefault}</p>
      </h2>
      <p>A menos que ahi abajo quieras cambiar estos valores.....</p>
      <h3>
        Las veces que hiciste click en estos hermosos botones es de {clicks}{' '}
        pillin
      </h3>
      <div className="card">
        <button
          style={{ backgroundColor: colorIncrement }}
          onClick={() => Increment()}
          disabled={count >= valueMaxDefault}
        >
          +
        </button>
        <button onClick={() => Reset()}>Reset</button>
        <button
          style={{ backgroundColor: colorDecrement }}
          onClick={() => Decrement()}
          disabled={count <= valueMinDefault}
        >
          -
        </button>
      </div>
      <h2>Pon un numero y el contador te lo va a tomar</h2>
      <div className="container-inputs">
        <input
          type="number"
          value={valueMinUser}
          onChange={(e) => {
            setValueMinUser(Number(e.target.value));
          }}
        />
        <input
          type="number"
          max={10}
          min={-10}
          value={valueUser}
          onChange={(e) => {
            setValueUser(Number(e.target.value));
          }}
        />
        <input
          type="number"
          value={valueMaxUser}
          onChange={(e) => {
            setValueMaxUser(Number(e.target.value));
          }}
        />
      </div>
      <div>
        <button onClick={sendMinValue}>Mandame un valor minimo</button>
        <button onClick={sendValue}>Mandame el valor de donde comienza</button>
        <button onClick={sendMaxValue}>Mandame un valor maximo</button>
      </div>
    </>
  );
}

export default App;
