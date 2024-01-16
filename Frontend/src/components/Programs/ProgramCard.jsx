/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

const ProgramCard = ({ program }) => {
  const navigate = useNavigate();

  const viewButtonHandler = () => {
    navigate(`/myPrograms/${program._id}`);
  };

  return (
    <>
      <div
        onClick={viewButtonHandler}
        className="shadow-panelShadow p-5 rounded-md items-center cursor-pointer"
      >
        <div className="ml-9">
          <div className="w-auto flex">
            <figure className="w-[35px] h-[35px] border border-solid border-black rounded-full">
              <img
                src={program.image}
                className="w-auto h-auto rounded-full"
                alt=""
              />
            </figure>
            <h3 className="ml-3 text-[18px] leading-[30px] lg:text-[20px] lg:leading-9 text-headingColor font-[700]">
              {program.name}
            </h3>
          </div>
          <div className="w-full lg:mt-2 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
                {`Price: ${program.price} INR`}
              </h3>
              <h3 className="text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
                {`Duration: ${program.duration} months`}
              </h3>
            </div>
          </div>
          <div className="w-full mt-2 lg:mt-4 flex items-center justify-between">
            <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:px-6 text-[12px] leading-3 lg:text-[14px] lg:leading-5 font-semibold rounded">
              Last Modified <br /> {formatDate(program.modifiedAt)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramCard;
