import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";

const PurchaseModal = ({ closeModal, isOpen, singlePlant }) => {
  const { user } = useAuth();
  const { _id, name, category, price, description, image, seller } =
    singlePlant || {};

  const {
    isLoading,
    isError,
    reset: mutationReset,
    mutateAsync,
  } = useMutation({
    mutationFn: async (payload) => {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        payload
      );
      return result?.data;
    },
    onSuccess: (data) => {
      if(data?.url) {
        console.log("success data",data.url)
        window.location.assign(data.url)
      }
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
    onMutate: (payload) => {
      console.log("Im from onMutate -->", payload);
    },
    onSettled: (data, error) => {
      if (data) console.log(data);
      if (error) console.log(error.message);
      mutationReset();
    },
  });

  const handlePayment = async () => {
    const finalSellerInfo = {
      name: seller?.name || "",
      email: seller?.email || "",
      photo: seller?.photo || "",
    };
    const paymentInfo = {
      plantId: _id,
      name,
      image,
      category,
      description,
      price,
      quantity: 1,
      seller: finalSellerInfo,
      customer: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    try {
      await mutateAsync(paymentInfo);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <ErrorPage></ErrorPage>;

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Plant: {name}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Category: {category}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Customer: {user?.email}</p>
            </div>

            <div className="mt-2">
              <p className="text-sm text-gray-500">Price: $ {price}</p>
            </div>
            <div className="mt-2">
              {/* <p className='text-sm text-gray-500'>Available Quantity: {quantity}</p> */}
            </div>
            <div className="flex mt-2 justify-around">
              <button
                onClick={handlePayment}
                disabled={isLoading}
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              >
                {isLoading ? "Processing..." : "pay"}
              </button>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
