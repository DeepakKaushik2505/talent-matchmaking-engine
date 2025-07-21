import { toast } from 'sonner';
import { useTalentStore } from "@/store/index";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddTalent = () => {
  const { register, handleSubmit, reset } = useForm();
  const addTalent = useTalentStore((state) => state.addTalent);

  const onSubmit = (data) => {
    const newTalent = {
      ...data,
      skills: data.skills.split(',').map(skill => skill.trim()),
    };
    
    addTalent(newTalent);
    reset();
    
    toast.success('Talent Added Successfully', {
      description: `${newTalent.name} has been added to your talent pool.`,
      action: {
        label: 'View Talents',
        onClick: () => (window.location.href = '/talent-list'),
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-card rounded-xl shadow-lg border border-border">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Add New Talent
        </h1>
        <p className="text-muted-foreground text-lg">
          Fill in the details to add a new talent to your network
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Name
            </label>
            <Input
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="h-12 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Location
            </label>
            <Input
              {...register("city", { required: true })}
              placeholder="Delhi, Mumbai, etc."
              className="h-12 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Skills
            </label>
            <Input
              {...register("skills", { required: true })}
              placeholder="Write your skills (comma separated)"
              className="h-12 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Budget (in thousands)
            </label>
            <Input
              type="number"
              {...register("budget", { required: true })}
              placeholder="50, 100, 150 etc."
              className="h-12 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-muted-foreground">
              Availability
            </label>
            <Input
              {...register("availability", { required: true })}
              placeholder=""
              className="h-12 text-lg"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          Add Talent
        </Button>
      </form>
    </div>
  );
};

export default AddTalent;