import PropTypes from "prop-types";

const GioiThieu2 = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[122px] left-[1174px] w-[305px] h-[197px] text-right text-xl text-white font-inter ${className}`}
    >
      <b className="absolute h-[67.01%] w-full top-[32.99%] left-[0%] inline-block [text-shadow:0px_4px_2px_rgba(0,_0,_0,_0.5)]">
        Smartgram giúp tối ưu hóa thời gian học tập của bạn, cân bằng giữa việc
        học và giải trí nhằm mang lại hiểu quả cao hơn trong học tập.
      </b>
      <div className="absolute h-[25.38%] w-[68.85%] top-[0%] right-[0.66%] bottom-[74.62%] left-[30.49%] text-justify text-13xl">
        <b className="absolute top-[16%] left-[31.9%] [text-shadow:0px_4px_3px_rgba(0,_0,_0,_0.75)]">
          Hiệu Quả
        </b>
        <img
          className="absolute h-full w-[23.81%] top-[0%] right-[76.19%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/efficax-icon-1@2x.png"
        />
      </div>
    </div>
  );
};

GioiThieu2.propTypes = {
  className: PropTypes.string,
};

export default GioiThieu2;
