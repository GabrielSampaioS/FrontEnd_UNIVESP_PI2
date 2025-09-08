import { useState } from 'react';
import { listarClientes } from '../api/clienteAPI';

function Dashboard() {
  const [aggregateId, setAggregateId] = useState('');
  const [events, setEvents] = useState([]);

  const handleBuscar = async () => {
    const res = await listarClientes(aggregateId);
    setEvents(res.data);
  };

  return (
    <div>
      <input placeholder="Aggregate ID do Cliente" value={aggregateId} onChange={e => setAggregateId(e.target.value)} />
      <button onClick={handleBuscar}>Buscar</button>
      <ul>
        {events.map((e, i) => (
          <li key={i}>{e.event_type} - {JSON.stringify(e.event_data)}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
