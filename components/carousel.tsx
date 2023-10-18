import { default as NukaCarousel } from "nuka-carousel";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const Carousel = (props: { children: React.ReactNode }) => {
  return (
    <NukaCarousel
      autoplay
      cellAlign="center"
      pauseOnHover
      wrapAround
      renderCenterLeftControls={({ previousSlide }) => (
        <button
          className="block px-3 py-2 mx-3 rounded-full bg-sky-300/40 hover:bg-sky-300/80"
          onClick={previousSlide}
        >
          <IoArrowBackOutline size={24}/>
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button
          className="px-3 py-2 mx-3 rounded-full bg-sky-300/40 hover:bg-sky-300/80"
          onClick={nextSlide}
        >
          <IoArrowForwardOutline size={24}/>
        </button>
      )}
    >
      {props.children}
    </NukaCarousel>
  );
};
export default Carousel;
