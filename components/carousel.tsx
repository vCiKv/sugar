import { default as NukaCarousel } from "nuka-carousel";

const Carousel = (props: { children: React.ReactNode }) => {
  return (
    <NukaCarousel
      autoplay
      cellAlign="center"
      pauseOnHover
      wrapAround
      renderCenterLeftControls={({ previousSlide }) => (
        <button
          className="rounded-full bg-sky-300/40 hover:bg-sky-300/80 px-3 py-2"
          onClick={previousSlide}
        >
          prev
        </button>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <button
          className="rounded-full bg-sky-300/40 hover:bg-sky-300/80 px-3 py-2"
          onClick={nextSlide}
        >
          next
        </button>
      )}
    >
      {props.children}
    </NukaCarousel>
  );
};
export default Carousel;
