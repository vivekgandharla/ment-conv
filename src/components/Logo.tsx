
import React from "react";
import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = "md", 
  withText = true 
}) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2 transition-all duration-300", className)}>
      <div className={cn(
        "relative rounded-full flex items-center justify-center",
        "bg-gradient-to-br from-green-400 to-green-600",
        sizes[size]
      )}>
        <Leaf className="h-4/6 w-4/6 text-white animate-float" />
        <span className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse-gentle"></span>
      </div>
      
      {withText && (
        <span className={cn(
          "font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent",
          textSizes[size]
        )}>
          MentConv
        </span>
      )}
    </div>
  );
};

export default Logo;
