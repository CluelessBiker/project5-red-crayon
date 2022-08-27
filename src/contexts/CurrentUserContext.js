/* eslint-disable */
import {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { removeTokenTimestamp, shouldRefreshToken } from '../utils/utils';

/**
 * Determin logged-in status.
 * Variables & function code provided in Moments walkthrough.
 */

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

/**
 * Retrieve user data from API upon component mount.
 * Provide user data to child components.
 */
export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get('dj-rest-auth/user/');
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  /**
   * Axios interceptor.
   * If 401 error, refresh token to maintain loggedin status.
   */
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/login');
              }
              return null;
            });
            return config;
          }
        }
        removeTokenTimestamp();
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post('/dj-rest-auth/token/refresh/');
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push('/login');
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      },
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
