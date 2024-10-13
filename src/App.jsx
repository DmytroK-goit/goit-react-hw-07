import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { fetchContacts } from "./redux/contactsOps";

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
  const dispatch = useDispatch();
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
    dispatch(fetchContacts());
  }, [dispatch]);
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: getGradient(mode),
          minHeight: "100vh",
          minWidth: "100vh",
          padding: "20px",
          textAlign: "center",
          overflow: "auto",
        }}
      >
        <MyApp mode={mode} setMode={setMode} />
        <div
          className="w-auto items-center my-10 rounded-md shadow-xl h-[49px]"
          style={{ boxShadow: "15px 15px 10px rgb(190, 126, 30)" }}
        >
          <h1 className="text-xl sm:text-4xl md:text-7xl font-bold text-black">
            Phonebook
          </h1>
        </div>

        <ContactForm />
        <SearchBox />
        <ContactList />
        {isLoading && <LoadingSpinner />}
        {isError && <p className="text-2xl font-bold text-black">{isError}</p>}
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
