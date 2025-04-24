import { useState } from 'react';

export default function RantToEmail({ emailContent, onSend, onBack }) {
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');
  
  const handleSend = async () => {
    // Clear any previous errors
    setError('');
    
    // Check if user needs to provide information when not anonymous
    if (!isAnonymous && (!email || !name)) {
      setError('Please provide your name and email or choose to send anonymously');
      return;
    }
    
    setSending(true);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({ 
          emailText: emailContent,
          // If anonymous, use placeholder values
          senderName: isAnonymous ? 'Anonymous Reds Fan' : name,
          senderEmail: isAnonymous ? 'anonymous@redsfan.com' : email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      // Check for server errors
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to send email');
      }
      
      const data = await res.json();
      if (data.success) {
        onSend();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setError(`Failed to send email: ${error.message}`);
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
      
      {/* Anonymous option */}
      <div className="anonymous-option">
        <label className="anonymous-label">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="anonymous-checkbox"
          />
          Send Anonymously
        </label>
        <p className="anonymous-info">
          {isAnonymous ? 
            "Your email will be sent anonymously to Phil Castellini." : 
            "Provide your information below to allow for a potential response."}
        </p>
      </div>
      
      {/* Only show sender info if not anonymous */}
      {!isAnonymous && (
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
      )}
      
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}
      
      <div className="action-buttons">
        <button onClick={onBack} className="back-button">
          Back to Rant
        </button>
        <button 
          onClick={handleSend} 
          disabled={sending || (!isAnonymous && (!email || !name))}
          className="send-button"
        >
          {sending ? 'Sending...' : 'Send to Castellini'}
        </button>
      </div>
    </div>
  );
}
