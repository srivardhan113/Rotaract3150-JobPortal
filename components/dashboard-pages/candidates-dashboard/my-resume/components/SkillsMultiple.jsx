'use client'

import { useState } from 'react';

const SkillsMultiple = () => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setSkills([...skills, input.trim()]);
      setInput('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="form-group col-lg-6 col-md-12">
      <label>Skills</label>
      <div className="skills-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="form-control"
          placeholder="Add skills (Press Enter to add)"
        />
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill} <button type="button" onClick={() => handleRemoveSkill(skill)} className="remove-btn">x</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsMultiple;
