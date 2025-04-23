import { useState } from 'react'
import './App.css'
import ChatBox from './components/ChatBox'
import RantToEmail from './components/RantToEmail'
import SendEmail from './components/SendEmail'

function App() {
  const [step, setStep] = useState('rant') // 'rant', 'email', 'sent'
  const [emailContent, setEmailContent] = useState('')

  const handleRantComplete = (email) => {
    setEmailContent(email);
    setStep('email');
  }

  const handleSendComplete = () => {
    setStep('sent');
  }

  const handleReset = () => {
    setEmailContent('');
    setStep('rant');
  }

  return (
    <div className="app-container">
      <header>
        <h1>Dear Bobbot</h1>
        <p className="subtitle">Transform your Reds fan frustration into respectful emails</p>
      </header>

      <main>
        {step === 'rant' && (
          <ChatBox onComplete={handleRantComplete} />
        )}
        
        {step === 'email' && (
          <RantToEmail 
            emailContent={emailContent} 
            onSend={handleSendComplete} 
            onBack={handleReset} 
          />
        )}
        
        {step === 'sent' && (
          <SendEmail onReset={handleReset} />
        )}
      </main>

      <footer>
        <p>A cathartic app for Cincinnati Reds fans</p>
      </footer>
    </div>
  )
}

export default App
