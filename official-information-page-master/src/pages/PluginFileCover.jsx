import FrameComponent1 from "../components/FrameComponent1";
import KhungGopY from "../components/KhungGopY";
import FeaturesAndBenefits from "../components/FeaturesAndBenefits";
import FrameComponent from "../components/FrameComponent";
import FrameComponent3 from "../components/FrameComponent3";

const PluginFileCover = () => {
  return (
    <div className="w-full relative bg-midnightblue h-[3361px] overflow-hidden text-center text-[50px] text-mediumslateblue font-quicksand">
      <img
        className="absolute top-[2171px] left-[39px] w-[508.3px] h-[452.3px] object-contain"
        alt=""
        src="/ellipse-13.svg"
      />
      <img
        className="absolute top-[2193px] left-[1431px] w-[451.1px] h-[380.9px] object-contain"
        alt=""
        src="/ellipse-14.svg"
      />
      <img
        className="absolute top-[2205px] left-[771px] w-[449.5px] h-[378.1px] object-contain"
        alt=""
        src="/ellipse-15.svg"
      />
      <img
        className="absolute top-[-19px] left-[-51px] w-[365.7px] h-[381.3px] object-contain"
        alt=""
        src="/ellipse-17.svg"
      />
      <img
        className="absolute top-[645px] left-[-64px] w-[297.7px] h-[407.8px] object-contain"
        alt=""
        src="/ellipse-18.svg"
      />
      <img
        className="absolute top-[687px] left-[1683px] w-[326.4px] h-[359.5px] object-contain"
        alt=""
        src="/ellipse-19.svg"
      />
      <div className="absolute top-[2435px] left-[-1px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-xl [background:linear-gradient(180deg,_#0e6494,_#11316b_41.5%,_#0d0040_85%)] box-border w-[1921px] h-[745px] border-[1px] border-solid border-black" />
      <FrameComponent1 />
      <KhungGopY />
      <b className="absolute top-[2472px] left-[889px] [text-shadow:1px_0_0_#00c2ff,_0_1px_0_#00c2ff,_-1px_0_0_#00c2ff,_0_-1px_0_#00c2ff]">
        Góp Ý
      </b>
      <FeaturesAndBenefits />
      <FrameComponent />
      <img
        className="absolute top-[-69px] left-[1584px] w-[420px] h-[420.1px] object-contain"
        alt=""
        src="/ellipse-20.svg"
      />
      {/*<FrameComponent3 />*/}
    </div>
  );
};

export default PluginFileCover;
