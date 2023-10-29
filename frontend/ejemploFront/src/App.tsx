import { useState } from 'react';
import './App.css'
import { GradeBttn } from './components/GradeBttn';

const api = import.meta.env.VITE_API_URL;
function App() {
  const [message, setMessage] = useState<string>('');

  const onClick = async () => {
    const res = await fetch(`${api}/`);
    const { message: msg } = await res.json();
    setMessage(msg);
  };
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <h1>{message !== '' ? message : 'Texto default'}</h1>
      <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={onClick} style={{ width: '45%' }}>Peticion</button>
        <GradeBttn 
          style={{ width: '45%' }} 
          onMessageChange={ (msg) => setMessage(msg) } 
        />
      </div>
    </div>
  )
}

export default App
