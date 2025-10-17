import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { chatbotAPI } from '../../services/api';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', isUser: false, timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Draggable state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Resizable state
  const [size, setSize] = useState({ width: 320, height: 380 });
  const [resizing, setResizing] = useState(false);
  const resizeStartRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { text, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatbotAPI.sendMessage(text);
      const botMessage: Message = {
        text: response.reply || 'Sorry, I could not understand your request.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: 'Sorry, I am having trouble connecting. Please try again later.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    } else if (resizing) {
      const deltaX = e.clientX - resizeStartRef.current.x;
      const deltaY = e.clientY - resizeStartRef.current.y;
      setSize({
        width: Math.max(250, resizeStartRef.current.w + deltaX),
        height: Math.max(250, resizeStartRef.current.h + deltaY),
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing]);

  const startResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing(true);
    resizeStartRef.current = { x: e.clientX, y: e.clientY, w: size.width, h: size.height };
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
          style={{ bottom: '5rem' }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50 cursor-default`}
          style={{
            bottom: '5rem',
            right: '1.5rem',
            width: isExpanded ? 500 : size.width,
            height: isExpanded ? 500 : size.height,
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          {/* Header - draggable */}
          <div
            className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between cursor-move"
            onMouseDown={handleMouseDown}
          >
            <h3 className="font-semibold">Customer Support</h3>
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-white hover:bg-blue-700 p-1 rounded transition-colors">
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Resize handle */}
          {!isExpanded && (
            <div
              onMouseDown={startResize}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-blue-600 rounded-tr-md"
            />
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
