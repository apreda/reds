import { useState } from 'react';

export default function RantToEmail({ emailContent, onSend, onBack }) {
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSend = async () => {
    if (!email || !name) return;
    
    setSending(true);
    try {
      const res = await fetch('http://localhost:3001/send', {
        method: 'POST',
        body: JSON.stringify({ 
          emailText: emailContent,
          senderName: name,
          senderEmail: email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      if (data.success) {
        onSend();
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="email-preview">
      <h2>Your Rewritten Email</h2>
      <div className="email-content">
        {emailContent}
      </div>
      
      <div className="sender-info">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="sender-input"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="sender-input"
        />
      </div>
      
      <div className="action-buttons">
        <button onClick={onBack} className="back-button">
          Back to Rant
        </button>
        <button 
          onClick={handleSend} 
          disabled={sending || !email || !name}
          className="send-button"
        >
          {sending ? 'Sending...' : 'Send to Bob'}
        </button>
      </div>
    </div>
  );
}
