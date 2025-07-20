// src/components/TalentCard.jsx
import React, { useState } from "react";
import { Heart, Heart as HeartFill } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import TalentProfileModal from "./view-profile";

const TalentCard = ({ data }) => {
  const [liked, setLiked] = useState(false);

  if (!data) return null;

  return (
    <Dialog>
      <div className="relative rounded-lg shadow-md p-3 w-full sm:w-52 flex flex-col justify-between gap-2 bg-card text-card-foreground border border-border h-auto sm:h-72 text-center">
        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-2 left-2 text-destructive z-10"
          aria-label="Like talent"
        >
          {liked ? <HeartFill size={20} fill="currentColor" /> : <Heart size={20} />}
        </button>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-center items-center gap-1 mt-3">
          <h3 className="font-semibold text-md">{data.name}</h3>
          <p className="text-xs text-muted-foreground">{data.city}</p>

          <div className="flex flex-wrap justify-center gap-1 mt-1">
            {data.skills?.map((skill) => (
              <span
                key={skill}
                className="text-[10px] bg-accent text-accent-foreground rounded px-2 py-0.5"
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            <strong>Availability:</strong> {data.availability}
          </p>
        </div>

        {/* Dialog Trigger */}
        <DialogTrigger asChild>
          <button
            className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-3 rounded text-xs"
          >
            View Profile
          </button>
        </DialogTrigger>
      </div>

      {/* Modal Content */}
      <DialogContent>
        <TalentProfileModal talentId={data.id} />
      </DialogContent>
    </Dialog>
  );
};

export default TalentCard;
