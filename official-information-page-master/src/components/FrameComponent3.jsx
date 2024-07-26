import Property1Default1 from "./Property1Default1";
import Property1Default2 from "./Property1Default2";
import Property1Default3 from "./Property1Default3";
import Property1Default4 from "./Property1Default4";
import Property1Default5 from "./Property1Default5";
import PropTypes from "prop-types";

const FrameComponent3 = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[0px] left-[0px] bg-gray-200 w-[1920px] h-[75px] overflow-hidden mix-blend-normal text-left text-11xl text-white font-inter ${className}`}
    >
      <Property1Default1
        property1DefaultPosition="absolute"
        property1DefaultTop="14px"
        property1DefaultLeft="1661px"
      />
      <Property1Default2
        property1DefaultPosition="absolute"
        property1DefaultTop="17px"
        property1DefaultLeft="870px"
      />
      <Property1Default3
        property1DefaultPosition="absolute"
        property1DefaultTop="17px"
        property1DefaultLeft="1064px"
      />
      <Property1Default4
        property1DefaultPosition="absolute"
        property1DefaultTop="17px"
        property1DefaultLeft="1261px"
      />
      <Property1Default5
        property1DefaultPosition="absolute"
        property1DefaultTop="17px"
        property1DefaultLeft="1409px"
      />
      <div className="absolute top-[1px] left-[278px] w-[241px] h-[75px]">
        <img
          className="absolute top-[0px] left-[0px] w-[75px] h-[75px] object-cover"
          alt=""
          src="/logo-0-nn-1@2x.png"
        />
        <b className="absolute top-[24px] left-[76px] capitalize">smartgram</b>
      </div>
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;
