import { useState, useEffect } from 'react';
import './App.css';
import { z } from 'zod';

function App() {
  // Estado para el valor actual del contador
  const [count, setCount] = useState(0);

  // Estado con los límites actuales del contador
  const [limits, setLimits] = useState({
    min: -10,
    max: 10,
  });

  // Estado para los inputs que el usuario puede modificar
  const [inputs, setInputs] = useState({
    min: -10,
    max: 10,
  });

  // Estado para contar cuántas veces se hicieron clics en los botones
  const [clicks, setClicks] = useState(0);

  // Valor numérico que el usuario puede ingresar manualmente
  const [valueUser, setValueUser] = useState(0);

  // Estado para mostrar mensajes de error si hay problemas con los valores ingresados
  const [errorMessage, setErrorMessage] = useState('');

  // Cada vez que cambia el contador, se limpia el mensaje de error
  useEffect(() => {
    setErrorMessage('');
  }, [count]);

  // Esta función aumenta o disminuye el contador según el parámetro recibido
  const changeCount = (change) => {
    const nextCount = count + change;

    // Si el siguiente valor está fuera de los límites, no hace nada
    if (nextCount > limits.max || nextCount < limits.min) return;

    setCount(nextCount);
    setClicks((clicks) => clicks + 1);
  };

  // Resetea todo a los valores iniciales(duhhhh)
  const reset = () => {
    setCount(0);
    setLimits({ min: -10, max: 10 });
    setInputs({ min: -10, max: 10 });
    setValueUser(0);
    setClicks(0);
  };

  // Valida y aplica el valor ingresado manualmente por el usuario
  const sendValue = () => {
    const counterScheme = z
      .number()
      .refine((value) => value >= limits.min && value <= limits.max, {
        message: `El valor ingresado pillin tiene que estar entre los valores de ${limits.min} y ${limits.max} `,
      });

    const result = counterScheme.safeParse(valueUser);

    if (result.success) {
      setCount(valueUser);
      setErrorMessage('');
    } else {
      setErrorMessage(result.error.issues[0].message);
    }
    setValueUser(valueUser);
  };

  // Valida y aplica el nuevo valor máximo si es válido respecto al mínimo actual
  const sendMaxValue = () => {
    const sendScheme = z.number().min(inputs.min, {
      message: `El valor máximo no puede ser menor que el mínimo actual (${inputs.min})`,
    });

    const result = sendScheme.safeParse(inputs.max);

    if (result.success) {
      // Se actualiza solo el valor máximo, manteniendo el mínimo existente
      setLimits((preMax) => ({ ...preMax, max: inputs.max }));
      setErrorMessage('');
      setClicks((clicks) => clicks + 1);
    } else {
      setErrorMessage(result.error.issues[0].message);
    }
  };

  // Valida y aplica el nuevo valor mínimo si es válido respecto al máximo actual
  const sendMinValue = () => {
    const sendScheme = z.number().max(inputs.max, {
      message: `El valor minimo no puede ser mayor que el maximo actual (${inputs.max})`,
    });

    const result = sendScheme.safeParse(inputs.min);

    if (result.success) {
      // Se actualiza solo el valor mínimo, manteniendo el máximo existente
      setLimits((preMin) => ({ ...preMin, min: inputs.min }));
      setErrorMessage('');
      setClicks((clicks) => clicks + 1);
    } else {
      setErrorMessage(result.error.issues[0].message);
    }
  };

  // Colores condicionales para mostrar si el número es positivo, negativo o cero
  const currentColor = count > 0 ? 'green' : count < 0 ? 'red' : '';

  // Colores de los botones según si pueden usarse o no
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
        <button onClick={() => reset()}>Reset</button>
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
          onChange={(e) => {
            setInputs((prevMax) => ({
              ...prevMax,
              max: Number(e.target.value),
            }));
          }}
        />
        <button onClick={sendMaxValue}>Valor Maximo Click</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Las veces que hiciste click {clicks} en los botones pillin</p>
    </>
  );
}

export default App;
