import { useState } from 'react';

export default function ChatBox({ onComplete }) {
  const [rant, setRant] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/rewrite', {
      method: 'POST',
      body: JSON.stringify({ rant }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    onComplete(data.email);
    setLoading(false);
  };

  return (
    <div className="chat-box">
      <h2 className="section-title">Vent Your Frustration</h2>
      <textarea
        placeholder="Let it out…"
        value={rant}
        onChange={(e) => setRant(e.target.value)}
        rows={6}
        className="rant-input"
      />
      <button 
        disabled={loading || !rant.trim()} 
        onClick={handleSubmit}
        className="submit-button"
      >
        {loading ? 'Rewriting...' : 'Rewrite as Email'}
      </button>
    </div>
  );
}
