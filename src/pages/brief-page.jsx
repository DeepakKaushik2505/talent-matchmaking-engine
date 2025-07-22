import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const BriefPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Post Your Brief
        </h1>
        <p className="text-xl text-muted-foreground">
          You post your brief and our AI will fetch you talents you want
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Textarea
            className="min-h-[300px] text-lg p-6"
            placeholder="Describe what you're looking for in detail... 
            Example: 'Need a React developer with 5+ years experience in building SaaS products. 
            Must have expertise in TypeScript, Redux, and responsive design. 
            Budget: $50-80/hour. Project duration: 3-6 months.'"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            Submit Brief
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BriefPage;
