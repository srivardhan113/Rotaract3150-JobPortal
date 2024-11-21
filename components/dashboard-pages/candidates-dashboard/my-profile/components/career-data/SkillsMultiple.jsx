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
    <div className="default-form">
      <label>Professional Skills</label>
      <div className="form-group">
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
              {skill}
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(skill)} 
                className="remove-btn"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skills-input {
          display: flex;
          flex-direction: column;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .skill-badge {
          background-color: #f0f0f0;
          border-radius: 15px;
          padding: 20px 10px;
          margin: 5px;
          display: flex;
          align-items: center;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ff0000;
          font-weight: bold;
          margin-left: 5px;
          cursor: pointer;
        }

        .remove-btn:hover {
          color: #ff3333;
        }

        input.form-control {
          width: 100%;
          margin-bottom: 25px;
        }
      `}</style>
    </div>
  );
};

export default SkillsMultiple;
