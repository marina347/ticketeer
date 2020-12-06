import UserTypes from "./user.types";
import user from "./user.reducer";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
  token: null,
  landingPage: "",
};

const stateWithUser = {
  isLoading: false,
  error: null,
  user: { _id: "1", sub: "12879234", name: "John", email: "john@gmail.com" },
  token: "token123",
  landingPage: "",
};

it("Should return the initial state", () => {
  expect(user(undefined, {})).toEqual(initialState);
});

describe("SIGN IN", () => {
  const mockUser = {
    _id: "2",
    sub: "6546456",
    name: "Ann",
    email: "ann@gmail.com",
  };

  it("Should set isLoading to false and set user to currentUser if is signIn action", () => {
    expect(
      user(initialState, {
        type: UserTypes.SIGN_IN,
        currentUser: mockUser,
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      currentUser: mockUser,
    });
  });
});

describe("SIGN OUT", () => {
  it("Should set isLoading to true if is signOutStart action", () => {
    expect(
      user(initialState, { type: UserTypes.SIGN_OUT_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set currentUser to null if is signOutStart action", () => {
    expect(
      user(stateWithUser, {
        type: UserTypes.SIGN_OUT_SUCCESS,
      })
    ).toEqual({
      ...stateWithUser,
      isLoading: false,
      currentUser: null,
    });
  });

  it("Should set isLoading to false and set error object if is signOutFailure action", () => {
    expect(
      user(initialState, {
        type: UserTypes.SIGN_OUT_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("GET TOKEN", () => {
  it("Should set isLoading to true if is getTokenStart action", () => {
    expect(
      user(initialState, { type: UserTypes.GET_TOKEN_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set token if is getTokenSuccess action", () => {
    expect(
      user(stateWithUser, {
        type: UserTypes.GET_TOKEN_SUCCESS,
        token: "token123",
      })
    ).toEqual({
      ...stateWithUser,
      isLoading: false,
      token: "token123",
    });
  });

  it("Should set isLoading to false and set error object if is getTokenFailure action", () => {
    expect(
      user(initialState, {
        type: UserTypes.GET_TOKEN_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("REMOVE TOKEN", () => {
  it("Should set isLoading to true if is removeTokenStart action", () => {
    expect(
      user(initialState, { type: UserTypes.REMOVE_TOKEN_START }).isLoading
    ).toBe(true);
  });

  it("Should set isLoading to false and set token and current user to null if is removeTokenSuccess action", () => {
    expect(
      user(stateWithUser, {
        type: UserTypes.REMOVE_TOKEN_SUCCESS,
      })
    ).toEqual({
      ...stateWithUser,
      isLoading: false,
      token: null,
      currentUser: null,
    });
  });

  it("Should set isLoading to false and set error object if is removeTokenFailure action", () => {
    expect(
      user(initialState, {
        type: UserTypes.REMOVE_TOKEN_FAILURE,
        error: "Error",
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: "Error",
    });
  });
});

describe("LANDING PAGE", () => {
  it("Should set landingPage if setLandingPage action", () => {
    expect(
      user(initialState, {
        type: UserTypes.SET_LANDING_PAGE,
        landingPage: "/home",
      })
    ).toEqual({
      ...initialState,
      landingPage: "/home",
    });
  });

  it("Should unset landing page if unsetLandingPage action", () => {
    expect(
      user(initialState, {
        type: UserTypes.UNSET_LANDING_PAGE,
      })
    ).toEqual({
      ...initialState,
      landingPage: "",
    });
  });
});
