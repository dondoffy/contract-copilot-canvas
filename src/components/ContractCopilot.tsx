
import React, { useState } from 'react';
import { Send, FileText, Plus, Upload, Eye, Download, Save, Users, AlertTriangle, CheckCircle, Edit3, Copy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentUpload } from './DocumentUpload';
import { ContractEditor } from './ContractEditor';
import { TemplateLibrary } from './TemplateLibrary';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

interface ContractVersion {
  id: string;
  name: string;
  type: 'main' | 'local';
  lastModified: Date;
  status: 'draft' | 'review' | 'approved';
}

export const ContractCopilot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Welcome to Aramco Digital Contract Assistant. I can help you create, review, and edit legal contracts. Upload a document for reference, choose a template, or describe what type of contract you need.",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  const [contractVersions] = useState<ContractVersion[]>([
    { id: '1', name: 'Service Agreement v1.2', type: 'main', lastModified: new Date(), status: 'review' },
    { id: '2', name: 'Service Agreement (Local)', type: 'local', lastModified: new Date(), status: 'draft' },
  ]);

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

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'll help you with that contract. I've identified several sections that need your attention and highlighted areas requiring specific information. Would you like me to scan for potential errors or provide recommendations for improvements?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-800">
      {/* Sidebar */}
      <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-900 to-green-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Aramco Digital</h1>
              <p className="text-sm text-green-300">Contract Assistant</p>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white mb-3">
            <Plus className="w-4 h-4 mr-2" />
            New Contract
          </Button>
          
          <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Contract Versions</h3>
              <div className="space-y-2">
                {contractVersions.map((version) => (
                  <Card key={version.id} className="p-3 bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      {version.type === 'main' ? (
                        <Users className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Edit3 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{version.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge 
                            variant={version.type === 'main' ? 'default' : 'secondary'} 
                            className={`text-xs ${version.type === 'main' ? 'bg-green-600' : 'bg-blue-600'}`}
                          >
                            {version.type === 'main' ? 'Live Copy' : 'Local Copy'}
                          </Badge>
                          <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {version.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-800">
                  <AlertTriangle className="w-4 h-4 mr-3 text-yellow-500" />
                  Scan for Errors
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-800">
                  <Zap className="w-4 h-4 mr-3 text-green-500" />
                  Recommendations
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-800">
                  <CheckCircle className="w-4 h-4 mr-3 text-blue-500" />
                  Review Checklist
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Contract Development Suite</h2>
              <p className="text-sm text-slate-400">AI-powered legal document assistance</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Copy className="w-4 h-4 mr-2" />
                Commit Changes
              </Button>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="bg-slate-800 px-6 border-b border-slate-700">
            <TabsList className="bg-slate-900 border-slate-700">
              <TabsTrigger value="chat" className="data-[state=active]:bg-green-600">Chat Assistant</TabsTrigger>
              <TabsTrigger value="editor" className="data-[state=active]:bg-green-600">Contract Editor</TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-green-600">Templates</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex-1 flex flex-col m-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6 bg-gradient-to-br from-slate-900 to-slate-800">
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.type === 'ai' && (
                      <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className={`max-w-2xl ${message.type === 'user' ? 'order-first' : ''}`}>
                      <Card className={`p-4 ${message.type === 'user' 
                        ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white border-none' 
                        : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}>
                        <p>
                          {message.content}
                        </p>
                        <p className={`text-xs mt-2 ${message.type === 'user' ? 'text-green-100' : 'text-slate-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </Card>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-medium">U</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <Card className="p-4 bg-slate-800 border-slate-700">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="bg-slate-900 border-t border-slate-700 p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Describe your contract needs, upload a document, or ask for recommendations..."
                      className="min-h-[52px] bg-slate-800 border-slate-600 text-slate-200 focus:border-green-500 focus:ring-green-500 placeholder:text-slate-400"
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-center">
                  Aramco Digital AI Assistant - All contracts should be reviewed by legal counsel before execution.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="editor" className="flex-1 m-0">
            <ContractEditor />
          </TabsContent>

          <TabsContent value="templates" className="flex-1 m-0">
            <TemplateLibrary />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
