import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const JobCategorie1 = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job data using Axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://backend.rotaracthub.in/api/jobs/industry");
        setCategories(response.data); // Assumes response.data is the array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {categories.map((item, index) => (
        <div
          className="category-block col-lg-4 col-md-6 col-sm-12"
          key={index}
        >
          <div className="inner-box">
            <div className="content">
            <span className={`icon ${item.icon}`}></span>
              <h4>
                <Link href="/job-list">{item.industry}</Link>
              </h4>
              <p>({item.jobCount} open positions)</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobCategorie1;
