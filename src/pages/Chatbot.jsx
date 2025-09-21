import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

// --- CartView Sub-component ---
const CartView = ({ cart, onRemove }) => {
    if (cart.length === 0) return null;
    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    return (
      <div className="chat-cart-container">
        <h4 className="chat-cart-title">Your Order</h4>
        {cart.map(item => (
          <div key={item.id} className="chat-cart-item">
            <span className="chat-cart-item-name">{item.name} (x{item.quantity || 1})</span>
            <span className="chat-cart-item-price">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
            <button onClick={() => onRemove(item.id)} className="chat-delete-button">×</button>
          </div>
        ))}
        <div className="chat-cart-total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    );
};


// --- The Main Chatbot Component ---
export default function Chatbot({ navigate, cart, addToCart, removeFromCart, restaurants = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); 
  const [messages, setMessages] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [userInput, setUserInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      startConversation();
    }
  }, [isOpen]);

  useEffect(scrollToBottom, [messages]);

  const startConversation = () => {
    setMessages([{ from: 'bot', text: "Hello! Which restaurant would you like?" }]);
    setStep(1);
    setSelectedRestaurant(null);
  };

  const processUserInput = (input) => {
    const lowerInput = input.toLowerCase().trim();
    if (step === 1) {
      // --- IMPROVED LOGIC: Check if input INCLUDES a restaurant name ---
      const foundRestaurant = restaurants.find(res => lowerInput.includes(res.name.toLowerCase()));
      if (foundRestaurant) {
        setSelectedRestaurant(foundRestaurant);
        setMessages(prev => [...prev, { from: 'bot', text: `Great choice! What would you like from ${foundRestaurant.name}?` }]);
        setStep(2);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: "Sorry, I don't recognize that restaurant. Please pick one from the list." }]);
      }
    } else if (step === 2 && selectedRestaurant) {
      if (['checkout', 'done', 'pay'].includes(lowerInput)) {
        if (cart.length === 0) {
           setMessages(prev => [...prev, { from: 'bot', text: "Your cart is empty. Please add an item before checking out." }]);
           return;
        }
        const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2);
        setMessages(prev => [...prev, { from: 'bot', text: `Your final order costs $${total}. Ready to checkout?` }]);
        setStep(3);
        return;
      }
      
      // --- IMPROVED LOGIC: Check if input INCLUDES an item name ---
      const foundItem = selectedRestaurant.items.find(item => lowerInput.includes(item.name.toLowerCase()));
      if (foundItem) {
        addToCart(foundItem); // Use the function from props (expects full item shape)
        setMessages(prev => [...prev, { from: 'bot', text: `Added ${foundItem.name}. Anything else?` }]);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: "Sorry, I can't find that item. Please choose from the list." }]);
      }
    } else if (step === 3) {
      if (['yes', 'ok', 'confirm'].some(term => lowerInput.includes(term))) {
        setMessages(prev => [...prev, { from: 'bot', text: "Perfect! Redirecting you to payment..." }]);
        setStep(4);
        setTimeout(() => {
          if (navigate) navigate('/payment');
          setIsOpen(false);
          startConversation();
        }, 1500);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: "No problem. You can add more items or type 'checkout'." }]);
        setStep(2);
      }
    }
  };
  
  const handleFormSubmit = (e) => {
      e.preventDefault();
      if(!userInput.trim()) return;
      setMessages(prev => [...prev, { from: 'user', text: userInput }]);
      processUserInput(userInput);
      setUserInput('');
  };
  
  const handleOptionClick = (text) => {
      setMessages(prev => [...prev, { from: 'user', text }]);
      processUserInput(text);
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-status-dot"></div>
            <h3>NutriEats Assistant</h3>
          </div>
          <button onClick={toggleChat} className="chat-close-button">×</button>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-container ${msg.from === 'user' ? "user" : ""}`}>
              <div className={`chat-message ${msg.from === 'user' ? "user" : "bot"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <CartView cart={cart} onRemove={removeFromCart} />
           <div className="chat-options-container">
            {step === 1 && restaurants.map(res => (
              <button key={res.id} className="chat-option-button" onClick={() => handleOptionClick(res.name)}>
                {res.name}
              </button>
            ))}
            {step === 2 && selectedRestaurant?.items.map(item => (
              <button key={item.id} className="chat-option-button" onClick={() => handleOptionClick(item.name)}>
                {item.name}
              </button>
            ))}
             {step === 2 && cart.length > 0 && (
                 <button className="chat-option-button checkout" onClick={() => handleOptionClick('checkout')}>
                    Checkout
                 </button>
             )}
          </div>
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleFormSubmit} className="chat-input-form">
            <input 
                type="text" 
                className="chat-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={step <= 2 ? "Add item or type 'checkout'" : "Type 'yes' to confirm"}
                disabled={step >= 4}
            />
            <button type="submit" className="chat-send-button" disabled={!userInput.trim() || step >= 4}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"></path></svg>
            </button>
        </form>
      </div>
      <button className={`chat-bubble ${isOpen ? "open" : ""}`} onClick={toggleChat}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
    </>
  );
};