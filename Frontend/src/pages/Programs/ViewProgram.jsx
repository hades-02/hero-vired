import HashLoader from "react-spinners/HashLoader";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import useGetProgram from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { authContext } from "../../context/AuthContext";
import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";

const ViewProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(authContext);

  const { data, loading, error } = useGetProgram(
    `${import.meta.env.VITE_BACKEND_URL}/programs/${id}`
  );

  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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

  useEffect(() => {
    setFormData({
      price: data.price,
      domain: data.domain,
      placementAssurance: data.placementAssurance,
      name: data.name,
      programType: data.programType,
      registrationOpen: data.registrationOpen,
      universityName: data.universityName,
      qualification: data.qualification,
      duration: data.duration,
      criteria: data.criteria,
      image: data.image,
      description: data.description,
      faculty: data.faculty,
    });
  }, [data, setFormData]);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    setIsDeleting(true);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/programs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsDeleting(false);
      toast.success("Program deleted successfully.");
      navigate("/myPrograms");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setIsDeleting(false);
    }
  };

  const saveHandler = async () => {
    setIsSaving(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/programs/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setEditMode(false);
      setIsSaving(false);
      toast.success(message);
    } catch (err) {
      toast.error(err.message);
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <div className="mt-4 flex items-center justify-between gap-10">
            <button
              className="ml-3 w-full bg-[#1D2B53] p-3 text-[14px] leading-5 rounded-md text-white"
              onClick={cancelDeleteHandler}
            >
              CANCEL
            </button>
            <button
              className="mr-3 w-full bg-red-600 p-3 text-[14px] leading-5 rounded-md text-white"
              onClick={confirmDeleteHandler}
            >
              DELETE
            </button>
          </div>
        }
      >
        <h3 className="mt-7 text-[16px] leading-7 lg:text-[16px] lg:leading-[30px] font-semibold text-headingColor">
          Do you want to proceed and delete this program?
        </h3>
      </Modal>
      {loading && !error && <Loading />}

      {error && !loading && <Error errMessage={error} />}

      {!loading && !error && (
        <div className="mt-10 px-4 mx-auto max-w-screen-md">
          <form className="space-y-8">
            <Form
              formData={formData}
              setFormData={setFormData}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </form>
          {editMode && (
            <div className="flex items-center justify-between gap-10">
              <button
                disabled={isSaving && isDeleting && true}
                onClick={showDeleteWarningHandler}
                className="w-2/12 mb-9 border border-solid border-red-600 bg-transparent text-red-600 text-[18px] hover:bg-red-600 hover:text-white leading-[30px] rounded-lg px-4 py-3"
              >
                {isDeleting ? (
                  <HashLoader size={25} color="#ffffff" />
                ) : (
                  "Delete"
                )}
              </button>
              <button
                disabled={isSaving && isDeleting && true}
                onClick={saveHandler}
                className="w-2/12 mb-9 border border-solid border-primaryColor bg-transparent text-primaryColor hover:bg-primaryColor hover:text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              >
                {isSaving ? <HashLoader size={25} color="#ffffff" /> : "Save"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewProgram;
