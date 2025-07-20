import { useState } from "react";
import TalentCard from "@/components/talent-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

// Import mock talent data directly
import talentsData from "@/data/talents.json";

// Mock availability options
const AVAIL_OPTIONS = ["Full-Time", "Part-Time", "Contract"];

const TalentListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("");
  const [budget, setBudget] = useState([0, 100]);

  const onSearch = (e) => {
    e.preventDefault();
    const val = e.target["search-query"].value;
    setSearchQuery(val);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setAvailability("");
    setBudget([0, 100]);
  };

  // Apply filters locally
  const filteredTalents = talentsData.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLocation = location ? talent.city === location : true;
    const matchesAvailability = availability
      ? talent.availability === availability
      : true;
    const matchesBudget =
      parseInt(talent.budget) >= budget[0] &&
      parseInt(talent.budget) <= budget[1];

    return (
      matchesSearch &&
      matchesLocation &&
      matchesAvailability &&
      matchesBudget
    );
  });

  return (
    <div className="px-6 pt-8 max-w-[1500px] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Find Talent</h1>

      {/* Search Bar */}
      <form onSubmit={onSearch} className="flex gap-2 mb-6">
        <Input
          name="search-query"
          placeholder="Search by name or skill..."
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-8">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["New York", "Mumbai", "London", "Delhi"].map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger>
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {AVAIL_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex-1">
          <p className="text-sm mb-2">
            Budget: ₹{budget[0]} – ₹{budget[1]}
          </p>
          <Slider
            value={budget}
            onValueChange={setBudget}
            min={0}
            max={200}
            step={10}
            className="w-full"
          />
        </div>

        <Button variant="destructive" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Talent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalents.length > 0 ? (
          filteredTalents.map((talent) => (
            <TalentCard key={talent.id} data={talent} />
          ))
        ) : (
          <p className="text-center col-span-full">No talents found.</p>
        )}
      </div>
    </div>
  );
};

export default TalentListing;
