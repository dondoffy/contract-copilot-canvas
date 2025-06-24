
import React, { useState } from 'react';
import { Send, FileText, Plus, History, Settings, Sparkles, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  contractType?: string;
}

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: number;
}

const contractTemplates: ContractTemplate[] = [
  { id: '1', name: 'Employment Agreement', description: 'Standard employment contract template', category: 'HR', popularity: 95 },
  { id: '2', name: 'Service Agreement', description: 'Professional services contract', category: 'Business', popularity: 88 },
  { id: '3', name: 'NDA', description: 'Non-disclosure agreement', category: 'Legal', popularity: 92 },
  { id: '4', name: 'Partnership Agreement', description: 'Business partnership contract', category: 'Business', popularity: 76 },
  { id: '5', name: 'Rental Agreement', description: 'Property rental contract', category: 'Real Estate', popularity: 84 },
];

export const ContractCopilot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Contract Assistant. I can help you create, review, and customize legal contracts. What type of contract would you like to work on today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'll help you create that contract. Let me generate a draft based on your requirements. I'll include all the essential clauses and terms that are commonly used for this type of agreement.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">ContractAI</h1>
              <p className="text-sm text-slate-500">Legal Copilot</p>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={() => setMessages([messages[0]])}>
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Popular Templates</h3>
              <div className="space-y-2">
                {contractTemplates.map((template) => (
                  <Card key={template.id} className="p-3 hover:bg-slate-50 cursor-pointer transition-colors border-slate-200">
                    <div className="flex items-start gap-3">
                      <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{template.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{template.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                          <span className="text-xs text-slate-400">{template.popularity}% used</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Recent Contracts</h3>
              <div className="space-y-2">
                {['Service Agreement - Tech Co.', 'Employment Contract - Marketing', 'NDA - Project Alpha'].map((contract, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                    <History className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600 truncate">{contract}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-slate-200">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Contract Assistant</h2>
              <p className="text-sm text-slate-500">AI-powered legal document creation</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className={`max-w-2xl ${message.type === 'user' ? 'order-first' : ''}`}>
                  <Card className={`p-4 ${message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none' 
                    : 'bg-white border-slate-200'
                  }`}>
                    <p className={`${message.type === 'user' ? 'text-white' : 'text-slate-700'}`}>
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </Card>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">U</span>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <Card className="p-4 bg-white border-slate-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t border-slate-200 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe the contract you need or ask me anything about legal documents..."
                  className="min-h-[52px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              AI can make mistakes. Please review all generated contracts with legal counsel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
