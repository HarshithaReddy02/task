import React, { useState } from "react";
import "./Mainpage.css";

const Mainpage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [currentSchema, setCurrentSchema] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddSchema = () => {
    if (currentSchema) {
      const schema = availableOptions.find(
        (option) => option.value === currentSchema
      );
      setSelectedSchemas([...selectedSchemas, schema]);
      setAvailableOptions(
        availableOptions.filter((option) => option.value !== currentSchema)
      );
      setCurrentSchema("");
    }
  };

  const handleRemoveSchema = (index) => {
    const schemaToRemove = selectedSchemas[index];
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    console.log("Submitting data:", payload);

    setSegmentName("");
    setCurrentSchema("");
    setSelectedSchemas([]);

    setAvailableOptions([
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
      { label: "Gender", value: "gender" },
      { label: "Age", value: "age" },
      { label: "Account Name", value: "account_name" },
      { label: "City", value: "city" },
      { label: "State", value: "state" },
    ]);

    togglePopup();
  };

  return (
    <div className="row m-0">
      <div className="col-12 col-md-6 vh-100">
        <button onClick={togglePopup}  className="btn btn-light saveSegment">
          Save Segment
        </button>
      </div>
      {isPopupOpen && (
        <div className="col-12 col-md-6">
          <div className="sidebar">
            <h2>
              <i className="fa-solid fa-greater-than mr-2 icon-spacegreater"></i>
              Saving Segment
            </h2>

            <div className="content">
              <div>
                <label className="mb-2 labelfont">
                  Enter the Name of the Segment
                </label>
                <input
                  type="text"
                  placeholder="Name of the Segment"
                  className="form-control"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                />
                <label className="mb-2 labelfont">
                  To Save your segment, you need to add the schemas to build the
                  query
                </label>
              </div>

              <div
                className="mb-2"
                style={{
                  outline: "2px solid #8080ab",
                  padding: "10px",
                  marginTop: "20px",
                }}
              >
                {selectedSchemas.length === 0 && <p>No schemas added yet.</p>}
                {selectedSchemas.map((schema, index) => (
                  <div key={index} className="dropdown-icon-container">
                    <i className="fa-solid fa-circle icon-space"></i>
                    <select
                      className="form-select mb-2"
                      value={schema.value}
                      onChange={(e) => {
                        const updatedSchemas = selectedSchemas.map((s, i) =>
                          i === index
                            ? availableOptions.find(
                                (opt) => opt.value === e.target.value
                              )
                            : s
                        );
                        setSelectedSchemas(updatedSchemas);
                        setAvailableOptions(
                          availableOptions.filter(
                            (opt) =>
                              !updatedSchemas.some((s) => s.value === opt.value)
                          )
                        );
                      }}
                    >
                      <option value="" disabled>
                        Select schema
                      </option>
                      <option key={schema.value} value={schema.value}>
                        {schema.label}
                      </option>
                      {availableOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <i
                      className="fa-solid fa-minus icon-space"
                      onClick={() => handleRemoveSchema(index)}
                    ></i>
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <label className="mb-2">Add schema to segment: </label>
                <select
                  className="form-select"
                  value={currentSchema}
                  onChange={(e) => setCurrentSchema(e.target.value)}
                >
                  <option value="" disabled>
                    Select schema
                  </option>
                  {availableOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <a onClick={handleAddSchema} className="custom-link">
                + Add new schema
              </a>
              <br />
              <br />
            </div>
          </div>
          <div className="content footer row d-flex">
            <button onClick={handleSubmit} className="btn btn-success w-25">
              Save the segment
            </button>
            <button onClick={togglePopup} className="btn btn-secondary w-25">
              Close
            </button>
          </div>
        </div>
      )}
    </div>

  
  );
};

export default Mainpage;
