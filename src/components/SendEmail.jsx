import { useEffect } from 'react';

export default function SendEmail({ onReset }) {
  useEffect(() => {
    // Could add analytics tracking or other side effects here
  }, []);

  return (
    <div className="confirmation-screen">
      <h2>Email Sent Successfully!</h2>
      <p>Your message has been sent to the Cincinnati Reds ownership.</p>
      <p>Thank you for sharing your thoughts as a passionate fan.</p>
      
      <button onClick={onReset} className="reset-button">
        Send Another Message
      </button>
    </div>
  );
}
