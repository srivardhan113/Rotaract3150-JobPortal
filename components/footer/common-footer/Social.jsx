const Social = () => {
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/rotaract3150/" },
    { id: 2, icon: "fa-twitter", link: "https://x.com/rotaract_3150?lang=en" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/rotaract_3150/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://in.linkedin.com/company/rotaract-district-3150" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`fab ${item.icon}`}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
