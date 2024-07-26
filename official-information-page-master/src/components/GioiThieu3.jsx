import PropTypes from "prop-types";

const GioiThieu3 = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[431px] left-[1174px] w-[305px] h-[214px] text-right text-xl text-white font-inter ${className}`}
    >
      <b className="absolute w-full top-[32.71%] left-[0%] inline-block [text-shadow:0px_4px_2px_rgba(0,_0,_0,_0.5)]">
        Smartgram không chỉ cung cấp không gian học tập mà còn tạo ra sự kết nối
        giữa các người dùng, những người có cùng niềm đam mê theo đuổi con đường
        tri thức.
      </b>
      <div className="absolute h-[23.46%] w-[57.18%] top-[0%] right-[0.98%] bottom-[76.54%] left-[42.3%] text-justify text-13xl">
        <b className="absolute top-[13.94%] left-[35.26%] [text-shadow:0px_4px_3px_rgba(0,_0,_0,_0.75)]">
          Kết Nối
        </b>
        <img
          className="absolute h-full w-[28.9%] top-[0%] right-[71.1%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/removebgai-1721111772142-1@2x.png"
        />
      </div>
    </div>
  );
};

GioiThieu3.propTypes = {
  className: PropTypes.string,
};

export default GioiThieu3;
