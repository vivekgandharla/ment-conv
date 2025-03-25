
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  ExternalLink, 
  Download, 
  Heart, 
  Video, 
  Headphones, 
  FileText,
  Brain,
  Leaf,
  Music 
} from "lucide-react";

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-sm font-medium mb-4">
              Curated Resources
            </span>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
              Mental Health Resources
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Access our collection of trusted resources to support your mental health journey,
              from articles and books to videos and guided meditations.
            </p>
          </div>
          
          {/* Resource Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="card-glass rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Articles & Books
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Expert-written resources to understand mental health
              </p>
            </div>
            
            <div className="card-glass rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                <Video className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Videos & Podcasts
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Multimedia content from mental health professionals
              </p>
            </div>
            
            <div className="card-glass rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                Exercises & Practices
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Guided activities to support your mental wellbeing
              </p>
            </div>
          </div>
          
          {/* Featured Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Featured Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-glass rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="h-48 bg-gradient-to-r from-green-400 to-green-300 flex items-center justify-center">
                  <FileText className="h-20 w-20 text-white/80" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="serenity">
                      Anxiety
                    </Badge>
                    <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                    Understanding and Managing Anxiety: A Comprehensive Guide
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    This guide explains the science behind anxiety and offers practical strategies for managing symptoms and building resilience.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>Read Guide</span>
                  </Button>
                </div>
              </div>
              
              <div className="card-glass rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: "500ms" }}>
                <div className="h-48 bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center">
                  <Headphones className="h-20 w-20 text-white/80" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant="mindful">
                      Depression
                    </Badge>
                    <Heart className="h-5 w-5 text-slate-400 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
                    Therapeutic Podcast Series: Navigating Depression
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    A six-part podcast series featuring therapists and individuals sharing stories and strategies for managing depression.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white flex items-center justify-center gap-2">
                    <Headphones className="h-4 w-4" />
                    <span>Listen Now</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Downloadable Resources */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Downloadable Resources
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="calm">
                    Self-Care
                  </Badge>
                  <Download className="h-5 w-5 text-slate-400 cursor-pointer hover:text-green-500 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  30-Day Self-Care Challenge Workbook
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  A printable workbook with daily self-care activities and reflection prompts.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>PDF • 24 pages</span>
                  <span>3.2 MB</span>
                </div>
              </div>
              
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "700ms" }}>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="wellness">
                    Stress
                  </Badge>
                  <Download className="h-5 w-5 text-slate-400 cursor-pointer hover:text-green-500 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Stress Management Toolkit
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Evidence-based techniques for managing stress, including breathing exercises and cognitive reframing.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>PDF • 18 pages</span>
                  <span>2.8 MB</span>
                </div>
              </div>
              
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "800ms" }}>
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="support">
                    Relationships
                  </Badge>
                  <Download className="h-5 w-5 text-slate-400 cursor-pointer hover:text-green-500 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-slate-200">
                  Healthy Boundaries Worksheet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                  Exercises to help identify, set, and maintain healthy boundaries in relationships.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>PDF • 12 pages</span>
                  <span>1.5 MB</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Guided Practices */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Guided Practices
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "900ms" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                    <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-slate-800 dark:text-slate-200">
                      5-Minute Mindfulness Meditation
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                      A brief guided meditation perfect for beginners or busy schedules.
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mb-3">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">5:23</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Music className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card-glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: "1000ms" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0">
                    <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-slate-800 dark:text-slate-200">
                      Progressive Muscle Relaxation
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
                      Reduce physical tension and anxiety with this guided relaxation technique.
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mb-3">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">15:42</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Music className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Resources Request Box */}
          <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8 text-center animate-fade-in" style={{ animationDelay: "1100ms" }}>
            <h2 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-200">
              Looking for something specific?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
              If you're looking for resources on a particular topic that you don't see here,
              let us know and our team will curate relevant materials.
            </p>
            <Button 
              className="bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300 text-white shadow-md hover:shadow-lg"
            >
              Request Resources
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
