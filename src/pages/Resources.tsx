
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  Headphones, 
  FileText, 
  Search,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Badge from "@/components/ui/Badge";

const Resources: React.FC = () => {
  const resourceCategories = [
    {
      title: "Articles & Guides",
      icon: <BookOpen className="h-6 w-6 text-serenity-600 dark:text-serenity-400" />,
      description: "Expert-written articles on mental health topics",
      color: "bg-serenity-50 dark:bg-serenity-900/30",
      textColor: "text-serenity-700 dark:text-serenity-300",
      resources: [
        { title: "Understanding Anxiety Disorders", type: "Article", time: "10 min read" },
        { title: "The Science of Depression", type: "Guide", time: "15 min read" },
        { title: "Effective Stress Management Techniques", type: "Article", time: "8 min read" },
        { title: "Recognizing Signs of Burnout", type: "Article", time: "12 min read" },
      ]
    },
    {
      title: "Videos & Webinars",
      icon: <Video className="h-6 w-6 text-mindful-600 dark:text-mindful-400" />,
      description: "Visual learning resources from mental health experts",
      color: "bg-mindful-50 dark:bg-mindful-900/30",
      textColor: "text-mindful-700 dark:text-mindful-300",
      resources: [
        { title: "Meditation for Beginners", type: "Video", time: "15 min" },
        { title: "Understanding Cognitive Behavioral Therapy", type: "Webinar", time: "45 min" },
        { title: "Mindfulness Practices for Daily Life", type: "Video Series", time: "30 min" },
        { title: "Building Resilience in Difficult Times", type: "Workshop", time: "60 min" },
      ]
    },
    {
      title: "Podcasts & Audio",
      icon: <Headphones className="h-6 w-6 text-calm-600 dark:text-calm-400" />,
      description: "Listen and learn on the go with expert discussions",
      color: "bg-calm-50 dark:bg-calm-900/30", 
      textColor: "text-calm-700 dark:text-calm-300",
      resources: [
        { title: "The Anxiety Toolkit", type: "Podcast", time: "35 min" },
        { title: "Sleep Meditation for Stress Relief", type: "Guided Audio", time: "20 min" },
        { title: "Conversations on Mental Health", type: "Podcast Series", time: "45 min" },
        { title: "Breathing Exercises for Immediate Calm", type: "Audio Guide", time: "10 min" },
      ]
    },
    {
      title: "Worksheets & Exercises",
      icon: <FileText className="h-6 w-6 text-wellness-600 dark:text-wellness-400" />,
      description: "Practical tools and activities for your wellbeing journey",
      color: "bg-wellness-50 dark:bg-wellness-900/30",
      textColor: "text-wellness-700 dark:text-wellness-300",
      resources: [
        { title: "Daily Gratitude Journal Template", type: "Worksheet", time: "5 min daily" },
        { title: "Anxiety Thought Record", type: "Interactive PDF", time: "Varies" },
        { title: "Self-Compassion Exercises", type: "Activity Guide", time: "15 min" },
        { title: "Goal Setting for Mental Wellness", type: "Workbook", time: "30 min" },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Mental Health Resources
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
              Explore our curated collection of resources to support your mental health journey. 
              From articles and videos to interactive exercises, find the tools you need.
            </p>
            
            <div className="mt-6 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search resources..." 
                  className="w-full md:w-96 pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-serenity-500 transition-all"
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {resourceCategories.map((category, index) => (
              <div 
                key={category.title} 
                className="card-glass rounded-2xl p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <div className="ml-4">
                    <h2 className={`text-xl font-semibold ${category.textColor}`}>
                      {category.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {category.resources.map((resource) => (
                    <div 
                      key={resource.title}
                      className="p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium text-slate-800 dark:text-slate-200">
                          {resource.title}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Badge variant={category.textColor.includes("serenity") ? "serenity" : 
                                          category.textColor.includes("mindful") ? "mindful" : 
                                          category.textColor.includes("calm") ? "calm" : "wellness"}>
                            {resource.type}
                          </Badge>
                          <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                            {resource.time}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  className={`w-full mt-4 ${category.textColor} border border-current`}
                >
                  View All {category.title} <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="card-glass rounded-2xl p-8 bg-gradient-to-br from-serenity-50/80 to-mindful-50/80 dark:from-slate-900 dark:to-slate-800 border-0 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Need Immediate Support?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  If you're experiencing a crisis or need to talk to someone right away, 
                  help is available 24/7 through these resources.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Button 
                      variant="default" 
                      className="flex items-center gap-1 bg-serenity-600 hover:bg-serenity-700"
                    >
                      Crisis Helplines <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                    <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                      Available 24/7
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Button 
                      variant="default" 
                      className="flex items-center gap-1 bg-mindful-600 hover:bg-mindful-700"
                    >
                      Text Support Services <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                    <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
                      Text-based crisis support
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-serenity-400/20 to-mindful-400/20 flex items-center justify-center animate-pulse-gentle">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-serenity-500/30 to-mindful-500/30 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-serenity-600/40 to-mindful-600/40 flex items-center justify-center">
                      <HeartHandshake className="h-8 w-8 md:h-10 md:w-10 text-serenity-600 dark:text-serenity-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
