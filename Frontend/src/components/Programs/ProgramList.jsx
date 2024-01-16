/* eslint-disable react/prop-types */
import ProgramCard from "./ProgramCard";

const ProgramList = ({ programs }) => {
  return (
    <div className="grid w-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {programs &&
        programs.map((program) => (
          <ProgramCard key={program._id} program={program} />
        ))}
    </div>
  );
};

export default ProgramList;
