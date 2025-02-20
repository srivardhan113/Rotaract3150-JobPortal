import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import CustomCheckbox from "./customcheckbox";

const ApplyJobModalContent = (props) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Upload CV (pdf)");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      alert('Please upload only PDF or Word documents (.doc, .docx, .pdf)');
      e.target.value = null;
      return;
    }

    // Check file size (5MB limit)
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      e.target.value = null;
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "Upload CV ( pdf)");
  };

  const handleCheckbox = () => setAccepted(!accepted);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please upload your resume");
      return;
    }

    if (!accepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        alert("Please login to apply for this job");
        return;
      }

      formData.append("applicantId", userId);
      formData.append("jobId", props.jobId);
      formData.append("oalink", message.trim());
      formData.append("cv", file);

      const response = await axios.post(`
        ${process.env.NEXT_PUBLIC_API_URL}/api/jobs/userjob/apply-for-a-job`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        }
      );

      alert(response.data.message);
      
      // Reset form after successful submission
      setFile(null);
      setFileName("Upload CV (doc, docx, pdf)");
      setMessage("");
      setAccepted(false);
      
      // Close modal if needed
      if (props.onClose) {
        props.onClose();
      }

    } catch (error) {
      console.error("Error applying for job:", error);
      
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to apply for job. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="default-form job-apply-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-cv-outer">
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                name="resume"
                accept=".doc,.docx,.pdf"
                id="upload"
                required
                onChange={handleFileChange}
              />
              <label 
                className="uploadButton-button ripple-effect" 
                htmlFor="upload"
                title={fileName}
              >
                {fileName.length > 30 ? fileName.substring(0, 27) + "..." : fileName}
              </label>
            </div>
          </div>
          {file && (
            <div className="mt-2 text-success">
              Selected file: {file.name}
            </div>
          )}
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <CustomCheckbox
        accepted={accepted}
        onChange={handleCheckbox}
      />

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button 
            className="theme-btn btn-style-one w-100"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Applying..." : "Apply Job"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ApplyJobModalContent;