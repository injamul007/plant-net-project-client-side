import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {

  const {user, loading} = useAuth();
  const axiosInstance = useAxiosSecure()

  const {data: role, isLoading: isRoleLoading} = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['user_role', user?.email],
    queryFn: async() => {
      const result = await axiosInstance.get(`/users/role`)
      return result.data?.role;
    },
    initialData: "customer"
  })

  return {role, isRoleLoading}
};

export default useRole;