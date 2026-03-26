import { useDispatch } from "react-redux";
import {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} from "../apis/notes.api";

import {
    setNotes,
    addNote,
    updateNoteInState,
    removeNote,
    setLoading,
    setError
} from "../notesSlice";

export function useNotes() {
    const dispatch = useDispatch();

    function handleError(error) {
        const message = error?.msg || "Unexpected error occurred";
        dispatch(setError(message));
        console.error("Notes Error:", error);
    }

    // GET NOTES
    async function handleGetNotes() {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await getNotes();
            dispatch(setNotes(res.notes));
            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // CREATE NOTES
    async function handleCreateNote(data) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await createNote(data);

            dispatch(addNote(res.note));

            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // UPDATE NOTE
    async function handleUpdateNote(id, data) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const res = await updateNote(id, data);

            dispatch(updateNoteInState(res.note));

            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    // DELETE NOTE
    async function handleDeleteNote(id) {
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            await deleteNote(id);

            dispatch(removeNote(id));

            return { success: true };
        } catch (error) {
            handleError(error);
            return { success: false };
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleGetNotes,
        handleCreateNote,
        handleUpdateNote,
        handleDeleteNote
    };
}