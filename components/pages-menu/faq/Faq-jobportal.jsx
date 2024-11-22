const FaqChild = () => {
    return (
      <>
        <div className="accordion" id="accordionExample">
          {/* Job Portal FAQs */}
          <div className="accordion-item accordion block active-block">
            <h2 className="accordion-header">
              <button
                className="acc-btn accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJobOne"
                aria-expanded="true"
              >
                What is the Rotaract 3150 Job Portal?
              </button>
            </h2>
            <div
              id="collapseJobOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingJobOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="content" style={{ textAlign: "justify" }}>
                  <p>
                    The Rotaract 3150 Job Portal is an online platform designed to connect Rotaract members with career opportunities, internships, and professional development resources. It serves as a bridge between job seekers and employers, helping members advance their careers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item accordion block active-block">
            <h2 className="accordion-header">
              <button
                className="accordion-button acc-btn collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJobTwo"
                aria-expanded="false"
                aria-controls="collapseJobTwo"
              >
                How can I access the Job Portal?
              </button>
            </h2>
            <div
              id="collapseJobTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingJobTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="content" style={{ textAlign: "justify" }}>
                  <p>
                    To access the Job Portal, you need to be a registered member of Rotaract 3150. Once you're a member, you will receive login credentials to access the portal, where you can explore job listings, internships, and other career-related resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item accordion block active-block">
            <h2 className="accordion-header">
              <button
                className="accordion-button acc-btn collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJobThree"
                aria-expanded="false"
                aria-controls="collapseJobThree"
              >
                How often are the job listings updated?
              </button>
            </h2>
            <div
              id="collapseJobThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingJobThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="content" style={{ textAlign: "justify" }}>
                  <p>
                    The job listings on the Rotaract 3150 Job Portal are updated regularly, with new opportunities added as they become available. It is recommended to check the portal frequently to stay up-to-date on the latest job postings and internships.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item accordion block active-block">
            <h2 className="accordion-header">
              <button
                className="accordion-button acc-btn collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJobFour"
                aria-expanded="false"
                aria-controls="collapseJobFour"
              >
                Can I post job opportunities on the portal?
              </button>
            </h2>
            <div
              id="collapseJobFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingJobFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="content" style={{ textAlign: "justify" }}>
                  <p>
                    Yes, employers and Rotaract members can post job opportunities on the portal. To do so, employers must register and submit job details for approval. Once approved, the job listing will be visible to members on the portal.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item accordion block active-block">
            <h2 className="accordion-header">
              <button
                className="accordion-button acc-btn collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseJobFive"
                aria-expanded="false"
                aria-controls="collapseJobFive"
              >
                Is there any cost to use the Job Portal?
              </button>
            </h2>
            <div
              id="collapseJobFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingJobFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="content" style={{ textAlign: "justify" }}>
                  <p>
                    The Rotaract 3150 Job Portal is completely free for all registered members to access. There are no charges for viewing job listings, applying for positions, or using other features of the portal. Employers may have a fee for posting certain listings, which will be clearly stated.
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
  