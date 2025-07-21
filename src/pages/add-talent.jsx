import { useTalentStore } from "@/store/index";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTalent = () => {
  const { register, handleSubmit } = useForm();
  const addTalent = useTalentStore((state) => state.addTalent);

  const onSubmit = (data) => {
    addTalent({
      ...data,
      skills: data.skills.split(',').map(skill => skill.trim()), // Convert comma-separated string to array
    });
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Talent</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("name", { required: true })}
          placeholder="Full Name"
        />
        <Input
          {...register("city", { required: true })}
          placeholder="Location (e.g., New York)"
        />
        <Input
          {...register("skills", { required: true })}
          placeholder="Skills (comma separated, e.g., React, Node.js)"
        />
        <Input
          type="number"
          {...register("budget", { required: true })}
          placeholder="Budget (in thousands)"
        />
        <Input
          {...register("availability", { required: true })}
          placeholder="Availability (e.g., Full-time)"
        />
        <Button type="submit" className="w-full">
          Add Talent
        </Button>
      </form>
    </div>
  );
};

export default AddTalent;