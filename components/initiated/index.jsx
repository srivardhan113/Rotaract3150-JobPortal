import React from "react";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";


const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO & Founder",
    bio: "Passionate about innovation and technology.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "CTO",
    bio: "Expert in AI and machine learning technologies.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
];

const TeamMember = ({ member }) => {
  return (
    <div className="team-member">
      <img src={member.image} alt={`${member.name} - ${member.role}`} />
      <div className="team-member-caption">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
        <p className="bio">{member.bio}</p>
        <div className="social-icons">
          <FaLinkedin className="icon" />
          <FaTwitter className="icon" />
          <FaEnvelope className="icon" />
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="team-section">
      <div className="container mx-auto">
       
        <div className="d-flex">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <TeamMember member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
