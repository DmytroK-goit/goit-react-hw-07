import React, { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { selectIsError, selectIsLoading } from "./redux/contactsSlice";
import { LoadingSpinner } from "./components/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function MyApp({ mode, setMode }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "80px",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: mode === "dark" ? "grey.900" : "grey.100",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
        height: "36px",
      }}
    >
      <Select value={mode} onChange={(event) => setMode(event.target.value)}>
        <MenuItem value="light">Light</MenuItem>
        <MenuItem value="dark">Dark</MenuItem>
      </Select>
    </Box>
  );
}

function App() {
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: {
      mode: mode,
      background: {
        default: mode === "dark" ? "#333" : "#fff",
      },
    },
  });
  useEffect(() => {
    if (isError) {
      toast.error(`Error: ${isError}`);
    }
  }, [isError]);

  const getGradient = (mode) => {
    return mode === "dark"
      ? `linear-gradient(to bottom, #eed35c, #4f4f4f)`
      : `linear-gradient(to bottom, rgb(89, 236, 89), rgb(213, 250, 213))`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          background: getGradient(mode),
          minHeight: "100vh",
          padding: "20px",
          textAlign: "center",
          overflow: "scroll",
        }}
      >
        <MyApp mode={mode} setMode={setMode} />
        <h1>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
        {isLoading && <LoadingSpinner />}
        {isError && <p>{isError}</p>}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
