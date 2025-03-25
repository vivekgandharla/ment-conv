
import React from "react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface Category {
  id: string;
  name: string;
  color: "serenity" | "mindful" | "calm" | "wellness" | "support" | "healing";
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
        Categories
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all duration-200",
            selectedCategory === null
              ? "bg-serenity-100 text-serenity-800 dark:bg-serenity-900/50 dark:text-serenity-100"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          )}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-200",
              selectedCategory === category.id
                ? `bg-${category.color}-100 text-${category.color}-800 dark:bg-${category.color}-900/50 dark:text-${category.color}-100`
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            )}
          >
            {category.name}
            <Badge 
              variant={selectedCategory === category.id ? category.color : "default"} 
              className={cn(
                "ml-1 min-w-5 flex items-center justify-center",
                selectedCategory === category.id
                  ? `bg-${category.color}-200 text-${category.color}-800 dark:bg-${category.color}-800 dark:text-${category.color}-100`
                  : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
              )}
            >
              {category.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
