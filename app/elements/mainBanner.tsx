"use client"
import Carousel from "nuka-carousel";

const MainBanner = () => {
  const SliderImage = (props: { color: string }) => {
    const { color } = props;
    return (
      <div className="flex justify-center -z-10">
        <img
          src={`https://dummyimage.com/1200x700/${color}/ffffff`}
          alt={color}
        />
      </div>
    );
  };
  return (
    <div className="w-full min-h-screen my-10">
      <Carousel>
        {["blue", "green", "red","pink","black"].map((color) => (
          <SliderImage color={color} key={color} />
        ))}
      </Carousel>
    </div>
  );
};

export default MainBanner