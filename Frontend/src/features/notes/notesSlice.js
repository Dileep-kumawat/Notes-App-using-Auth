import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    loading: false,
    error: null
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    }
});

export const { setNotes, setLoading, setError } = notesSlice.actions;

export default notesSlice.reducer;