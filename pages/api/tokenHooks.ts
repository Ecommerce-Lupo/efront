import { useSelector } from 'react-redux';

export const useUserToken = () => {
  const auth = useSelector(
    (store: {
      auth: {
        user: null | {
          access: string;
          user: { username: string; email: string };
        };
        isAuthenticated: boolean;
      };
    }) => store.auth
  );
  return auth.user?.access;
};
