import React from "react";
import PropTypes from "prop-types";
import LoadingScreen from "./common/LoadingScreen";

class Gallery extends React.Component {
  // TASK 3a:
  // Complete the Gallery component to include functionality
  // On click on left or right arrows, the gallery should change its image
  // On click of the thumbnails, the image selected should be updated as well
  // On click of the "Read more" button in the selected Image, it should redirect to the Selected Provider View.
  //
  //
  // Task 3b:
  // Write tests for the Gallery component. Tests should be written in the Gallery.spec.js file in the __tests__ folder.
  //
  //
  // ============== CODE GOES BELOW THIS LINE :) ==============

  constructor(props) {
    super(props);
    this.state = {
      mainImageIndex: 0, // current image index
    };
  }
  nextImage = () => {
    const { mainImageIndex } = this.state;
    const { items } = this.props;
    if (mainImageIndex < items.length - 1) {
      this.setState({ mainImageIndex: mainImageIndex + 1 });
    }
  };

  prevImage = () => {
    const { mainImageIndex } = this.state;
    const { items } = this.props;
    if (mainImageIndex < items.length && mainImageIndex !== 0) {
      this.setState({ mainImageIndex: mainImageIndex - 1 });
    }
  };

  renderMainSlider = (items, curImageIndex) => {
    const curItem = items[curImageIndex];
    const nextItem = items[curImageIndex + 1];
    const prevItem = items[curImageIndex - 1];
    return (
      <div className="gallery__slider-item-wrapper">
        <div
          className="gallery__slider-item prev"
          style={{
            backgroundImage: `url(${
              prevItem && prevItem.imageUrl && prevItem.imageUrl
            })`,
          }}
        ></div>
        <div className="gallery__slider-item ">
          <img
            src={curItem.imageUrl}
            className="gallery__slider-item active"
            alt=""
          />
          <div className="gallery__slider-item__info">
            <div className="gallery__slider-item__info-name">
              {curItem.name}
            </div>
            <div className="gallery__slider-item__info-description">
              {curItem.description}
              <p
                className="read-more"
                onClick={() => {
                  console.log("am here ---------");
                  this.props.onClick(`/${curItem.id}`);
                }}
              >
                Click to View
              </p>
            </div>
          </div>
        </div>
        <div
          className="gallery__slider-item next"
          style={{
            backgroundImage: `url(${
              nextItem && nextItem.imageUrl && nextItem.imageUrl
            })`,
          }}
        ></div>
      </div>
    );
  };

  renderSliderPreview = (items, mainImageIndex) => {
    return (
      <div className="gallery__thumbnails">
        {items.length > 0 &&
          items.map((item, index) => (
            <div
              key={item.id}
              className={`gallery__thumbnails__item ${
                index === mainImageIndex && "active"
              }`}
              style={{
                backgroundImage: `url(${item.imageUrl})`,
              }}
            ></div>
          ))}
      </div>
    );
  };

  renderSliderButtons = (items, mainImageIndex) => (
    <div className="gallery__slider-controls">
      <button
        className="gallery__slider-controls__button left"
        onClick={this.prevImage}
        disabled={mainImageIndex === 0}
      >
        <i className="fa fa-chevron-left"></i>
      </button>
      <button
        className="gallery__slider-controls__button right"
        onClick={this.nextImage}
        disabled={mainImageIndex === items.length - 1}
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );

  render() {
    const { items } = this.props;
    const { mainImageIndex } = this.state;
    if (!items || items.length === 0) {
      return <LoadingScreen />;
    }
    return (
      <div data-testid="gallery" className="box-shadow gallery">
        <div className="gallery__slider">
          {this.renderMainSlider(items, mainImageIndex)}
          {this.renderSliderButtons(items, mainImageIndex)}
        </div>
        {this.renderSliderPreview(items, mainImageIndex)}
      </div>
    );
  }
}

Gallery.propTypes = {
  startFrom: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.instanceOf(Function),
};

export default Gallery;
