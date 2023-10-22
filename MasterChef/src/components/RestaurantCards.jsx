import { IMG_CDN_URL } from "../utils/Constant";

const RestrauntCard = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  costForTwo,
  veg,
  promoted,
}) => {
  return (
    <div
      data-testid="resCard"
      className="w-64 m-4 p-3 rounded-lg  hover:scale-110 shadow-zinc-500  shadow-lg flex-wrap justify-start"
    >
      {/* <div className="flex z-10 translate-y-6 translate-x-1">
        {promoted ? (
          <h1 className=" text-white text-xs w-[3rem] h-[0.9rem]   z-[99]">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/star.png"
              alt="star"
              className="w-[1rem] h-[0.9rem]"
            />
          </h1>
        ) : (
          ""
        )}
      </div>-- we have did this using HOF*/}
      <img
        className="w-full  rounded-lg align-middle"
        src={IMG_CDN_URL + cloudinaryImageId}
      />

      <h2 className="font-bold text-lg bg-clip-content truncate break-words ">
        {name}
      </h2>
      <h6 className="cuisines flex-wrap bg-clip-content truncate ">
        {cuisines.join(", ")}
      </h6>
      <span className="flex flex-wrap ">
        <div className="m-1 justify-center">
          {avgRating < 4.2 ? (
            <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-red-600 text-white font-medium rounded-md">
              ⭐{avgRating}
            </h4>
          ) : (
            <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-green-600 text-white font-medium rounded-md">
              ⭐{avgRating}
            </h4>
          )}
        </div>
        <h2 className="justify-center m-1">•</h2>
        <h2 className="flex items-center justify-center">
          {veg ? (
            <span className="text-green-400">●</span>
          ) : (
            <span className="text-red-500">●</span>
          )}
        </h2>
        <h2 className="justify-center m-1">•</h2>
        <h4 className="heading text-sm justify-center text-black font-bold m-1.5">
          {costForTwo ?? "₹200 for two"}
        </h4>
      </span>
    </div>
  );
};

//Hifher order component
export const withPromoted = (RestrauntCard) => {
  return (props) => {
    return (
      <div>
        <div className="text-white translate-x-4 translate-y-10 bg-black w-[5rem] rounded-br-xl p-1 z-10 text-sm flex items-center justify-center">
          Promoted
        </div>
        <RestrauntCard {...props} />
      </div>
    );
  };
};

export default RestrauntCard;
