import React from "react";
import SellerRequestRow from "../../../components/Dashboard/TableRows/SellerRequestRow";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const SellerRequest = () => {

  const {user} = useAuth();
  const axiosInstance = useAxiosSecure();

  const {data: sellerRequests=[], isLoading, refetch} = useQuery({
    queryKey: ["sellerRequest", user?.email],
    queryFn: async() => {
      const result = await axiosInstance.get(`/seller-requests`)
      return result.data.result;
    }
  })

  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    sellerRequests.map(request => <SellerRequestRow key={request._id} request={request} refetch={refetch}></SellerRequestRow>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerRequest;
