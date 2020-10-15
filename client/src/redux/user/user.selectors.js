import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser._id
);

export const selectToken = createSelector([selectUser], (user) => user.token);

export const selectIsUserLoading = createSelector(
  [selectUser],
  (user) => user.isLoading
);

export const selectLandingPage = createSelector(
  [selectUser],
  (user) => user.landingPage
);

export const selectUserNameAndSurname = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.name
);
