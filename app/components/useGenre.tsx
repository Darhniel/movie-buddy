
const useGenre = (value :any) => {
  if (value.length < 1) return "";
 
  const GenreIds = value.map((g: any) => g.id);
  return GenreIds.reduce((acc : any, curr: any) => acc + "," + curr);
};
 
export default useGenre;