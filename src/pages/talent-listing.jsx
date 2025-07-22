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

const SKILL_OPTIONS = [
  "Photography",
  "Videography",
  "Dance",
  "Visual Art",
  "Fitness",
  "Voice Over",
  "Music",
  "Writing",
  "Design",
  "Development",
];
const LOCATION_OPTIONS = [
  "Noida",
  "Mumbai",
  "Kolkata",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
];

const TalentListing = () => {
  const talents = useTalentStore((state) => state.talents);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [budget, setBudget] = useState([0, 200]);

  const [filteredTalents, setFilteredTalents] = useState(talents);

  useEffect(() => {
    let result = [...talents];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((talent) =>
        talent.name.toLowerCase().includes(query)
      );
    }

    if (location) {
      result = result.filter((talent) => talent.city === location);
    }

    if (skill) {
      result = result.filter((talent) =>
        talent.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
      );
    }

    if (budget[0] !== 0 || budget[1] !== 200) {
      result = result.filter((talent) => {
        const talentBudget = parseInt(talent.budget);
        return talentBudget >= budget[0] && talentBudget <= budget[1];
      });
    }

    setFilteredTalents(result);
  }, [talents, searchQuery, location, skill, budget]);

  const handleSearch = (e) => {
    e.preventDefault();
    const val = e.target["search-query"].value;
    setSearchQuery(val);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setSkill("");
    setBudget([0, 200]);

    document.getElementById("search-query").value = "";
  };

  return (
    <div className="px-6 pt-8 max-w-[1500px] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Find Talent</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <Input
          id="search-query"
          name="search-query"
          placeholder="Search by name..."
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="flex flex-wrap gap-4 items-center mb-8">
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-[180px]">
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

        <Select value={skill} onValueChange={setSkill}>
          <SelectTrigger className="w-[180px]">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTalents.length > 0 ? (
          filteredTalents.map((talent) => (
            <TalentCard key={talent.id} data={talent} />
          ))
        ) : (
          <p className="text-center col-span-full">
            {talents.length === 0
              ? "No talents added yet. Add some talents first!"
              : "No talents match your filters. Try adjusting your search."}
          </p>
        )}
      </div>
    </div>
  );
};

export default TalentListing;
