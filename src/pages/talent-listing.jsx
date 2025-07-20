import { useEffect, useState } from "react";
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
import { useTalentStore } from "@/store";

const SKILL_OPTIONS = ["React", "Node.js", "UI/UX", "Python", "Figma", "Java"];
const LOCATION_OPTIONS = ["New York", "Mumbai", "London", "Delhi"];

const TalentListing = () => {
  const talents = useTalentStore((state) => state.talents);

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [budget, setBudget] = useState([0, 100]);

  // Hold full talents list once loaded from zustand
  const [allTalents, setAllTalents] = useState([]);

  // Filtered talents to show on UI
  const [filteredTalents, setFilteredTalents] = useState([]);

  // Fetch talents from zustand and store them locally
  useEffect(() => {
    setAllTalents(talents);
  }, [talents]);

  // Filter logic — only filter if any filter/search is applied
  useEffect(() => {
    const noFiltersApplied =
      !searchQuery && !location && !skill && budget[0] === 0 && budget[1] === 100;

    if (noFiltersApplied) {
      // Show all talents if no filter is applied
      setFilteredTalents(allTalents);
      return;
    }

    // Otherwise filter
    const filtered = allTalents.filter((talent) => {
      const matchesSearch =
        talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talent.skills.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesLocation = location ? talent.city === location : true;
      const matchesSkill = skill
        ? talent.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
        : true;

      const matchesBudget =
        parseInt(talent.budget) >= budget[0] &&
        parseInt(talent.budget) <= budget[1];

      return matchesSearch && matchesLocation && matchesSkill && matchesBudget;
    });

    setFilteredTalents(filtered);
  }, [allTalents, searchQuery, location, skill, budget]);

  const onSearch = (e) => {
    e.preventDefault();
    const val = e.target["search-query"].value;
    setSearchQuery(val);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setSkill("");
    setBudget([0, 100]);
  };

  return (
    <div className="px-6 pt-8 max-w-[1500px] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Find Talent</h1>

      {/* Search Bar */}
      <form onSubmit={onSearch} className="flex gap-2 mb-6">
        <Input
          name="search-query"
          placeholder="Search by name or skill..."
          defaultValue={searchQuery}
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-8">
        {/* Location Filter */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {LOCATION_OPTIONS.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Skill Filter */}
        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Skill" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SKILL_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Budget Filter */}
        <div className="flex-1 min-w-[250px]">
          <p className="text-sm mb-2">
            Budget: ₹{budget[0]}k – ₹{budget[1]}k
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
