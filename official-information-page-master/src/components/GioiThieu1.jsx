import PropTypes from "prop-types";

const GioiThieu1 = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[434px] left-[119px] w-[305px] h-[234px] text-left text-xl text-white font-inter ${className}`}
    >
      <b className="absolute h-[71.37%] w-full top-[28.63%] left-[0%] inline-block [text-shadow:0px_4px_2px_rgba(0,_0,_0,_0.5)]">
        Smartgram cung cấp và kết hợp một cách khoa học các công cụ, phương pháp
        học tập (như podomoro, todo list, AI Bot,...) với mong muốn biến việc
        học trở nên dễ dàng hơn bao giờ hết.
      </b>
      <div className="absolute h-[21.37%] w-[65.57%] top-[0%] right-[34.43%] bottom-[78.63%] left-[0%] text-justify text-13xl">
        <b className="absolute top-[8%] left-[0%] [text-shadow:0px_4px_3px_rgba(0,_0,_0,_0.75)]">
          Công Cụ
        </b>
        <img
          className="absolute h-full w-3/12 top-[0%] right-[0%] bottom-[0%] left-[75%] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/tool@2x.png"
        />
      </div>
    </div>
  );
};

GioiThieu1.propTypes = {
  className: PropTypes.string,
};

export default GioiThieu1;
