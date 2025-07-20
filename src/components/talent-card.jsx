import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Heart as HeartFill } from "lucide-react";

const TalentCard = ({ data }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative rounded-2xl shadow-md p-4 w-full sm:w-64 flex flex-col justify-between gap-3 bg-card text-card-foreground border border-border min-h-[20rem] sm:min-h-[21rem]">
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 left-3 text-destructive"
        aria-label="Like talent"
      >
        {liked ? <HeartFill size={22} fill="currentColor" /> : <Heart size={22} />}
      </button>

      <div className="flex-grow flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{data.name}</h3>
        <p className="text-sm text-muted-foreground">{data.city}</p>

        <div className="flex flex-wrap justify-center items-center gap-1 mt-1">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs bg-accent text-accent-foreground rounded px-2 py-1"
            >
              {skill}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-2 text-center">
          <strong>Availability:</strong> {data.availability}
        </p>
      </div>

      <Link
        to={`/talent/${data.id}`}
        className="mt-3 bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded text-sm text-center"
      >
        View Profile
      </Link>
    </div>
  );
};

export default TalentCard;
