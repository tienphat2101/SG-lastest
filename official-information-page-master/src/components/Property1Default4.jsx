import { useMemo } from "react";
import PropTypes from "prop-types";

const Property1Default4 = ({
  className = "",
  property1DefaultPosition,
  property1DefaultTop,
  property1DefaultLeft,
}) => {
  const property1Default4Style = useMemo(() => {
    return {
      position: property1DefaultPosition,
      top: property1DefaultTop,
      left: property1DefaultLeft,
    };
  }, [property1DefaultPosition, property1DefaultTop, property1DefaultLeft]);

  return (
    <div
      className={`w-[91px] h-[43px] text-left text-3xl text-white font-inter ${className}`}
      style={property1Default4Style}

    >
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-3xs bg-gray-200" />
      <div className="absolute h-[55.81%] w-[72.53%] top-[20.93%] left-[14.29%] inline-block" >
        Góp Ý
      </div>
    </div>
  );
};

Property1Default4.propTypes = {
  className: PropTypes.string,

  /** Style props */
  property1DefaultPosition: PropTypes.any,
  property1DefaultTop: PropTypes.any,
  property1DefaultLeft: PropTypes.any,
};

export default Property1Default4;
