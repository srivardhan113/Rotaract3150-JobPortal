import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latestJob: ["full-time"],
    // Add this to your initialState
salaryRanges: [
    { id: 1, value: { min: 0, max: 5000 }, label: "Salary estimate", isChecked: false },
    { id: 2, value: { min: 0, max: 5000 }, label: "0 - 5000", isChecked: false },
    { id: 3, value: { min: 5000, max: 10000 }, label: "5000 - 10000", isChecked: false },
    { id: 4, value: { min: 10000, max: 15000 }, label: "10000 - 15000", isChecked: false },
    { id: 5, value: { min: 15000, max: 20000 }, label: "15000 - 20000", isChecked: false },
    { id: 6, value: { min: 20000, max: 200000000000 }, label: "beyond 20000", isChecked: false },
],
    category: [
        {
            id: 1,
            name: "Residential",
            value: "residential",
        },
        {
            id: 2,
            name: "Commercial",
            value: "commercial",
        },
        {
            id: 3,
            name: "Industrial",
            value: "industrial",
        },
        {
            id: 4,
            name: "Apartments",
            value: "apartments",
        },
    ],
    jobTypeList: [
        {
            id: 1,
            name: "Freelancer",
            value: "Freelancer",
            isChecked: false,
        },
        {
            id: 2,
            name: "Full Time",
            value: "Full Time",
            isChecked: false,
        },
        {
            id: 3,
            name: "Part Time",
            value: "Part Time",
            isChecked: false,
        },
        {
            id: 4,
            name: "Internship",
            value: "Internship",
            isChecked: false,
        },
    ],
    datePost: [
        { id: 1, name: "All", value: "all", isChecked: false },
        { id: 2, name: "Last Hour", value: "last-hour", isChecked: false },
        {
            id: 3,
            name: "Last 24 Hour",
            value: "last-24-hour",
            isChecked: false,
        },
        { id: 4, name: "Last 7 Days", value: "last-7-days", isChecked: false },
        {
            id: 5,
            name: "Last 14 Days",
            value: "last-14-days",
            isChecked: false,
        },
        {
            id: 6,
            name: "Last 30 Days",
            value: "last-30-days",
            isChecked: false,
        },
    ],
    experienceLavel: [
        { id: 1, name: "Fresh", value: "0 years", isChecked: false },
        { id: 2, name: "Less than 1 Year", value: "0-1 years", isChecked: false },
        { id: 3, name: "1-2 Years", value: "1-2 years", isChecked: false },
        { id: 4, name: "3-5 Years", value: "3-5 years", isChecked: false },
        {
            id: 5,
            name: "5-10 Years",
            value: "5-10 years",
            isChecked: false,
        },{
            id:6,
            name:"10+ Years",
            value:"10+ years",
            isChecked:false,
        }
    ],
    tags: [
        {
            id: 1,
            name: "App",
            value: "app",
        },
        {
            id: 2,
            name: "Administrative",
            value: "administrative",
        },
        {
            id: 3,
            name: "Android",
            value: "android",
        },
        {
            id: 4,
            name: "Wordpress",
            value: "wordpress",
        },
        {
            id: 5,
            name: "Design",
            value: "design",
        },
        {
            id: 6,
            name: "React",
            value: "react",
        },
    ],
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        // Add these to your reducers
            salaryRangeCheck: (state, { payload }) => {
                state?.salaryRanges?.map((item) => {
                    item.isChecked = false;
                    if (item.id === payload) {
                        item.isChecked = true;
                    }
                    return {
                        ...item,
                    };
                });
            },
            clearSalaryRangeToggle: (state) => {
                state?.salaryRanges?.map((item) => {
                    item.isChecked = false;
                    return {
                        ...item,
                    };
                });
            },
        addLatestJob: (state, { payload }) => {
            const isExist = state.latestJob?.includes(payload);
            if (isExist) {
                state.latestJob = state.latestJob.filter(
                    (item) => item !== payload
                );
            } else {
                state.latestJob.push(payload);
            }
        },
        clearJobTypeToggle: (state) => {
            state?.jobTypeList?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
        jobTypeCheck: (state, { payload }) => {
            state?.jobTypeList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false;
                    } else {
                        item.isChecked = true;
                    }
                }
                return {
                    ...item,
                };
            });
        },
        datePostCheck: (state, { payload }) => {
            state?.datePost?.map((item) => {
                item.isChecked = false;
                if (item.id === payload) {
                    item.isChecked = true;
                }
                return {
                    ...item,
                };
            });
        },
        clearDatePostToggle: (state) => {
            state?.datePost?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
        experienceLavelCheck: (state, { payload }) => {
            state?.experienceLavel?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false;
                    } else {
                        item.isChecked = true;
                    }
                }
                return {
                    ...item,
                };
            });
        },
        clearExperienceToggle: (state) => {
            state?.experienceLavel?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
    },
});

export const {
    addLatestJob,
    clearJobTypeToggle,
    jobTypeCheck,
    datePostCheck,
    clearDatePostToggle,
    experienceLavelCheck,
    salaryRangeCheck,          // Add these
    clearSalaryRangeToggle,    
    clearExperienceToggle,
} = jobSlice.actions;
export default jobSlice.reducer;
