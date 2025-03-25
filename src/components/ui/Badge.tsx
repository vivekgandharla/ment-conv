
import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = 
  | "default" 
  | "secondary" 
  | "outline" 
  | "serenity" 
  | "mindful" 
  | "calm" 
  | "wellness" 
  | "support" 
  | "healing";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = "default", 
  className, 
  children 
}) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-primary/50 text-foreground",
    serenity: "bg-serenity-100 text-serenity-800 dark:bg-serenity-900 dark:text-serenity-100",
    mindful: "bg-mindful-100 text-mindful-800 dark:bg-mindful-900 dark:text-mindful-100",
    calm: "bg-calm-100 text-calm-800 dark:bg-calm-900 dark:text-calm-100",
    wellness: "bg-wellness-100 text-wellness-800 dark:bg-wellness-900 dark:text-wellness-100",
    support: "bg-support-100 text-support-800 dark:bg-support-900 dark:text-support-100",
    healing: "bg-healing-100 text-healing-800 dark:bg-healing-900 dark:text-healing-100",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all hover:scale-105",
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
