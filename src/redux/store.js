import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import searchFilterReducer from "./filtersSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    searchFilter: searchFilterReducer,
  },
});

// const persistConfig = {
//   key: "contacts",
//   storage,
//   whitelist: ["items"],
// };

// const persistedContactsReducer = persistReducer(persistConfig, contactsReducer);
// const rootReducer = combineReducers({
//   contacts: persistedContactsReducer,
//   filters: filtersReducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });
// export const persistor = persistStore(store);
