import React, { useState } from "react";
import { Heart, Heart as HeartFill } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import TalentProfileModal from "./view-profile";

const TalentCard = ({ data }) => {
  const [liked, setLiked] = useState(false);

  if (!data) return null;

  return (
    <Dialog>
      <div id={`talent-card-${data.id}`} className="talent-card">
        <button
          id={`like-btn-${data.id}`}
          onClick={() => setLiked(!liked)}
          className="like-btn"
          aria-label="Like talent"
        >
          {liked ? <HeartFill size={20} /> : <Heart size={20} />}
        </button>

        <div className="talent-content">
          <h3 className="talent-name">{data.name}</h3>
          <p className="talent-location">{data.city}</p>

          <div className="skills-container">
            {data.skills?.map((skill) => (
              <span key={skill} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>

          <div className="talent-meta">
            <p className="talent-availability">
              <span className="meta-label">Availability:</span>{" "}
              {data.availability}
            </p>
            <p className="talent-budget">
              <span className="meta-label">Budget:</span> ₹{data.budget}k
            </p>
          </div>

          <DialogTrigger asChild>
            <button
              id={`view-profile-btn-${data.id}`}
              className="view-profile-btn"
            >
              View Profile
            </button>
          </DialogTrigger>
        </div>

        <DialogContent className="profile-modal">
          <TalentProfileModal talentId={data.id} />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default TalentCard;
