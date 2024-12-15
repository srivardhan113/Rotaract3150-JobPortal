import React, { useState } from "react";
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
  {
    id: 3,
    name: "Mike Johnson",
    role: "Lead Developer",
    bio: "Full-stack developer with 10+ years of experience.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Sarah Lee",
    role: "UX Designer",
    bio: "Creating intuitive and beautiful user experiences.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
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
    <section className="py-5 bg-light">
      <div className="container mx-auto p-2">
        <h2 className="text-3xl font-bold text-center mb-4">Our Team</h2>
        <div className="row justify-content-center g-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="col">
              <TeamMember member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
