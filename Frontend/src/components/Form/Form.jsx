/* eslint-disable react/prop-types */
const Form = ({ formData, setFormData, editMode, setEditMode }) => {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setFormData({ ...formData, [e.target.name]: "yes" });
    } else {
      setFormData({ ...formData, [e.target.name]: "no" });
    }
  };

  const handleFacultyAdd = () => {
    const list = [...formData.faculty, { facultyName: "", url: "" }];
    setFormData({ ...formData, faculty: list });
  };

  const handleFacultyRemove = (index) => {
    const list = [...formData.faculty];
    list.splice(index, 1);
    setFormData({ ...formData, faculty: list });
  };

  const handleFacultyChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...formData.faculty];
    list[index][name] = value;
    setFormData({ ...formData, faculty: list });
  };

  return (
    <div>
      {editMode && (
        <p className="text-textColor mb-4">
          Fields marked with * are mandatory
        </p>
      )}
      <div className="mb-1 flex items-center justify-between gap-10">
        <h2 className="heading mb-3">Confrim Program</h2>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="ml-3 w-2/12 bg-primaryColor p-3 text-[14px] leading-5 rounded-md text-white"
          >
            Edit
          </button>
        )}
      </div>
      <div className="mb-4 flex items-center justify-between gap-10">
        <label htmlFor="price" className="w-4/12 form__label">
          Price (in INR)*
          <input
            type="number"
            placeholder="Price"
            name="price"
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            className="form__input mt-2 placeholder:font-extralight"
            readOnly={!editMode}
            required
          />
        </label>
        <label htmlFor="domain" className="w-4/12 form__label">
          Domain*
          <select
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
            className="form__input mt-2"
            disabled={!editMode}
            required
          >
            <option value="">Select</option>
            <option value="Data">Data</option>
            <option value="Finance">Finance</option>
            <option value="Future Tech">Future Tech</option>
            <option value="Management">Management</option>
            <option value="Business">Business</option>
            <option value="Designing">Designing</option>
            <option value="Editing">Editing</option>
          </select>
        </label>
        <label
          htmlFor="placementAssurance"
          className="w-4/12 text-textColor font-semibold text-[18px] leading-7"
        >
          <input
            checked={formData.placementAssurance === "yes"}
            name="placementAssurance"
            type="checkbox"
            onChange={handleCheckboxChange}
            className="mr-1"
            disabled={!editMode}
          />
          Placement Assurance
        </label>
      </div>
      <h2 className="heading mb-3">Information</h2>
      <div className="mb-4 flex items-center justify-between gap-10">
        <label htmlFor="name" className="w-6/12 form__label">
          Name*
          <input
            type="text"
            placeholder="Name"
            name="name"
            minLength="5"
            maxLength="40"
            value={formData.name}
            onChange={handleInputChange}
            className="form__input mt-2 placeholder:font-extralight"
            readOnly={!editMode}
            required
          />
        </label>
        <label
          htmlFor="programType"
          className="w-3/12 text-textColor font-semibold text-[16px] leading-7"
        >
          Program Type*
          <div className="mt-4">
            <label>
              <input
                type="radio"
                name="programType"
                value="Full Time"
                checked={formData.programType === "Full Time"}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3"
                disabled={!editMode}
              />
              FT
            </label>
            <label>
              <input
                type="radio"
                name="programType"
                value="Part Time"
                checked={formData.programType === "Part Time"}
                onChange={handleInputChange}
                className="ml-7 text-textColor font-semibold text-[15px] leading-7 px-4 py-3"
                disabled={!editMode}
              />
              PT
            </label>
          </div>
        </label>
        <label
          htmlFor="registrationOpen"
          className="w-3/12 text-textColor font-semibold text-[16px] leading-7"
        >
          Registration Open*
          <div className="mt-4">
            <label>
              <input
                type="radio"
                name="registrationOpen"
                value="yes"
                checked={formData.registrationOpen === "yes"}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3"
                disabled={!editMode}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="registrationOpen"
                value="no"
                checked={formData.registrationOpen === "no"}
                onChange={handleInputChange}
                className="ml-7 text-textColor font-semibold text-[15px] leading-7 px-4 py-3"
                disabled={!editMode}
              />
              No
            </label>
          </div>
        </label>
      </div>
      <div className="mb-4 flex items-center justify-between gap-10">
        <label htmlFor="universityName" className="w-8/12 form__label">
          University Name / Partner*
          <input
            type="text"
            placeholder="University or Partner Name"
            name="universityName"
            minLength="5"
            maxLength="40"
            value={formData.universityName}
            onChange={handleInputChange}
            className="form__input mt-2 placeholder:font-extralight"
            readOnly={!editMode}
            required
          />
        </label>
        <label htmlFor="qualification" className="w-4/12 form__label">
          Certificate or Diploma*
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="form__input mt-2"
            disabled={!editMode}
            required
          >
            <option value="">Select</option>
            <option value="Certificate">Certificate</option>
            <option value="Diploma">Diploma</option>
          </select>
        </label>
      </div>
      <div className="mb-4 flex items-center justify-between gap-10">
        <label htmlFor="duration" className="w-3/12 form__label">
          Duration (months)*
          <input
            type="number"
            placeholder="Learning Duration"
            name="duration"
            min="0"
            value={formData.duration}
            onChange={handleInputChange}
            className="form__input mt-2 placeholder:font-extralight"
            readOnly={!editMode}
            required
          />
        </label>
        <label htmlFor="criteria" className="w-3/12 form__label">
          Eligibility Criteria
          <select
            name="criteria"
            value={formData.criteria}
            onChange={handleInputChange}
            className="form__input mt-2"
            disabled={!editMode}
          >
            <option value="None">None</option>
            <option value="Under Graduate">Under Graduate</option>
            <option value="Post Graduate">Post Graduate</option>
            <option value="Graduate">Graduate</option>
          </select>
        </label>
        <label htmlFor="image" className="w-6/12 form__label">
          Image*
          <input
            type="url"
            placeholder="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form__input mt-2 placeholder:font-extralight"
            readOnly={!editMode}
            required
          />
        </label>
      </div>
      <label htmlFor="faculty" className="form__label">
        Faculty
      </label>
      <div className="mb-4">
        {formData.faculty &&
          formData.faculty.map((faculty, i) => (
            <div
              key={i}
              className="mb-4 flex items-center justify-between gap-10"
            >
              <label htmlFor="facultyName" className="w-4/12 form__label">
                Name*
                <input
                  type="text"
                  placeholder="Faculty Name"
                  name="facultyName"
                  minLength="3"
                  maxLength="40"
                  value={faculty.facultyName}
                  onChange={() => handleFacultyChange(event, i)}
                  className="form__input mt-2 placeholder:font-extralight"
                  readOnly={!editMode}
                  required
                />
              </label>
              <label htmlFor="url" className="w-8/12 form__label">
                Profile URL
                <input
                  type="url"
                  placeholder="LinkedIn profile URL (if available)"
                  name="url"
                  value={faculty.url}
                  onChange={() => handleFacultyChange(event, i)}
                  className="form__input mt-2 placeholder:font-extralight"
                  readOnly={!editMode}
                />
              </label>
              {editMode && (
                <button
                  onClick={() => handleFacultyRemove(i)}
                  className="mt-4 bg-red-600 px-3 text-[23px] font-[800] rounded-full text-white"
                >
                  -
                </button>
              )}
            </div>
          ))}
        {editMode && formData.faculty && formData.faculty.length < 5 && (
          <button
            onClick={handleFacultyAdd}
            className="w-2/12 bg-[#1D2B53] p-1 text-[14px] leading-7 rounded-md text-white"
          >
            Add Faculty
          </button>
        )}
      </div>
      <label htmlFor="description" className="form__label">
        Description*
      </label>
      <textarea
        rows="6"
        type="text"
        name="description"
        minLength="20"
        maxLength="300"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Program Information..."
        className="form__input mt-1 mb-4"
        readOnly={!editMode}
        required
      />
    </div>
  );
};

export default Form;
