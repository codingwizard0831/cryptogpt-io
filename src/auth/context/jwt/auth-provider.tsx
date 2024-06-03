'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';
import { getUserInfo, setUserInfo, isValidToken, getAccessToken, setAccessToken, setRefreshToken } from './utils';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

// const STORAGE_KEY = 'access_token';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = getAccessToken();
      // console.log('accessToken', accessToken);

      if (accessToken !== 'undefined' && accessToken && isValidToken(accessToken)) {
        setAccessToken(accessToken);
        const user = getUserInfo();

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (username: string, password: string, remember: boolean) => {
    const data = {
      username,
      password,
      remember,
    };

    const res = await axios.post(endpoints.auth.login, data);
    const {
      access_token,
      refresh_token,
      user,
      success,
      message,
    } = res.data;

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    console.log('user', user);
    setUserInfo(user);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          access_token,
          refresh_token,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, username: string, password: string, phone: string) => {
      const data = {
        email,
        username,
        password,
        phone_number: phone,
      };

      const res = await axios.post(endpoints.auth.register, data);

      const { success, message } = res.data;
      if (!success) {
        throw new Error(message);
      }

      // sessionStorage.setItem(STORAGE_KEY, accessToken);

      // dispatch({
      //   type: Types.REGISTER,
      //   payload: {
      //     user: {
      //       ...user,
      //       accessToken,
      //     },
      //   },
      // });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await axios.post(endpoints.auth.logout, {});
      setAccessToken(null);
      setRefreshToken(null);
    } catch (error) {
      setAccessToken(null);
      setRefreshToken(null);
    }
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
