import "../App.css";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "./ImageComponent";
import { access_key } from "../Utility/Constant";
import Loading from "./Loading";
import { AiOutlineClose } from "react-icons/ai";

const App = () => {
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  let [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  let inputRef = useRef();

  const getImageData = async () => {
    let keyword = inputRef.current.value;
    if (keyword === "") return;

    let response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_key}&per_page=9`
    );

    let data = await response.json();
    let imgData = data.results;

    if (page == 1) {
      setData([]);
    }

    setData((prev) => [...prev, ...imgData]);
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((page = page + 1));
      getImageData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const clearSearchText = () => {
    setSearchText("");
    setData([]);
  };

  return (
    <div>
      <div className="w-full h-[24] py-5 px-2 md:p-8 border-b-2 flex  items-center ">
        <img
          className="md:w-12 md:h-12 w-8 h-8  cursor-pointer"
          src={
            "https://cdn.icon-icons.com/icons2/3261/PNG/512/unsplash_logo_icon_206651.png"
          }
          alt="img"
        />
        <p className="ml-2 hidden md:block md:text-2xl font-bold">Unsplash</p>

        <form
          className="ml-[118px] md:ml-44  w-[30%]  md:w-[60%] h-10 md:h-14  md:text-base   rounded-lg drop-shadow-xl flex justify-center items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          {searchText && (
            <div
              className="relative left-[235px] md:left-[695px] flex justify-center items-center w-4 h-4 md:w-8 md:h-8  hover:bg-slate-300 rounded-full cursor-pointer  "
              onClick={clearSearchText}
            >
              <AiOutlineClose className=" text-[#3D4152]  " />
            </div>
          )}
          <input
            ref={inputRef}
            className="w-[250px] md:w-96 h-full px-4 md:px-7 flex-none md:flex-1 outline-0 border-0  rounded-tl-lg rounded-bl-lg text-base md:text-lg "
            type="text"
            placeholder="Search images here"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            id="btn"
            className="bg-red-600  h-full outline-0  border-0 px-4 md:px-10 rounded-tr-lg rounded-br-lg  text-white text-base md:text-lg drop-shadow-xl cursor-pointer"
            onClick={() => {
              (page = 1), getImageData();
            }}
          >
            Search
          </button>
        </form>
      </div>

      <div>
        <ImageComponent info={data} />
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default App;
