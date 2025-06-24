
import React, { useState } from 'react';
import { Save, Eye, AlertTriangle, CheckCircle, Edit3, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ContractSection {
  id: string;
  title: string;
  content: string;
  status: 'complete' | 'needs-review' | 'missing-info';
  recommendations?: string[];
}

export const ContractEditor = () => {
  const [activeVersion, setActiveVersion] = useState<'main' | 'local'>('local');
  const [contractSections, setContractSections] = useState<ContractSection[]>([
    {
      id: '1',
      title: 'Parties',
      content: 'This Service Agreement ("Agreement") is entered into on [DATE] between [CLIENT_NAME], and Aramco Digital Company.',
      status: 'needs-review',
      recommendations: ['Specify the exact date', 'Complete client name and address']
    },
    {
      id: '2',
      title: 'Scope of Services',
      content: 'The Contractor shall provide digital transformation consulting services including but not limited to...',
      status: 'missing-info',
      recommendations: ['Define specific deliverables', 'Add timeline requirements']
    },
    {
      id: '3',
      title: 'Payment Terms',
      content: 'Payment shall be made within thirty (30) days of invoice receipt. Total contract value: [AMOUNT]',
      status: 'needs-review',
      recommendations: ['Specify currency', 'Add payment method details']
    }
  ]);

  const [errors] = useState([
    { type: 'missing', message: 'Contract date not specified in Parties section' },
    { type: 'incomplete', message: 'Payment amount placeholder not filled' },
    { type: 'recommendation', message: 'Consider adding a dispute resolution clause' }
  ]);

  const updateSection = (id: string, content: string) => {
    setContractSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, content } : section
      )
    );
  };

  return (
    <div className="flex h-full bg-slate-800">
      {/* Editor Panel */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="bg-slate-900 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold text-white">Service Agreement</h3>
              <div className="flex gap-2">
                <Button
                  variant={activeVersion === 'local' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveVersion('local')}
                  className={activeVersion === 'local' ? 'bg-blue-600' : 'border-slate-600 text-slate-300'}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Local Copy
                </Button>
                <Button
                  variant={activeVersion === 'main' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveVersion('main')}
                  className={activeVersion === 'main' ? 'bg-green-600' : 'border-slate-600 text-slate-300'}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Live Copy
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Contract Content */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {contractSections.map((section) => (
              <Card key={section.id} className="p-6 bg-slate-900 border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-white">{section.title}</h4>
                  <Badge 
                    variant={section.status === 'complete' ? 'default' : 'secondary'}
                    className={`${
                      section.status === 'complete' 
                        ? 'bg-green-600' 
                        : section.status === 'needs-review'
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                  >
                    {section.status === 'complete' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {section.status !== 'complete' && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {section.status.replace('-', ' ')}
                  </Badge>
                </div>
                
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, e.target.value)}
                  className="min-h-[120px] bg-slate-800 border-slate-600 text-slate-200 focus:border-green-500 mb-4"
                />
                
                {section.recommendations && section.recommendations.length > 0 && (
                  <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">AI Recommendations</span>
                    </div>
                    <ul className="space-y-1">
                      {section.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm text-blue-300">• {rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Side Panel - Errors & Recommendations */}
      <div className="w-80 bg-slate-900 border-l border-slate-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Contract Analysis</h3>
        
        <div className="space-y-4">
          <Card className="p-4 bg-slate-800 border-slate-700">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              Issues Found ({errors.length})
            </h4>
            <div className="space-y-2">
              {errors.map((error, index) => (
                <div key={index} className="text-sm p-2 rounded bg-slate-700 border-l-4 border-red-500">
                  <span className="text-red-400 font-medium capitalize">{error.type}: </span>
                  <span className="text-slate-300">{error.message}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-500" />
              Quick Actions
            </h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 justify-start">
                Auto-fill standard clauses
              </Button>
              <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 justify-start">
                Check compliance
              </Button>
              <Button variant="outline" size="sm" className="w-full border-slate-600 text-slate-300 justify-start">
                Generate summary
              </Button>
            </div>
          </Card>

          <Card className="p-4 bg-slate-800 border-slate-700">
            <h4 className="text-sm font-medium text-white mb-3">Version Control</h4>
            <div className="text-sm text-slate-400 space-y-1">
              <p>Last saved: 2 minutes ago</p>
              <p>Auto-save: Enabled</p>
              <p>Collaborators: 3 online</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
