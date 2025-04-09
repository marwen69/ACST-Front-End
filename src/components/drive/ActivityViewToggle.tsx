
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, ListFilter } from "lucide-react";

interface ActivityViewToggleProps {
  activeView: "chronological" | "grouped";
  onViewChange: (view: "chronological" | "grouped") => void;
}

const ActivityViewToggle = ({ activeView, onViewChange }: ActivityViewToggleProps) => {
  return (
    <div className="flex gap-2 my-4 animate-fade-in">
      <Button
        onClick={() => onViewChange("chronological")}
        variant={activeView === "chronological" ? "default" : "outline"}
        size="sm"
        className={`transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-2 ${
          activeView === "chronological" ? "shadow-md" : ""
        }`}
      >
        <Clock className="h-4 w-4" />
        <span>Chronological View</span>
      </Button>
      <Button
        onClick={() => onViewChange("grouped")}
        variant={activeView === "grouped" ? "default" : "outline"}
        size="sm"
        className={`transition-all duration-300 hover:translate-y-[-2px] flex items-center gap-2 ${
          activeView === "grouped" ? "shadow-md" : ""
        }`}
      >
        <ListFilter className="h-4 w-4" />
        <span>Grouped by File</span>
      </Button>
    </div>
  );
};

export default ActivityViewToggle;
