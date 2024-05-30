const ImageComponent = ({ info }) => {
  return (
    <div className="w-[80%] mx-auto my-14 grid grid-cols-3 gap-10 ">
      {info.map((card, indx) => (
        <img
          key={indx}
          src={card.urls.regular}
          alt="img"
          className=" w-[100%] h-[450px] object-cover rounded-xl cursor-pointer transition ease-in-out delay-100 hover:shadow-lg hover:shadow-yellow-600 duration-300 hover:-translate-y-[10px] "
        />
      ))}
    </div>
  );
};

export default ImageComponent;
