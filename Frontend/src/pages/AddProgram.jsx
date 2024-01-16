import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import Form from "../components/Form/Form";

const AddProgram = () => {
  const { token } = useContext(authContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    price: "",
    domain: "",
    placementAssurance: "no",
    name: "",
    programType: "Full Time",
    registrationOpen: "yes",
    universityName: "",
    qualification: "",
    duration: "",
    criteria: "None",
    image: "",
    description: "",
    faculty: [],
  });

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/programs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/records");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="mt-10 mx-auto max-w-screen-md">
      <form className="space-y-8" onSubmit={submitHandler}>
        <Form formData={formData} setFormData={setFormData} editMode={true} />
        <div className="mt-2">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full mb-9 bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
          >
            {loading ? (
              <HashLoader size={25} color="#ffffff" />
            ) : (
              "Save Program"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProgram;
