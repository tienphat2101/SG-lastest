import { useMemo } from "react";
import PropTypes from "prop-types";

const Property1Default1 = ({
  className = "",
  property1DefaultPosition,
  property1DefaultTop,
  property1DefaultLeft,
}) => {
  const property1Default1Style = useMemo(() => {
    return {
      position: property1DefaultPosition,
      top: property1DefaultTop,
      left: property1DefaultLeft,
    };
  }, [property1DefaultPosition, property1DefaultTop, property1DefaultLeft]);

  return (
    <div
      className={`w-24 h-[45px] text-center text-6xl text-white font-inter ${className}`}
      style={property1Default1Style}
    >
      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-81xl bg-steelblue overflow-hidden mix-blend-normal" />
      <div className="absolute top-[13.33%] left-[14.58%] lowercase [text-shadow:1px_0_0_#00283f,_0_1px_0_#00283f,_-1px_0_0_#00283f,_0_-1px_0_#00283f]">
        Log in
      </div>
    </div>
  );
};

Property1Default1.propTypes = {
  className: PropTypes.string,

  /** Style props */
  property1DefaultPosition: PropTypes.any,
  property1DefaultTop: PropTypes.any,
  property1DefaultLeft: PropTypes.any,
};

export default Property1Default1;
