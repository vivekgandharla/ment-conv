
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Heart, MessageSquare, Share2, UserCircle, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  postedAt: string;
  category: {
    name: string;
    color: "serenity" | "mindful" | "calm" | "wellness" | "support" | "healing";
  };
  commentCount: number;
  likeCount: number;
  isAnonymous?: boolean;
}

interface DiscussionCardProps {
  discussion: Discussion;
  className?: string;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ discussion, className }) => {
  return (
    <div 
      className={cn(
        "card-glass rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <Link to={`/discussions/${discussion.id}`}>
          <Badge variant={discussion.category.color}>
            {discussion.category.name}
          </Badge>
        </Link>
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>{discussion.postedAt}</span>
        </div>
      </div>
      
      <Link 
        to={`/discussions/${discussion.id}`}
        className="block mt-3 group"
      >
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-serenity-600 dark:group-hover:text-serenity-400 transition-colors">
          {discussion.title}
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400 line-clamp-3">
          {discussion.excerpt}
        </p>
      </Link>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {discussion.isAnonymous ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-slate-500" />
              </div>
              <div className="ml-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Anonymous
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              {discussion.author.avatar ? (
                <img 
                  src={discussion.author.avatar} 
                  alt={discussion.author.name}
                  className="w-8 h-8 rounded-full object-cover" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-serenity-100 dark:bg-serenity-900 flex items-center justify-center">
                  <span className="text-sm font-medium text-serenity-800 dark:text-serenity-300">
                    {discussion.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-2 flex items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {discussion.author.name}
                </span>
                {discussion.author.isVerified && (
                  <Shield className="h-3 w-3 ml-1 text-serenity-500" />
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-slate-500 hover:text-serenity-500 transition-colors">
            <Heart className="h-4 w-4" />
            <span className="text-xs">{discussion.likeCount}</span>
          </button>
          <button className="flex items-center gap-1 text-slate-500 hover:text-serenity-500 transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs">{discussion.commentCount}</span>
          </button>
          <button className="text-slate-500 hover:text-serenity-500 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionCard;
