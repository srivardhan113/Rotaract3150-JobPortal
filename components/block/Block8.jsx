const Block8 = () => {
  const blockContent = [
        {
          id: 1,
          icon: "icon-drawing",
          title: "Register With Us",
          text: `Join Rotaract to unlock career opportunities, expand your network, and contribute to meaningful community service.`,
        },
        {
          id: 2,
          icon: "icon-process",
          title: "Create Your Profile",
          text: `Showcase your skills, achievements, and your journey as a proud Rotaractor.`,
        },
        {
          id: 3,
          icon: "icon-task",
          title: "Upload Your Resume",
          text: `Share your resume to highlight your professional expertise and Experiences.`,
        },
        {
          id: 4,
          icon: "icon-one-finger-click",
          title: "Now Take a Rest",
          text: `Relax while Rotaract connects you with opportunities that match your passion and potential.`,
        },
      ];
      
  return (
    <>
      {blockContent.map((item) => (
        <div className="col-lg-3 col-md-6 col-sm-12" key={item.id}>
          <div className="work-block -type-4">
            <div className="icon-wrap">
              <span className={`icon ${item.icon}`}></span>
            </div>

            <h5 className="title">{item.title}</h5>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block8;
