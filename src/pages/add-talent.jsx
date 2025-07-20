import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AddTalent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    skills: "",
    availability: "",
    budget: "",
    phone: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted talent data:", formData);
    navigate("/"); // Redirect to home
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 px-4 py-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Talent</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: "Name", name: "name" },
          { label: "City", name: "city" },
          { label: "Skills (comma-separated)", name: "skills" },
          { label: "Availability", name: "availability" },
          { label: "Budget", name: "budget" },
          { label: "Phone Number", name: "phone" },
          { label: "Image URL", name: "image" }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md"
              required
            />
          </div>
        ))}

        <div className="text-center">
          <Button type="submit" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTalent;
