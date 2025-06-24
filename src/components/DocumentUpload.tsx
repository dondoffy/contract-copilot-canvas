
import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'complete' | 'error' | 'analyzing';
  analysis?: {
    sections: string[];
    missingInfo: string[];
    recommendations: string[];
  };
}

export const DocumentUpload = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const analyzeDocument = (fileName: string): UploadedFile['analysis'] => {
    // Simulate AI document analysis
    const analyses = {
      'service_agreement.pdf': {
        sections: ['Parties', 'Scope of Work', 'Payment Terms', 'Termination'],
        missingInfo: ['Contract execution date', 'Client address', 'Payment amount'],
        recommendations: ['Add force majeure clause', 'Specify governing law', 'Include dispute resolution']
      },
      'contract_draft.docx': {
        sections: ['Introduction', 'Terms & Conditions', 'Signatures'],
        missingInfo: ['Effective date', 'Performance metrics'],
        recommendations: ['Add confidentiality clause', 'Specify deliverables timeline']
      }
    };
    
    return analyses[fileName as keyof typeof analyses] || {
      sections: ['General Terms', 'Obligations', 'Payment'],
      missingInfo: ['Key dates', 'Specific amounts'],
      recommendations: ['Review legal compliance', 'Add standard clauses']
    };
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading'
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === newFile.id ? { ...f, status: 'analyzing' } : f)
        );
        
        toast({
          title: "Document Uploaded",
          description: `${file.name} uploaded successfully. Starting AI analysis...`,
        });

        // Simulate AI analysis
        setTimeout(() => {
          const analysis = analyzeDocument(file.name);
          setUploadedFiles(prev => 
            prev.map(f => f.id === newFile.id ? { 
              ...f, 
              status: 'complete',
              analysis 
            } : f)
          );
          
          toast({
            title: "Analysis Complete",
            description: `Found ${analysis.sections.length} sections and ${analysis.missingInfo.length} items needing attention.`,
          });
        }, 3000);
      }, 2000);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
    toast({
      title: "File Removed",
      description: "Document has been removed from analysis.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'complete': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'analyzing': return 'text-blue-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'analyzing': return <Zap className="w-4 h-4 text-blue-500 animate-pulse" />;
      default: return <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />;
    }
  };

  return (
    <div className="p-6 bg-slate-800 min-h-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-white mb-6">Document Upload & Analysis</h2>
        
        {/* Upload Area */}
        <Card 
          className={`mb-6 border-2 border-dashed transition-colors ${
            isDragging 
              ? 'border-green-500 bg-green-500/10' 
              : 'border-slate-600 bg-slate-900'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload(e.dataTransfer.files);
          }}
        >
          <div className="p-8 text-center">
            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-200 mb-2">
              Upload Contract Documents
            </h3>
            <p className="text-slate-400 mb-4">
              Drag and drop files here, or click to select. AI will analyze and highlight key sections.
            </p>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = '.pdf,.doc,.docx,.txt';
                input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files);
                input.click();
              }}
            >
              Select Files
            </Button>
            <p className="text-xs text-slate-500 mt-2">
              Supported formats: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-200">Uploaded Documents</h3>
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="p-4 bg-slate-900 border-slate-700">
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <Badge variant="outline" className={`text-xs ${getStatusColor(file.status)}`}>
                          {file.status === 'analyzing' ? 'Analyzing...' : file.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-slate-400 hover:text-slate-200"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {file.analysis && file.status === 'complete' && (
                      <div className="mt-3 space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-300 mb-1">Detected Sections</h4>
                          <div className="flex flex-wrap gap-1">
                            {file.analysis.sections.map((section, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-blue-600">
                                {section}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {file.analysis.missingInfo.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-1 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-yellow-500" />
                              Missing Information
                            </h4>
                            <ul className="text-xs text-yellow-400 space-y-1">
                              {file.analysis.missingInfo.map((item, index) => (
                                <li key={index}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {file.analysis.recommendations.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-300 mb-1 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-green-500" />
                              AI Recommendations
                            </h4>
                            <ul className="text-xs text-green-400 space-y-1">
                              {file.analysis.recommendations.map((rec, index) => (
                                <li key={index}>• {rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
