import video from "../assets/carVideo.mp4";
import Display from "../components/Display";
import Logo from "../components/Logo";
import Rated from "../components/Rated";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <video
        autoPlay
        loop
        muted
        className="w-full min-h-screen object-cover"
        aria-label="Car video background"
      >
        <source src={video} type="video/mp4" />
        {/* You can remove the other formats if unnecessary */}
        <source src="../assets/carVideo.webm" type="video/webm" />
        <source src="../assets/carVideo.ogv" type="video/ogg" />
        Your browser does not support the video tag.
      </video>

      <div className="w-full mt-10">
        <Display />
      </div>

      <div className="w-full mt-10">
        <Logo />
      </div>

      <div className="w-full mt-10">
        <Rated />
      </div>
    </div>
  );
};

export default Home;
