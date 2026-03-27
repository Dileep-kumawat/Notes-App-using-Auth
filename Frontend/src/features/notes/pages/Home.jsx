import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useNotes } from "../hooks/useNotes";

const Home = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [formData2, setFormData2] = useState({
        title: "",
        description: ""
    });

    const user = useSelector(state => state.auth.user);
    const notes = useSelector(state => state.notes.notes);

    const { handleGetNotes, handleDeleteNote, handleCreateNote, handleUpdateNote } = useNotes();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user]);

    useEffect(() => {
        handleGetNotes();
    }, []);

    console.log(notes);

    const handleDelete = (id) => {
        handleDeleteNote(id);
    }

    const createNote = async (e) => {
        e.preventDefault();

        await handleCreateNote(formData);

        setFormData({
            title: "",
            description: ""
        });
    }

    const handleSubmit = async (id) => {
        await handleUpdateNote(id, formData2);

        setFormData2({
            title: "",
            description: ""
        });
    }

    return (
        <div>
            <h1>Create Note :- </h1>
            <form onSubmit={createNote}>
                <input
                    onChange={(e) => {
                        setFormData(prev => {
                            return {
                                ...prev,
                                title: e.target.value
                            }
                        })
                    }}
                    value={formData.title}
                    type="text" placeholder="Enter title..." />
                <input
                    onChange={(e) => {
                        setFormData(prev => {
                            return {
                                ...prev,
                                description: e.target.value
                            }
                        })
                    }}
                    value={formData.description}
                    type="text" placeholder="Enter description..." />
                <button>Create note</button>
            </form>
            <h1>Update Note :- </h1>
            <form>
                <input
                    onChange={(e) => {
                        setFormData2(prev => {
                            return {
                                ...prev,
                                title: e.target.value
                            }
                        })
                    }}
                    value={formData2.title}
                    type="text" placeholder="Enter title..." />
                <input
                    onChange={(e) => {
                        setFormData2(prev => {
                            return {
                                ...prev,
                                description: e.target.value
                            }
                        })
                    }}
                    value={formData2.description}
                    type="text" placeholder="Enter description..." />
            </form>
            {notes.map((elem) => {
                return <div key={elem._id}>
                    <h1>{elem?.title}</h1>
                    <h3>{elem?.description}</h3>
                    <button onClick={() => { handleDelete(elem._id) }}>Delete</button>
                    <button onClick={() => handleSubmit(elem._id)}>Update note</button>
                </div>
            })}
        </div>
    )
}

export default Home
