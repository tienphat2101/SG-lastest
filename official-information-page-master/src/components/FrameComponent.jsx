import GioiThieu3 from "./GioiThieu3";
import GioiThieu2 from "./GioiThieu2";
import GioiThieu1 from "./GioiThieu1";
import GioiThieu from "./GioiThieu";
import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[150px] left-[163px] rounded-6xl [background:linear-gradient(-84.18deg,_#0ba4ae,_#0049b7)] w-[1595px] h-[730px] overflow-hidden text-right text-xl text-white font-inter ${className}`}
    >
      <GioiThieu3 />
      <GioiThieu2 />
      <GioiThieu1 />
      <GioiThieu />
      <img
        className="absolute top-[135px] left-[522px] w-[550px] h-[546.2px] object-cover"
        alt=""
        src="/logo-ko-nn-1@2x.png"
      />
      <b className="absolute top-[56px] left-[calc(50%_-_336.5px)] text-17xl text-gold text-justify [text-shadow:0px_4px_4px_rgba(255,_224,_114,_0.5)]" id='home'>
        Smartgram - Khi Học Tập Là Tương Lai
      </b>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
