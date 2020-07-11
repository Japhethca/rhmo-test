import React from "react";

import apiClient from "../../utils/apiService";

class NewProviderForm extends React.Component {
  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to
  // the server to create a new provider.
  // Refer to the API documentation for details.
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInputChange = (e) => {
    if (e.target.name === "file") {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const img = document.getElementById("provider_image_upload");
        img.src = fileReader.result;
      };
      fileReader.readAsDataURL(e.target.files[0]);
      this.setState({ imageUrl: e.target.files[0] });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleImageUpload = (image) => {
    return apiClient.post(apiClient.ENDPOINTS.imageUpload, image, {
      "Content-Type": "multipart/form-data",
    });
  };

  submitForm = async (e) => {
    e.preventDefault();
    const { imageUrl } = this.state;
    let uploaded;
    try {
      uploaded = await this.handleImageUpload(imageUrl);
    } catch (err) {
      uploaded = "https://via.placeholder.com/1500x840";
    }
    const formData = {
      ...this.state,
      imageUrl: uploaded,
    };
    await apiClient.post(apiClient.ENDPOINTS.providers, formData);
    // this is not working yet
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitForm}>
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input
            className="input__style_1"
            type="text"
            onChange={this.handleInputChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input
            className="input__style_1"
            type="text"
            name="address"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider State:</label>
          <input
            className="input__style_1"
            type="text"
            name="state"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select
            className="select input__style_1"
            type="number"
            name="rating"
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
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
            src="https://via.placeholder.com/1500x840"
            alt="new provider"
            id="provider_image_upload"
          />
          <input type="file" name="file" onChange={this.handleInputChange} />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
            onChange={this.submitForm}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
