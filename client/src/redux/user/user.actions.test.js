import UserTypes from "./user.types";
import * as userActions from "./user.actions";

const mockUser = {
  _id: "1",
  name: "John",
  email: "john@gmail.com",
  sub: "243243254",
};

describe("SIGN IN ACTIONS", () => {
  it("Should create the signInStart action", () => {
    expect(userActions.signInStart().type).toEqual(UserTypes.SIGN_IN_START);
  });

  it("Should create the signInSuccess action", () => {
    const action = userActions.signInSuccess(mockUser);
    expect(action.type).toEqual(UserTypes.SIGN_IN_SUCCESS);
    expect(action.currentUser).toEqual(mockUser);
  });

  it("Should create the signInFailure action", () => {
    const action = userActions.signInFailure("Error");
    expect(action.type).toEqual(UserTypes.SIGN_IN_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create signInStartAsync action", () => {
    const mockActionCreator = userActions.signInStartAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(userActions.signInStart());
  });
});

describe("SIGN OUT ACTIONS", () => {
  it("Should create the signOutStart action", () => {
    expect(userActions.signOutStart().type).toEqual(UserTypes.SIGN_OUT_START);
  });

  it("Should create the signOutSuccess action", () => {
    const action = userActions.signOutSuccess(mockUser);
    expect(action.type).toEqual(UserTypes.SIGN_OUT_SUCCESS);
  });

  it("Should create the signOutFailure action", () => {
    const action = userActions.signOutFailure("Error");
    expect(action.type).toEqual(UserTypes.SIGN_OUT_FAILURE);
    expect(action.error).toEqual("Error");
  });
});

describe("GET TOKEN ACTIONS", () => {
  it("Should create the getTokenStart action", () => {
    expect(userActions.getTokenStart().type).toEqual(UserTypes.GET_TOKEN_START);
  });

  it("Should create the getTokenSuccess action", () => {
    const action = userActions.getTokenSuccess("token123");
    expect(action.type).toEqual(UserTypes.GET_TOKEN_SUCCESS);
    expect(action.token).toEqual("token123");
  });

  it("Should create the getTokenFailure action", () => {
    const action = userActions.getTokenFailure("Error");
    expect(action.type).toEqual(UserTypes.GET_TOKEN_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create getTokenAsync action", () => {
    const mockActionCreator = userActions.getTokenAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(userActions.getTokenStart());
  });
});

describe("REMOVE TOKEN ACTIONS", () => {
  it("Should create the removeTokenStart action", () => {
    expect(userActions.removeTokenStart().type).toEqual(
      UserTypes.REMOVE_TOKEN_START
    );
  });

  it("Should create the removeTokenSuccess action", () => {
    const action = userActions.removeTokenSuccess();
    expect(action.type).toEqual(UserTypes.REMOVE_TOKEN_SUCCESS);
  });

  it("Should create the removeTokenFailure action", () => {
    const action = userActions.removeTokenFailure("Error");
    expect(action.type).toEqual(UserTypes.REMOVE_TOKEN_FAILURE);
    expect(action.error).toEqual("Error");
  });

  it("Should create removeTokenAsync action", () => {
    const mockActionCreator = userActions.removeTokenAsync();
    const mockDispatch = jest.fn();
    mockActionCreator(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(userActions.removeTokenStart());
  });
});

describe("LANDING PAGE ACTIONS", () => {
  it("Should create the setLandingPage action", () => {
    const action = userActions.setLandingPage("/home");
    expect(action.type).toEqual(UserTypes.SET_LANDING_PAGE);
    expect(action.landingPage).toEqual("/home");
  });

  it("Should create the unsetLandingPage action", () => {
    const action = userActions.unsetLandingPage();
    expect(action.type).toEqual(UserTypes.UNSET_LANDING_PAGE);
  });
});
