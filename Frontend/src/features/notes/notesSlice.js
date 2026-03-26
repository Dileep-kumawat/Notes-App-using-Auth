import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    loading: false,
    error: null
};

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },

        addNote: (state, action) => {
            state.notes.unshift(action.payload);
        },

        updateNoteInState: (state, action) => {
            const updated = action.payload;

            const index = state.notes.findIndex(
                (note) => note._id === updated._id
            );

            if (index !== -1) {
                state.notes[index] = updated;
            }
        },

        removeNote: (state, action) => {
            const id = action.payload;

            state.notes = state.notes.filter(
                (note) => note._id !== id
            );
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setNotes,
    addNote,
    updateNoteInState,
    removeNote,
    setLoading,
    setError
} = notesSlice.actions;

export default notesSlice.reducer;