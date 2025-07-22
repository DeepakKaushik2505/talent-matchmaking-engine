import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">

         
          <Link to="/add-talent">
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className="mr-2" />
              Post Talent
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
