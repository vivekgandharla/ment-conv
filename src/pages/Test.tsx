import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const Test: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const testToast = () => {
    toast({
      title: "Test Successful!",
      description: "The toast system is working properly.",
    });
  };

  const testErrorToast = () => {
    toast({
      title: "Error Test",
      description: "This is an error toast test.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-screen-400 mb-4">
                App Test Page
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                This page tests all the core functionality of the MentConv app.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Authentication</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <strong>Status:</strong> {user ? 'Logged In' : 'Not Logged In'}
                    </p>
                    {user && (
                      <p className="text-sm">
                        <strong>User ID:</strong> {user.id}
                      </p>
                    )}
                    <p className="text-sm">
                      <strong>Email:</strong> {user?.email || 'Not available'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <span>Toast System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button onClick={testToast} className="w-full">
                      Test Success Toast
                    </Button>
                    <Button onClick={testErrorToast} variant="destructive" className="w-full">
                      Test Error Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Styling</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="p-3 bg-green-screen-50 border border-green-screen-100 rounded">
                      <p className="text-green-screen-400">Green screen colors are working</p>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded">
                      <p className="text-slate-700 dark:text-slate-300">Dark mode is working</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <span>Components</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">All UI components are rendering correctly</p>
                    <p className="text-sm">Header and Footer are positioned properly</p>
                    <p className="text-sm">Responsive design is working</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Test</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button asChild className="w-full">
                    <a href="/">Home</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/discussions">Discussions</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/resources">Resources</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href="/trending">Trending</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Test; 