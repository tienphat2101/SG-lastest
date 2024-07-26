import PropTypes from "prop-types";

const GioiThieu = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[122px] left-[119px] w-[305px] h-[232px] text-justify text-xl text-white font-inter ${className}`}
    >
      <b className="absolute h-[71.98%] w-full top-[28.02%] left-[0%] inline-block [text-shadow:0px_4px_2px_rgba(0,_0,_0,_0.5)]">
        Smartgram cung cấp cho bạn một cộng đồng học tập lý tưởng, nơi mà bạn có
        thể kết nối bạn với bạn bè và người dùng trên thế giới để cùng nhau phát
        triển tư duy và kỹ năng học tập.
      </b>
      <div className="absolute h-[21.55%] w-[79.02%] top-[0%] right-[20.98%] bottom-[78.45%] left-[0%] text-13xl">
        <b className="absolute top-[6%] left-[0%] [text-shadow:0px_4px_3px_rgba(0,_0,_0,_0.75)]">
          Cộng Đồng
        </b>
        <img
          className="absolute h-full w-[20.75%] top-[0%] right-[0%] bottom-[0%] left-[79.25%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/earth@2x.png"
        />
      </div>
    </div>
  );
};

GioiThieu.propTypes = {
  className: PropTypes.string,
};

export default GioiThieu;
