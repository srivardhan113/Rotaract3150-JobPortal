'use client'
import { useDispatch, useSelector } from "react-redux";
import {
    addDatePosted,
    addExperienceSelect,
    addJobTypeSelect,
    addSalary,
} from "../../../features/filter/filterSlice";
import { salaryRangeCheck } from "../../../features/job/jobSlice"; 
export default function JobSelect() {
    const { jobList } = useSelector((state) => state.filter);
    const { jobTypeList, datePost, experienceLavel } = useSelector(
        (state) => state.job
    );

    const dispatch = useDispatch();
    const salaryHandler = (e) => {
        const data = JSON.parse(e.target.value);
        dispatch(addSalary(data));
        dispatch(salaryRangeCheck(data.id));
    };

    // job type handler
    const jobTypeHandler = (e) => {
        dispatch(addJobTypeSelect(e.target.value));
    };

    // date post handler
    const datePostHandler = (e) => {
        dispatch(addDatePosted(e.target.value));
    };

    // experience handler
    const experienceHandler = (e) => {
        dispatch(addExperienceSelect(e.target.value));
    };
 


    const salaryRanges = [
        { id: 1, value: { min:0,max:5000 }, label: "Salary estimate" },
        { id: 2, value: { min: 0, max: 5000 }, label: "0 - 5000" },
        { id: 3, value: { min: 5000, max: 10000 }, label: "5000 - 10000" },
        { id: 4, value: { min: 10000, max: 15000 }, label: "10000 - 15000" },
        { id: 5, value: { min: 15000, max: 20000 }, label: "15000 - 20000" },
    ];

    return (
        <>
            <div className="showing-result">
                <div className="top-filters">
                    <div className="form-group">
                        <select
                            onChange={jobTypeHandler}
                            className="chosen-single form-select"
                            value={jobList?.jobTypeSelect}
                        >
                            <option value="">Job Type</option>
                            {jobTypeList?.map((item) => (
                                <option value={item.value} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End job type filter */}

                    <div className="form-group">
                        <select
                            onChange={datePostHandler}
                            className="chosen-single form-select"
                            value={jobList?.datePosted}
                        >
                            {datePost?.map((item) => (
                                <option value={item.value} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End date posted filter */}

                    <div className="form-group">
                        <select
                            onChange={experienceHandler}
                            className="chosen-single form-select"
                            value={jobList?.experienceSelect}
                        >
                            <option>Experience Level</option>
                            {experienceLavel?.map((item) => (
                                <option value={item.value} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End experience filter */}

                    <div className="form-group">
            <select
                onChange={salaryHandler}
                className="chosen-single form-select"
                value={JSON.stringify(jobList?.salary)}
            >
                {salaryRanges?.map((range) => (
                    <option
                        key={range.id}
                        value={JSON.stringify({
                            id: range.id,
                            ...range.value
                        })}
                    >
                        {range.label}
                    </option>
                ))}
            </select>
        </div>
                    {/* End salary filter */}
                </div>
            </div>
        </>
    );
}
