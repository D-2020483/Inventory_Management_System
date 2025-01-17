import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  user : UserState | null;
}

export interface UserState{
  userId: string;
  name: string;
  emai: string;
  token: string | null;
}

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
});




export const { setIsSidebarCollapsed, setIsDarkMode ,setUser , clearUser} = globalSlice.actions;

export default globalSlice.reducer;