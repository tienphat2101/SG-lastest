import PropTypes from "prop-types";

const FrameComponent1 = ({ className = "" }) => {
  return (
    <div
      className={`absolute top-[2887px] left-[0px] w-[1920px] h-[473px] overflow-hidden text-center text-3xl text-white font-quicksand ${className}`}
    >
      <div className="absolute top-[0px] left-[0px] rounded-81xl bg-gray-100 w-[1920px] h-[557px]" />
      <div className="absolute top-[29px] left-[1233px] w-[407px] h-[147px]">
        <img
          className="absolute top-[77px] left-[169px] w-[70px] h-[70px] object-cover mix-blend-luminosity"
          alt=""
          src="/logo-0-nn-2@2x.png"
        />
        <b className="absolute top-[45px] left-[39px]">
          © Copyright by: Võ Lê Tiến Đạt
        </b>
        <b className="absolute top-[0px] left-[0px] text-7xl text-right">
          SMARTGRAM - STUDY IS FUTURE
        </b>
      </div>
      <div className="absolute top-[29px] left-[283px] w-[322px] h-[149px] text-base">
        <b className="absolute top-[49px] left-[2px]">
          Author: Nguyễn Huỳnh Tiến Phát
        </b>
        <b className="absolute top-[83px] left-[2px]">Author: Võ Lê Tiến Đạt</b>
        <b className="absolute top-[121px] left-[0px]">
          Trường THPT Trần Phú TP.HCM
        </b>
        <b className="absolute top-[0px] left-[0px] text-6xl">
          <span className="[text-decoration:underline]">Liên Hệ</span> :
        </b>
        <img
          className="absolute top-[78px] left-[292px] w-[30px] h-[30.1px] object-cover"
          alt=""
          src="/fblink@2x.png"
        />
        <img
          className="absolute top-[114px] left-[287px] w-[35px] h-[35px] object-cover"
          alt=""
          src="/removebgai-1721144744017-1@2x.png"
        />
        <img
          className="absolute top-[44px] left-[292px] w-[30px] h-[30.1px] object-cover"
          alt=""
          src="/fblink@2x.png"
        />
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
