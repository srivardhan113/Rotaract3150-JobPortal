'use client';

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
 
  
];

const TeamMember = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <figure
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={member.image}
        alt={`${member.name} - ${member.role}`}
        className="w-full h-96 object-cover"
      />
      <figcaption
        className={`absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent text-white transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-80"
        }`}
      >
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm">{member.role}</p>
        <p
          className={`mt-2 text-sm transition-all duration-300 ${
            isHovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {member.bio}
        </p>
        <div
          className={`flex space-x-4 mt-4 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <FaLinkedin className="text-xl cursor-pointer hover:text-blue-400" />
          <FaTwitter className="text-xl cursor-pointer hover:text-blue-400" />
          <FaEnvelope className="text-xl cursor-pointer hover:text-blue-400" />
        </div>
      </figcaption>
    </figure>
  );
};

const Test = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Test;
