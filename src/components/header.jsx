import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  // Removed Clerk state and hooks

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">
          {/* Simplified: Always show Login button for now */}
          <Button variant="outline" onClick={() => alert("Login feature disabled")}>
            Login
          </Button>

          {/* Removed user-based buttons and UserButton */}

          {/* Example static Post a Job button */}
          <Link to="/post-job">
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
