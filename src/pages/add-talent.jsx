import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import light from "../../public/light2.png"; // Adjust if needed

const AddTalent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    skills: "",
    availability: "",
    budget: "",
    phone: "",
    image: null,
    portfolio: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));

    if (name === "image" && file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted talent data:", formData);
    navigate("/");
  };

  return (
    <div className="relative py-12 px-4">
      {/* Background layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: `url(${light})` }}
      />

      {/* Foreground form */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-10 bg-card text-card-foreground border border-border shadow-md rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-8 text-center">Add Talent</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two-column input layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Name", name: "name" },
              { label: "City", name: "city" },
              { label: "Skills (comma-separated)", name: "skills" },
              { label: "Availability", name: "availability" },
              { label: "Budget", name: "budget" },
              { label: "Phone Number", name: "phone" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-muted-foreground mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-border bg-background text-foreground px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
              </div>
            ))}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm border border-border bg-background px-4 py-2 rounded-md"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="max-h-40 rounded-md" />
              </div>
            )}
          </div>

          {/* Portfolio Upload - center aligned, full width */}
          <div className="flex justify-center">
            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Upload Portfolio (PDF or Doc)
              </label>
              <input
                type="file"
                name="portfolio"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full text-sm border border-border bg-background px-4 py-2 rounded-md"
              />
            </div>
          </div>

          <div className="text-center pt-6">
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTalent;
