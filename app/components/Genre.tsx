import React, { useEffect } from "react";

const Genre = ({ genre, setGenre, setPage, type, value, setValue }: { genre: any, setGenre: any, setPage: any, type: string, value: any, setValue: any }) => {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`
    );
    const { genres } = await data.json();
    // console.log(genres);
    setGenre(genres);
  };

  useEffect(() => {
    fetchGenre();
  },
    // eslint-disable-next-line
    []);

  //Adding a particular genre to the selected array
  const CategoryAdd = (genres: any) => {
    //first - select everything that's inside of values using the spread operator
    //second - add those genres that are being sent from the non-selected arrays
    setValue([...value, genres]);
    //removing those genres from the non selected array that have been added to the selected array.
    setGenre(genre.filter((g: any) => g.id !== genres.id));
    setPage(1);
  };

  //removing a perticular genre from the selected array
  const CategoryRemove = (genres: any) => {
    setValue(value.filter((g: any) => g.id !== genres.id));
    setGenre([...genre, genres]);
    setPage(1);
  };
  return (
    <>
      <div className="container">
        <div className="">
          <div className="flex flex-wrap">
            {value && //if value exist
              value.map((Val: any) => {
                const { id, name } = Val;
                return (
                  <>
                    <div className="m-2" key={id}>
                      <button
                        className="bg-blue-600 rounded-3xl text-white px-4 py-2 text-center buttons"
                        onClick={() => CategoryRemove(Val)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}

            {genre && //if genre exist
              genre.map((Gen: any) => {
                const { id, name } = Gen;
                return (
                  <>
                    <div className="m-2 " key={id}>
                      <button
                        className="bg-mb-grey rounded-3xl text-white px-4 py-2 text-center button"
                        onClick={() => CategoryAdd(Gen)}
                      >
                        {name}
                      </button>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Genre;