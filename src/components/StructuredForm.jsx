import { useState } from 'react';

export default function StructuredForm({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mainComplaint: '',
    offensiveComplaint: '',
    defensiveComplaint: '',
    frustrationReason: '',
    complaintTarget: [],
    signature: '',
    anonymous: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleTargetChange = (target) => {
    setFormData(prev => {
      const newTargets = prev.complaintTarget.includes(target)
        ? prev.complaintTarget.filter(t => t !== target)
        : [...prev.complaintTarget, target];
      
      return {
        ...prev,
        complaintTarget: newTargets
      };
    });
  };

  const handleSubmit = async () => {
    console.log('Submitting structured form data:', formData);
    setLoading(true);
    try {
      console.log('Sending request to /api/rewrite-structured');
      const res = await fetch('/api/rewrite-structured', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error response:', errorText);
        throw new Error(`Server responded with ${res.status}: ${errorText}`);
      }
      
      const data = await res.json();
      console.log('Received response data:', data);
      
      if (data.email) {
        console.log('Calling onComplete with generated email');
        onComplete(data.email);
      } else {
        console.error('Response missing email content:', data);
        alert('Error: The server response was missing the email content.');
      }
    } catch (error) {
      console.error('Error generating email from form:', error);
      alert(`Error generating email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.mainComplaint.trim() !== '';

  return (
    <div className="structured-form">
      <h2 className="section-title">Structured Complaint Form</h2>
      
      <div className="form-field">
        <label htmlFor="mainComplaint">Main Complaint:</label>
        <textarea 
          id="mainComplaint"
          name="mainComplaint"
          value={formData.mainComplaint}
          onChange={handleInputChange}
          rows={3}
          required
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="offensiveComplaint">Offensive Complaint:</label>
        <textarea 
          id="offensiveComplaint"
          name="offensiveComplaint"
          value={formData.offensiveComplaint}
          onChange={handleInputChange}
          rows={2}
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="defensiveComplaint">Defensive Complaint:</label>
        <textarea 
          id="defensiveComplaint"
          name="defensiveComplaint"
          value={formData.defensiveComplaint}
          onChange={handleInputChange}
          rows={2}
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="frustrationReason">Why frustration occurred:</label>
        <textarea 
          id="frustrationReason"
          name="frustrationReason"
          value={formData.frustrationReason}
          onChange={handleInputChange}
          rows={2}
        />
      </div>
      
      <div className="form-field">
        <label>Who is this complaint directed towards:</label>
        <div className="target-options">
          {['Front Office', 'Players', 'Coaching Staff', 'Ballpark Staff'].map(target => (
            <div key={target} className="target-option">
              <input
                type="checkbox"
                id={target.replace(/\s+/g, '-').toLowerCase()}
                checked={formData.complaintTarget.includes(target)}
                onChange={() => handleTargetChange(target)}
              />
              <label htmlFor={target.replace(/\s+/g, '-').toLowerCase()}>
                {target}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-field">
        <label htmlFor="signature">Signature:</label>
        <input
          type="text"
          id="signature"
          name="signature"
          value={formData.signature}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-field checkbox">
        <input
          type="checkbox"
          id="anonymous"
          name="anonymous"
          checked={formData.anonymous}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="anonymous">Remain Anonymous</label>
      </div>
      
      <div className="button-container">
        <button 
          onClick={handleSubmit} 
          disabled={loading || !isFormValid}
          className="submit-button"
        >
          {loading ? 'Generating Email...' : 'Generate Email'}
        </button>
      </div>
    </div>
  );
}
