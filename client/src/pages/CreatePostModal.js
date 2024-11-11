import React from 'react'

function CreatePostModal({onPost}) {
    const [title, setTitle] = useState('');
    const [desc, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onPost({title, desc});
    };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 w-11/12 max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Edit Task</h2>
                    <button onClick={onClose} className="text-red-600 hover:text-red-800">
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-2"
                            value={desc}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
  )
}

export default CreatePostModal
