import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SellerRequestRow = ({request, refetch}) => {

  const axiosInstance = useAxiosSecure()

  const handleRoleUpdate = async() => {
    try {
      await axiosInstance.patch(`/update-role`, {email: request?.email, role: 'seller'})
      toast.success('Role Updated !')
      refetch();
    } catch (error) {
      console.log(error?.message)
      toast.error(error?.response?.data?.message)
      console.log(error?.response)
    }
  }
  
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{request?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span
          onClick={handleRoleUpdate}
          className="relative">Make Seller</span>
        </span>
      </td>
    </tr>
  );
};

export default SellerRequestRow;
