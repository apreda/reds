import { useState } from 'react';

export default function ChatBox({ onComplete }) {
  const [rant, setRant] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rewrite', {
        method: 'POST',
        body: JSON.stringify({ rant }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error:', errorText);
        throw new Error(`Server error: ${res.status}`);
      }
      
      const data = await res.json();
      onComplete(data.email);
    } catch (error) {
      console.error('Error submitting rant:', error);
      alert('Sorry, there was an error processing your request. Please try again later.\n\nError: ' + error.message);
    } finally {
      setLoading(false);
    }
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
      <div className="button-container">
        <button 
          disabled={loading || !rant.trim()} 
          onClick={handleSubmit}
          className="submit-button"
        >
          {loading ? 'Rewriting...' : 'Rewrite as Email'}
        </button>
      </div>
    </div>
  );
}
