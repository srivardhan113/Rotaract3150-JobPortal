import React from "react";
import { FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";

const TeamMembers = [
  {
    id: 1,
    name: "Rtr. Sri Vardhan Yeluri",
    role: "District Director of Professional Development",
    bio: "Serving the World means serving the Soul",
    image: "/images/srivardhan.jpg",
    linkedin: "https://www.linkedin.com/in/srivardhan",
    instagram: "https://www.instagram.com/srivardhan_yeluri/",  // Changed from Instagram to instagram
    email: "mailto:srivardhan.rotaract@gmail.com",
  },
  {
    id: 2,
    name: "Rtr. Rtn. Vineela Siddineni",
    role: "District Rotaract Representative",
    bio: "The best way to find yourself is to lose yourself in the service of others",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQFjyDAWBrgR2w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1681649322229?e=2147483647&v=beta&t=lPzHngBTkD7xiVKPHU7RsgykuUKuEkmtnpmPHzFa2Ac",
    linkedin: "https://www.linkedin.com/in/vineela-siddineni",
    instagram: "https://www.instagram.com/vineelanaidu_siddineni/",  // Changed from Instagram to instagram
    email: "mailto:vineelasiddineni@gmail.com ",
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
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
          )}
          {member.email && (
            <a href={member.email} target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="icon" />
            </a>
          )}
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
          {TeamMembers.map((member) => (
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