
import React, { useState } from 'react';

type RecordType = {
  id: number;
  company: string;
  amount: number;
  category: string;
  date: string;
};

const App: React.FC = () => {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [company, setCompany] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: RecordType = {
      id: Date.now(),
      company,
      amount: parseFloat(amount),
      category,
      date
    };
    setRecords([newRecord, ...records]);
    setCompany('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>🧠 AI Spending Tracker</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required />
        <input placeholder="Amount (USD)" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        <input placeholder="Category (e.g., Training, Hardware)" value={category} onChange={e => setCategory(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <button type="submit">Add Record</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>💰 Records</h2>
      <ul>
        {records.map(r => (
          <li key={r.id}>
            <strong>{r.company}</strong> - ${r.amount.toLocaleString()} - {r.category} on {r.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
