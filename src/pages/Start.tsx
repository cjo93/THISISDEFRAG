import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage for Manual.tsx to pick up (compatibility with existing logic)
    const unitA = {
      name: 'User', // Defaulting as name field is removed from UI
      birthDate: formData.birthDate,
      birthTime: formData.birthTime,
      birthPlace: formData.location,
    };
    localStorage.setItem('defrag_unitA', JSON.stringify(unitA));
    localStorage.setItem('defrag_user_profile', JSON.stringify(unitA));

    // Navigate to Manual/Dashboard
    navigate('/manual');
  };

  return (
    <div className="flex flex-col min-h-screen p-8 justify-center bg-[#fafaf8]">

      {/* Header: Plain English, High Impact */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif italic text-black mb-4 leading-tight">
          The Missing Manual.
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed max-w-[280px] mx-auto">
          Most relationship friction comes from running on different operating systems.
          <br /><br />
          Enter your details to unlock your guide.
        </p>
      </div>

      {/* The Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-gray-600">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="w-full bg-white border border-black/10 p-4 text-black focus:border-black/30 outline-none rounded-sm transition-colors"
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-gray-600">Birth Time</label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
            required
            className="w-full bg-white border border-black/10 p-4 text-black focus:border-black/30 outline-none rounded-sm transition-colors"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-widest text-gray-600">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="e.g. London, UK"
            className="w-full bg-white border border-black/10 p-4 text-black focus:border-black/30 outline-none rounded-sm transition-colors placeholder:text-gray-400"
          />
        </div>

        {/* Action Button: 'Alive' Animation applied */}
        <button
          type="submit"
          className="btn-alive w-full bg-black text-white py-4 font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors mt-4"
        >
          View Manual
        </button>

      </form>
    </div>
  );
};

export default Start;
