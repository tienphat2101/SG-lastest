import { useMemo } from "react";
import PropTypes from "prop-types";

const Property1Default2 = ({
  className = "",
  property1DefaultPosition,
  property1DefaultTop,
  property1DefaultLeft,
}) => {
  const property1Default2Style = useMemo(() => {
    return {
      position: property1DefaultPosition,
      top: property1DefaultTop,
      left: property1DefaultLeft,
    };
  }, [property1DefaultPosition, property1DefaultTop, property1DefaultLeft]);

  return (
    <div
      className={`w-[139px] rounded-31xl h-[43px] text-left text-3xl text-white font-inter ${className}`}
      style={property1Default2Style}
    >
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-gray-200" />
      <div className="absolute top-[18.6%] left-[11.51%]">Trang Chủ</div>
    </div>
  );
};

Property1Default2.propTypes = {
  className: PropTypes.string,

  /** Style props */
  property1DefaultPosition: PropTypes.any,
  property1DefaultTop: PropTypes.any,
  property1DefaultLeft: PropTypes.any,
};

export default Property1Default2;
