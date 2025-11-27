import { useForm } from "react-hook-form";
import { imageUpload } from "../../Utils";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import { TbFidgetSpinner } from "react-icons/tb";

const AddPlantForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const { user } = useAuth();

  //? useMutation hook use case from tanstack query
  const {isPending, isError, reset: mutationReset, mutateAsync} = useMutation({
    mutationFn: async(payload) => await axios.post(
        `${import.meta.env.VITE_API_URL}/plants`,
        payload
      ),
      onSuccess: (data) => {
        console.log(data.data.result)
        if(data.data.result.insertedId) {
          mutationReset();
          toast.success('Plant Updated Successfully')
        }
        //? query key invalidate will use soon
      },
      onError: (error) => {
        console.log(error.message)
        toast.error(error.message)
      },
      onMutate: payload => {
        console.log('i will post this data --> ', payload)
      },
      retry: 3
  })

  const handleAddPlants = async (data) => {
    try {
      const { name, category, description, quantity, price, image } = data;
      const priceInNum = Number(price);
      const quantityInNum = Number(quantity);
      const imageFile = image?.[0] ?? null;
      const imageURL = await imageUpload(imageFile);
      const plantData = {
        name,
        category,
        image: imageURL,
        description,
        quantity: quantityInNum,
        price: priceInNum,
        seller: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
          created_at: new Date().toLocaleString(),
        },
      };

      await mutateAsync(plantData)
      reset()
    } catch (error) {
      console.log(error.message);
    }
  };

  if(isPending) return <LoadingSpinner></LoadingSpinner>
  if(isError) return <ErrorPage></ErrorPage>

  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(handleAddPlants)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                id="name"
                type="text"
                placeholder="Plant Name"
                {...register("name", {
                  required: { value: true, message: "Name is Required" },
                  maxLength: {
                    value: 20,
                    message: "Name cannot be too long",
                  },
                })}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                {...register("category", { required: "Category is Required" })}
              >
                <option value={""}>Select Category</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
              {errors.category?.message && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
              {errors.description?.message && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="price"
                  type="text"
                  placeholder="Price per unit"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                />
                {errors.price?.message && (
                  <p className="text-red-500 text-xs">{errors.price.message}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  {...register("quantity", {
                    required: "Quantity is required",
                    min: { value: 0, message: "Quantity must be positive" },
                  })}
                />
                {errors.quantity?.message && (
                  <p className="text-red-500 text-xs">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
            </div>
            {/* Image */}
            <div className=" p-4  w-full  m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      id="image"
                      accept="image/*"
                      hidden
                      {...register("image", {
                        required: "Image is required",
                        validate: (files) => {
                          if (!files || files.length === 0) return true;
                          const file = files[0];
                          const validTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/webp",
                          ];
                          if (!validTypes.includes(file.type))
                            return "Only JPG/PNG/WebP allowed";
                          if (file.size > 2 * 1024 * 1024) return "Max 2 MB";
                          return true;
                        },
                      })}
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      Upload
                    </div>
                    {errors.image?.message && (
                      <p className="text-red-500 text-xs">
                        {errors.image.message}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
            >
              {
                isPending ? <TbFidgetSpinner className=" animate-spin m-auto"></TbFidgetSpinner> : "Save & Continue"
              }
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPlantForm;
