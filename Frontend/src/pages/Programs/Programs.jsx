import useGetPrograms from "../../hooks/useFetchData";
import ProgramList from "../../components/Programs/ProgramList";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { useEffect, useState } from "react";

const Programs = () => {
  const { data, loading, error } = useGetPrograms(
    `${import.meta.env.VITE_BACKEND_URL}/users/myPrograms`
  );

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    setPrograms(data.programs);
  }, [data]);

  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [criteria, setCriteria] = useState("All");
  const [qualification, setQualification] = useState("Both");
  const [programType, setProgramType] = useState("Both");

  const domainList = [
    "All",
    "Data",
    "Finance",
    "Future Tech",
    "Management",
    "Business",
    "Designing",
    "Editing",
  ];
  const criteriaList = [
    "All",
    "Under Graduate",
    "Post Graduate",
    "Graduate",
    "None",
  ];
  const programTypeList = ["Both", "Part Time", "Full Time"];
  const qualificationList = ["Both", "Certificate", "Diploma"];

  useEffect(() => {
    if (data.programs) {
      const filteredPrograms = data.programs.filter(
        (program) =>
          (domain === "All" || program.domain === domain) &&
          (criteria === "All" || program.criteria === criteria) &&
          (qualification === "Both" ||
            program.qualification === qualification) &&
          (programType === "Both" || program.programType === programType) &&
          program.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setPrograms(filteredPrograms);
    }
  }, [search, data, domain, criteria, qualification, programType]);

  return (
    <>
      <section className="bg-[#0066ff2c]">
        <div className="container text-center">
          <h2 className="heading">My Programs</h2>
          <div className="max-w-[550px] mt-[30px] mx-auto bg-white rounded-md flex items-center justify-between">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search By Name"
            />
          </div>
          <div className="mt-10 items-center justify-between gap-10">
            {domainList.map((val, i) => (
              <button
                key={i}
                onClick={() => setDomain(val)}
                className={`ml-3 w-auto border border-solid border-[#1D2B53] px-4 py-1 text-[14px] leading-5 rounded-full ${
                  domain === val
                    ? "bg-[#1D2B53] text-white"
                    : "bg-white text-[#1D2B53]"
                } `}
              >
                {val}
              </button>
            ))}
          </div>
          <div className="mt-4 items-center justify-between gap-10">
            {criteriaList.map((val, i) => (
              <button
                key={i}
                onClick={() => setCriteria(val)}
                className={`ml-3 w-auto border border-solid border-[#1D2B53] px-4 py-1 text-[14px] leading-5 rounded-full ${
                  criteria === val
                    ? "bg-[#1D2B53] text-white"
                    : "bg-white text-[#1D2B53]"
                } `}
              >
                {val}
              </button>
            ))}
          </div>
          <div className="mt-4 items-center justify-between gap-10">
            {qualificationList.map((val, i) => (
              <button
                key={i}
                onClick={() => setQualification(val)}
                className={`ml-3 w-auto border border-solid border-[#1D2B53] px-4 py-1 text-[14px] leading-5 rounded-full ${
                  qualification === val
                    ? "bg-[#1D2B53] text-white"
                    : "bg-white text-[#1D2B53]"
                } `}
              >
                {val}
              </button>
            ))}
          </div>
          <div className="mt-4 items-center justify-between gap-10">
            {programTypeList.map((val, i) => (
              <button
                key={i}
                onClick={() => setProgramType(val)}
                className={`ml-3 w-auto border border-solid border-[#1D2B53] px-4 py-1 text-[14px] leading-5 rounded-full ${
                  programType === val
                    ? "bg-[#1D2B53] text-white"
                    : "bg-white text-[#1D2B53]"
                } `}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {programs && programs.length > 0 && !loading && !error && (
        <>
          <p className="text-center text-textColor mt-3">
            Click on a program to view details
          </p>
          <section>
            <div className="container">
              <ProgramList programs={programs} />
            </div>
          </section>
        </>
      )}
      {programs && programs.length === 0 && (
        <div className="mt-4 flex items-center justify-center w-full h-full">
          <h3 className="text-headingColor text-[20px] leading-[30px] font-semibold">
            Sorry, could not find any program
          </h3>
        </div>
      )}
    </>
  );
};

export default Programs;
