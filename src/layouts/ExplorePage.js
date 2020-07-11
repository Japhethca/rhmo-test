import React from "react";
import NavBar from "../components/common/NavBar";
import Gallery from "../components/ProviderGallery";
import GridView from "../components/ProviderGrid";
import ListView from "../components/ProviderList";
import NewProviderForm from "../components/forms/NewProviderForm";
import ApiService from "../utils/apiService";
import LoadingScreen from "../components/common/LoadingScreen";

import { pathGet } from "../utils/utils";
class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      filtered: [],
      currentView: "gallery",
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers).then((data) => {
      console.log("data", data);
      this.setState({
        isLoading: false,
        data: data,
      });
    });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading,
    });
  };

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    const searchKey = event.target.value;
    const filtered = this.state.data.filter((field) =>
      pathGet(field, searchKey)
    );
    this.setState({ ...this.state, filtered });
  };

  switchView = (view) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    this.setState({ currentView: view });
  };

  navigateTo = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  renderView = () => {
    const { currentView, data } = this.state;
    switch (currentView) {
      case "grid":
        return (
          <GridView
            items={data.map((item) => ({
              id: item.id,
              address: item.address,
              name: item.name,
              imageUrl:
                item.images && item.images.length > 0 && item.images[0].url,
              rating: item.rating,
              type: item.provider_type.name,
            }))}
            onClick={this.navigateTo}
          />
        );
      case "list":
        return (
          <ListView
            items={data.map((item) => ({
              id: item.id,
              address: item.address,
              name: item.name,
              imageUrl:
                item.images && item.images.length > 0 && item.images[0].url,
              rating: item.rating,
              type: item.provider_type.name,
            }))}
          />
        );
      default:
        return (
          <Gallery
            items={data.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              imageUrl:
                item.images && item.images.length > 0 && item.images[0].url,
            }))}
          />
        );
    }
  };

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{ padding: "1rem" }}>
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                <i
                  className="fa fa-images active"
                  onClick={() => this.switchView("gallery")}
                ></i>
                <i
                  className="fa fa-th-large"
                  onClick={() => this.switchView("grid")}
                ></i>
                <i
                  className="fa fa-th-list"
                  onClick={() => this.switchView("list")}
                ></i>
              </div>
            </div>
            {isLoading || !data ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>{this.renderView()}</React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
            <div className="new-provider">
              <h2 className="text-header">Can't find a Provider?</h2>
              <p className="text-body">Feel free to recommend a new one.</p>
              <hr />
              <NewProviderForm />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
