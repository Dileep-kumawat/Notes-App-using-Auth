import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ENDPOINT,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject({
                msg: error.response.data?.msg || "Something went wrong",
                status: error.response.status,
                success: false
            });
        }

        return Promise.reject({
            msg: "Network error",
            status: 0,
            success: false
        });
    }
);

// CREATE NOTE
export async function createNote({ title, description }) {
    const res = await api.post("/api/notes/create", {
        title,
        description
    });

    return res.data;
}

// GET ALL NOTES
export async function getNotes() {
    const res = await api.get("/api/notes/");

    return res.data;
}

// UPDATE NOTE
export async function updateNote(id, { title, description }) {
    const res = await api.patch(`/api/notes/${id}`, {
        title,
        description
    });

    return res.data;
}

// DELETE NOTE
export async function deleteNote(id) {
    const res = await api.delete(`/api/notes/${id}`);

    return res.data;
}