// src/components/TalentProfileModal.jsx
import React from "react";
import { useTalentStore } from "@/store/index";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const TalentProfileModal = ({ talentId }) => {
  const getTalentById = useTalentStore((state) => state.getTalentById);
  const talent = getTalentById(talentId);

  if (!talent) {
    return (
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-xl">Talent Not Found</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          Unable to load details for this talent.
        </DialogDescription>
      </DialogHeader>
    );
  }

  return (
    <DialogHeader className="space-y-4">
      <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
        {talent.name}
      </DialogTitle>
      <DialogDescription className="text-[15px] leading-relaxed space-y-2 text-foreground">
        <p><strong>📍 City:</strong> {talent.city}</p>
        <p><strong>💼 Skills:</strong> {talent.skills.join(", ")}</p>
        <p><strong>📆 Availability:</strong> {talent.availability}</p>
        <p><strong>💰 Budget:</strong> ₹{talent.budget}k</p>
        <p><strong>📞 Phone:</strong> {talent.phone}</p>
      </DialogDescription>
    </DialogHeader>
  );
};

export default TalentProfileModal;
