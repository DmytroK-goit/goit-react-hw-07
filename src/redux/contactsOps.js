import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://67063151031fd46a8312553d.mockapi.io/";

export const fetchContacts = createAsyncThunk(
  "fetchAll",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get("/contacts");
      if (data) {
        toast.success(`На сервері знайдено ${data.length} контактів`);
      }
      return data;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "deleteContact",
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      if (data) {
        toast.success(`Контакт видалено`);
      }
      return data.id;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "addContact",
  async (body, thunkApi) => {
    try {
      const { data } = await axios.post("/contacts", body);
      if (data) {
        toast.success(`Успішно додано контакт`);
      }
      return data;
    } catch (error) {
      toast.error(`Error ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
