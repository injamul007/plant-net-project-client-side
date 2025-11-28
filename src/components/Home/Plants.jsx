import Card from "./Card";
import Container from "../Shared/Container";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";

const Plants = () => {
  const {
    data: plantData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plants"],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_API_URL}/plants`
        );
        return result.data.result;
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <Container>
      {plantData && plantData.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {plantData.map((plant) => (
            <Card key={plant._id} plant={plant} />
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default Plants;
