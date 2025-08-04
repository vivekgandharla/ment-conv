import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useToast } from '../hooks/use-toast';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText, 
  GraduationCap,
  Building,
  Globe,
  Linkedin,
  User,
  AlertCircle
} from 'lucide-react';

// Add new interfaces for enhanced features
interface VerificationStep {
  step: number;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface VerificationBenefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ExpertDirectory {
  id: string;
  name: string;
  profession: string;
  organization: string;
  experience_years: number;
  verified_at: string;
  avatar_url: string | null;
}

interface ExpertVerification {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  profession: string;
  credentials: string;
  experience_years: number;
  license_number: string | null;
  organization: string | null;
  website: string | null;
  linkedin_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export default function ExpertVerification() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [verification, setVerification] = useState<ExpertVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    profession: '',
    credentials: '',
    experience_years: 0,
    license_number: '',
    organization: '',
    website: '',
    linkedin_url: ''
  });

  // Dummy data for showcase
  const verificationSteps: VerificationStep[] = [
    { step: 1, title: 'Basic Information', description: 'Fill in your personal and professional details', completed: true, required: true },
    { step: 2, title: 'Credentials', description: 'Provide your educational and professional credentials', completed: true, required: true },
    { step: 3, title: 'Document Upload', description: 'Upload supporting documents (license, certificates)', completed: false, required: true },
    { step: 4, title: 'Review', description: 'Our team will review your application within 2-3 business days', completed: false, required: false }
  ];

  const verificationBenefits: VerificationBenefit[] = [
    {
      title: 'Expert Badge',
      description: 'Display a verified expert badge on your profile and posts',
      icon: <Award className="h-6 w-6" />
    },
    {
      title: 'Priority Support',
      description: 'Get priority access to community support and resources',
      icon: <CheckCircle className="h-6 w-6" />
    },
    {
      title: 'Expert Directory',
      description: 'Be featured in our expert directory for community members',
      icon: <User className="h-6 w-6" />
    },
    {
      title: 'Content Moderation',
      description: 'Help moderate discussions and provide expert guidance',
      icon: <FileText className="h-6 w-6" />
    }
  ];

  const expertDirectory: ExpertDirectory[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      profession: 'Clinical Psychologist',
      organization: 'Mental Health Institute',
      experience_years: 8,
      verified_at: '2024-01-10T14:30:00Z',
      avatar_url: null
    },
    {
      id: '2',
      name: 'Michael Chen',
      profession: 'Licensed Therapist',
      organization: 'Wellness Center',
      experience_years: 5,
      verified_at: '2024-01-08T11:20:00Z',
      avatar_url: null
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      profession: 'Psychiatrist',
      organization: 'Community Health',
      experience_years: 12,
      verified_at: '2024-01-05T09:15:00Z',
      avatar_url: null
    }
  ];

  useEffect(() => {
    if (user) {
      fetchVerification();
    }
  }, [user]);

  const fetchVerification = async () => {
    try {
      const { data, error } = await supabase
        .from('expert_verifications')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setVerification({
          ...data,
          status: data.status as 'pending' | 'approved' | 'rejected'
        });
        setFormData({
          full_name: data.full_name,
          email: data.email,
          profession: data.profession,
          credentials: data.credentials,
          experience_years: data.experience_years,
          license_number: data.license_number || '',
          organization: data.organization || '',
          website: data.website || '',
          linkedin_url: data.linkedin_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching verification:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('expert_verifications')
        .upsert({
          user_id: user.id,
          full_name: formData.full_name,
          email: formData.email,
          profession: formData.profession,
          credentials: formData.credentials,
          experience_years: formData.experience_years,
          license_number: formData.license_number || null,
          organization: formData.organization || null,
          website: formData.website || null,
          linkedin_url: formData.linkedin_url || null,
          status: 'pending'
        });

      if (error) throw error;

      await fetchVerification();
      toast({
        title: "Application Submitted",
        description: "Your expert verification application has been submitted successfully. We'll review it within 3-5 business days.",
      });
    } catch (error) {
      console.error('Error submitting verification:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocuments(prev => [...prev, ...files]);
    
    toast({
      title: "Documents Uploaded",
      description: `${files.length} document(s) added to your application`,
    });
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentStep = () => {
    if (!verification) return 1;
    if (verification.status === 'approved') return 4;
    if (verification.status === 'rejected') return 3;
    return 3; // Pending review
  };

  const getApplicationProgress = () => {
    const currentStep = getCurrentStep();
    return (currentStep / 4) * 100;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to apply for expert verification.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-screen-100 rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-green-screen-400" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-screen-400">Expert Verification</h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Get verified as a mental health professional and help others with your expertise. 
              Join our community of verified experts making a difference.
            </p>
          </div>
        </div>

          {/* Progress Tracking */}
          {verification && (
            <Card>
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-slate-500">{getApplicationProgress()}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-green-screen-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getApplicationProgress()}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    {verificationSteps.map((step) => (
                      <div key={step.step} className="text-center">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-medium ${
                          step.completed 
                            ? 'bg-green-screen-400 text-white' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}>
                          {step.completed ? '✓' : step.step}
                        </div>
                        <div className="mt-2">
                          <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                            {step.title}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {step.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verification Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Benefits of Verification</CardTitle>
              <CardDescription>
                What you'll get as a verified expert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {verificationBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-green-screen-100 flex items-center justify-center text-green-screen-400">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expert Directory Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Expert Directory</CardTitle>
              <CardDescription>
                Join our community of verified mental health professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {expertDirectory.map((expert) => (
                  <div key={expert.id} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 font-semibold">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {expert.name}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {expert.profession} • {expert.organization}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {expert.experience_years} years experience
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Application Tips</CardTitle>
              <CardDescription>
                How to increase your chances of approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 text-xs font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      Complete All Required Fields
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Ensure all required information is provided accurately
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 text-xs font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      Upload Supporting Documents
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Include licenses, certificates, or other relevant credentials
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-screen-100 flex items-center justify-center text-green-screen-400 text-xs font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      Provide Detailed Information
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Include your experience, specializations, and professional background
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload Section */}
          {!verification && (
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
                <CardDescription>
                  Upload relevant documents to support your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleDocumentUpload}
                      className="hidden"
                      id="document-upload"
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <FileText className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Click to upload documents
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        PDF, DOC, or images (max 10MB each)
                      </div>
                    </label>
                  </div>
                  
                  {documents.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Uploaded Documents:</div>
                      {documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800 rounded">
                          <span className="text-sm">{doc.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeDocument(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

        {/* Existing Application Status */}
        {verification && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Status</CardTitle>
                {getStatusBadge(verification.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                {getStatusIcon(verification.status)}
                <span className="font-medium">
                  {verification.status === 'pending' && 'Your application is under review'}
                  {verification.status === 'approved' && 'Your application has been approved'}
                  {verification.status === 'rejected' && 'Your application was not approved'}
                </span>
              </div>
              
              {verification.status === 'pending' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-yellow-800">
                        We typically review applications within 3-5 business days. You'll receive an email notification once the review is complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {verification.status === 'rejected' && verification.rejection_reason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-red-800">Reason for Rejection</h4>
                      <p className="text-sm text-red-700 mt-1">{verification.rejection_reason}</p>
                    </div>
                  </div>
                </div>
              )}

              {verification.status === 'approved' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-800">
                        Congratulations! You are now a verified expert. Your verified badge will appear on all your posts and comments.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Submitted:</span>
                  <span className="ml-2 text-muted-foreground">
                    {new Date(verification.created_at).toLocaleDateString()}
                  </span>
                </div>
                {verification.reviewed_at && (
                  <div>
                    <span className="font-medium">Reviewed:</span>
                    <span className="ml-2 text-muted-foreground">
                      {new Date(verification.reviewed_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Application Form */}
        {(!verification || verification.status === 'rejected') && (
          <Card>
            <CardHeader>
              <CardTitle>Expert Verification Application</CardTitle>
              <CardDescription>
                Please provide accurate information about your professional credentials and experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your full name"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Professional Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your professional email"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession *</Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                    placeholder="e.g., Clinical Psychologist, Licensed Therapist"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience_years">Years of Experience *</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                    placeholder="Number of years"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentials">Professional Credentials *</Label>
                <Textarea
                  id="credentials"
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  placeholder="List your degrees, certifications, licenses, and relevant qualifications"
                  rows={4}
                  className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license_number">License Number (if applicable)</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                    placeholder="Professional license number"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Current workplace or organization"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://your-website.com"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn Profile</Label>
                  <Input
                    id="linkedin_url"
                    type="url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="bg-green-screen-50 border-green-screen-100 focus:border-green-screen-200"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Important Information</h4>
                    <ul className="text-sm text-blue-700 mt-1 space-y-1">
                      <li>• We verify all credentials and may contact your organization</li>
                      <li>• Applications are reviewed within 3-5 business days</li>
                      <li>• You'll receive email notifications about your application status</li>
                      <li>• Providing false information may result in account suspension</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !formData.full_name || !formData.email || !formData.profession || !formData.credentials || formData.experience_years === 0}
                  className="bg-green-screen-200 hover:bg-green-screen-300 text-green-screen-400"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 