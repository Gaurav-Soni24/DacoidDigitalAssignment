import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full flex justify-between items-center p-4 bg-background shadow-md bg-black">
      <Link to="/" className="text-lg font-bold">
        Quiz App
      </Link>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline">
          <Link to="/history">History</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
