const FaqChild = () => {
  return (
    <>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item accordion block active-block">
          <h2 className="accordion-header">
            <button
              className="acc-btn accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
            >
              What is Rotaract 3150?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="content text-justify">
                <p>
                  Rotaract 3150 is a youth-led organization that focuses on empowering young individuals to become leaders in their communities. It is a part of Rotary International, and we aim to make a difference through community service, professional development, and fostering a global network of young leaders.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item accordion block active-block">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button acc-btn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              How can I become a member of Rotaract 3150?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="content text-justify">
                <p>
                  Becoming a member of Rotaract 3150 is simple! You can reach out to us via contact page details, through social media, or by checking with your local Rotaract club within District 3150. We encourage all young individuals, between the ages of 18 to 30, who are passionate about service and leadership to apply.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item accordion block active-block">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button acc-btn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              What are the benefits of joining Rotaract 3150?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="content text-justify">
                <p>
                  As a member of Rotaract 3150, you gain access to a global network of like-minded individuals, opportunities for professional growth, leadership development, and the chance to participate in various community service projects. You will also develop valuable skills in event management, project planning, and teamwork, making you a valuable asset to any career.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item accordion block active-block">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button acc-btn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              What kind of events does Rotaract 3150 organize?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="content text-justify">
                <p>
                  Rotaract 3150 organizes a diverse range of events including community service projects, professional development workshops, leadership training, social activities, and networking events. We also host annual conferences, inter-club competitions, and service trips that allow members to engage with the global Rotaract community.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item accordion block active-block">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button acc-btn collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              How does a Professional Services Director contribute to Rotaract 3150?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="content text-justify">
                <p>
                  A Professional Services Director contributes to Rotaract 3150 by organizing initiatives that enhance the professional development of members. They are responsible for creating and managing workshops, seminars, and networking events to improve skills and career opportunities. Additionally, they collaborate with external organizations to provide mentorship and job placement support. A significant contribution by the Professional Services Director is the development of the Rotaract 3150 Job Portal, which connects members with career opportunities, helping them to advance in their professional journeys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqChild;
