const ImageComponent = ({ info }) => {
  return (
    <div className="w-[80%] mx-auto my-8 md:my-14 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10 ">
      {info.map((card, indx) => (
        <img
          key={indx}
          src={card.urls.regular}
          alt="img"
          className="w-[100%] h-[250px] md:w-[100%] md:h-[450px] object-cover rounded-xl cursor-pointer transition ease-in-out delay-100 hover:shadow-lg hover:shadow-yellow-600 duration-300 hover:-translate-y-[10px] "
        />
      ))}
    </div>
  );
};

export default ImageComponent;
