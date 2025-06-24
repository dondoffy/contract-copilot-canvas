
import React, { useState } from 'react';
import { FileText, Star, Search, Filter, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  industry: string;
  complexity: 'Simple' | 'Intermediate' | 'Advanced';
  rating: number;
  downloads: number;
  lastUpdated: string;
  highlightSections: string[];
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Oil & Gas Service Agreement',
    description: 'Comprehensive service agreement template for oil and gas industry operations',
    category: 'Service Agreements',
    industry: 'Oil & Gas',
    complexity: 'Advanced',
    rating: 4.8,
    downloads: 1250,
    lastUpdated: '2024-01-15',
    highlightSections: ['Scope of Work', 'Safety Requirements', 'Payment Terms', 'HSE Compliance']
  },
  {
    id: '2',
    name: 'Digital Transformation Consulting',
    description: 'Standard consulting agreement for digital transformation projects',
    category: 'Consulting',
    industry: 'Technology',
    complexity: 'Intermediate',
    rating: 4.6,
    downloads: 890,
    lastUpdated: '2024-01-20',
    highlightSections: ['Deliverables', 'Timeline', 'IP Rights', 'Confidentiality']
  },
  {
    id: '3',
    name: 'Equipment Maintenance Contract',
    description: 'Maintenance and support agreement for industrial equipment',
    category: 'Maintenance',
    industry: 'Industrial',
    complexity: 'Intermediate',
    rating: 4.7,
    downloads: 675,
    lastUpdated: '2024-01-18',
    highlightSections: ['Service Level Agreement', 'Response Times', 'Parts & Labor', 'Warranty']
  },
  {
    id: '4',
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Standard NDA for protecting confidential business information',
    category: 'Legal',
    industry: 'General',
    complexity: 'Simple',
    rating: 4.9,
    downloads: 2100,
    lastUpdated: '2024-01-22',
    highlightSections: ['Confidential Information', 'Term', 'Permitted Use', 'Return of Information']
  }
];

export const TemplateLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const categories = ['All', 'Service Agreements', 'Consulting', 'Maintenance', 'Legal'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const useTemplate = (template: Template) => {
    console.log('Using template:', template.name);
    // Implementation for using template
  };

  return (
    <div className="flex h-full bg-slate-800">
      {/* Template Library */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Contract Templates</h2>
          
          {/* Search and Filters */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-slate-200 focus:border-green-500"
              />
            </div>
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-green-600' : 'border-slate-600 text-slate-300'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="p-6 bg-slate-900 border-slate-700 hover:bg-slate-800 cursor-pointer transition-colors"
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="bg-blue-600 text-xs">
                        {template.category}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        {template.complexity}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        {template.industry}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {template.rating}
                        </span>
                        <span>{template.downloads} downloads</span>
                      </div>
                      <span>Updated {template.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Template Preview */}
      {selectedTemplate && (
        <div className="w-96 bg-slate-900 border-l border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Template Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedTemplate(null)}
              className="text-slate-400"
            >
              ×
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-md font-medium text-white mb-2">{selectedTemplate.name}</h4>
              <p className="text-sm text-slate-400 mb-4">{selectedTemplate.description}</p>
            </div>
            
            <div>
              <h5 className="text-sm font-medium text-white mb-2">Key Sections to Review</h5>
              <div className="space-y-1">
                {selectedTemplate.highlightSections.map((section, index) => (
                  <div key={index} className="text-sm text-yellow-400 bg-yellow-900/20 px-2 py-1 rounded">
                    • {section}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => useTemplate(selectedTemplate)}
              >
                Use This Template
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-slate-300">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-slate-300">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
