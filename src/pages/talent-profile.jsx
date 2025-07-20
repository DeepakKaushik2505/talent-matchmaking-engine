import React from "react";
import { useParams } from "react-router-dom";
import talentList from "@/data/talents.json";

const TalentProfilePage = () => {
  const { id } = useParams();
  const talent = talentList.find((t) => t.id === id);

  if (!talent) {
    return <div className="text-center text-destructive mt-20">Talent not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 bg-card text-card-foreground shadow-lg rounded-2xl border border-border">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Image */}
        <img
          src={talent.image}
          alt={talent.name}
          className="w-32 h-32 rounded-full object-cover border border-border"
        />

        {/* Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{talent.name}</h2>
          <p className="text-muted-foreground">{talent.city}</p>

          <div className="mt-4">
            <p className="font-semibold text-foreground mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2 justify-start items-center">
              {talent.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-accent text-accent-foreground text-sm px-3 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 text-muted-foreground space-y-2">
            <p>
              <strong className="text-foreground">Availability:</strong> {talent.availability}
            </p>
            <p>
              <strong className="text-foreground">Budget Range:</strong> {talent.budget}
            </p>
            <p>
              <strong className="text-foreground">Phone:</strong> {talent.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfilePage;
