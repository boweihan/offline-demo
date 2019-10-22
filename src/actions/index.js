export * from "./api";
export * from "./types";

export const selectUser = id => ({
  type: 'SELECT_USER',
  id,
});
