import { Link } from "react-router-dom";

const Card = ({ room }) => {
  const {
    id,
    name,
    roomNumber,
    imgUrl,
    price,
    description,
    startDate,
    endDate,
    status,
    AccomodationId,
  } = room;
  // console.log(status, 16);
  return (
    <>
      {status === "vacant" && (
        <Link
          to={`/room/${id}`}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 "
        >
          <div className="flex flex-row w-full h-[20rem]">
            <div className="w-2,5/5" style={{ height: "100%" }}>
              <img
                src={imgUrl}
                className="w-[30rem] h-full rounded-l-lg object-cover"
                alt="Rooms"
              />
            </div>
            <div className="flex flex-col pl-[3rem] pt-[4rem] leading-normal w-2,5/5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {name}
              </h5>
              <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
                {description}
              </p>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {startDate} - {endDate}
              </p>
              <p className="mb-3 pt-[5rem] font-medium text-gray-700 dark:text-gray-400">
                Rp.{price}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};
export default Card;
