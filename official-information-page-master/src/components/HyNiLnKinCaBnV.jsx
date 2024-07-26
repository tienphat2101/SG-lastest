import PropTypes from "prop-types";

const HyNiLnKinCaBnV = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[56px] left-[91px] w-[659px] h-[31px] text-center text-6xl font-quicksand ${className}`}
    >
      <b className="absolute top-[0px] left-[0px] text-transparent !bg-clip-text [background:linear-gradient(90deg,_#ff0000,_#7700ed_47%,_#db00ff_87.5%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [text-shadow:1px_1px_2px_rgba(0,_0,_0,_0.2)]">
        {`Hãy nói lên ý kiến của bạn! Vì chúng tôi luôn lắng nghe `}
      </b>
    </div>
  );
};

HyNiLnKinCaBnV.propTypes = {
  className: PropTypes.string,
};

export default HyNiLnKinCaBnV;
