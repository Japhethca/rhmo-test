import React, { useEffect, useState } from "react";

import apiClient from "../utils/apiService";
import { useParams } from "react-router-dom";

const ViewProvider = () => {
  const [provider, setProvider] = useState({});
  const [providerEdit, setProviderEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const { providerId } = useParams();

  useEffect(() => {
    apiClient
      .get(`${apiClient.ENDPOINTS.providers}/${providerId}`)
      .then((data) => {
        console.log(data, "data from view page");
        setProvider(data);
      });
  }, [providerId]);

  const handleInputChange = (e) => {
    setProviderEdit({ [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {};

  const uploadImage = (e) => {};

  const providerDetails = (
    <div>
      <h2>Provider Details</h2>
      <div className="provider-details"></div>
      {provider && (
        <React.Fragment>
          <div>Provider Name: {provider.name}</div>
          <div>Provider Address: {provider.address}</div>
          <div>Provider State: {provider.state && provider.state.name}</div>
          <div>Provider Rating: {provider.rating}</div>
          <div>
            Provider Type:{" "}
            {provider.provider_type && provider.provider_type.name}
          </div>
          <div>
            Provider Image:{" "}
            <img
              src={provider.images && provider.images[0].url}
              alt={provider}
              width="200"
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );

  const providerEditForm = (
    <form className="form">
      <h2>Edit Provider</h2>
      <div className="form-group">
        <label htmlFor="name">Provider Name:</label>
        <input
          className="input__style_1"
          type="text"
          onChange={handleInputChange}
          name="name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Provider Address:</label>
        <input
          className="input__style_1"
          type="text"
          name="address"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Provider State:</label>
        <input
          className="input__style_1"
          type="text"
          name="state"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Provider Rating:</label>
        <select
          className="select input__style_1"
          type="number"
          name="rating"
          onChange={handleInputChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="type">Provider type:</label>
        <select
          className="select input__style_1"
          type="text"
          name="type"
          onChange={handleInputChange}
        >
          <option value="hospital">Hospital</option>
          <option value="pharmacy">Pharmacy</option>
          <option value="clinic">Clinic</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="image">Provider Image</label>
        <img
          className="img-responsive"
          width="200"
          src="https://via.placeholder.com/1500x840"
          alt="new provider"
          id="new_provider_image"
        />
        <input type="file" name="file" onChange={uploadImage} />
      </div>
      <div className="form-group button-row">
        <button
          type="submit"
          className="btn btn-primary no-margin"
          onChange={submitForm}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    // TASK 6:
    // Render Single Provider View Here
    // Feel free to using existing styles,
    // or add new ones if you want to :)
    //
    // For Bonus points, you can also add functionality to edit the provider
    // Reusing the NewProviderForm component for this will make it a whole lot easier :D
    <div className="container">
      {/* <NavBar /> */}
      <h1>
        Provider Page{" "}
        <span>
          <i className="fa fa-edit"></i>
        </span>
      </h1>
      {editing ? providerEditForm : providerDetails}
      <button onClick={() => setEditing(false)}>View</button>{" "}
      <button onClick={() => setEditing(true)}>Edit</button>
    </div>
  );
};

export default ViewProvider;
