import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState('');
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [city, setCity] = useState('');
  const [editRollNo, setEditRollNo] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { rollNo, name, degree, city };

    // if (editRollNo) {
    //   fetch(`${import.meta.env.VITE_SERVER_URL}/api/students/${editRollNo}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(student),
    //   })
    //     .then(res => res.json())
    //     .then(updated => {
    //       setStudents(students.map(s => s.rollNo === editRollNo ? updated : s));
    //       resetForm();
    //     });
    // // } else {
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })
        .then(res => res.json())
        .then(newStudent => {
          setStudents([...students, newStudent]);
          resetForm();
        });
    // }
  };

  

  const handleDelete = (rollNo) => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/students/${rollNo}`, { method: 'DELETE' })
      .then(() => setStudents(students.filter(s => s.rollNo !== rollNo)));
  };
  const handleEdit = (rollNo) => {
    const student = students.find(s => s.rollNo === rollNo);
    setRollNo(student.rollNo);
    setName(student.name);
    setDegree(student.degree);
    setCity(student.city);
    setEditRollNo(rollNo);

    handleDelete(rollNo);
    
  };

  const resetForm = () => {
    setRollNo('');
    setName('');
    setDegree('');
    setCity('');
    setEditRollNo(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold mb-4 ">Student Registration Form</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <label className='font-bold text-2xl'>Roll N.o</label>
        <input
          type="text"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Roll No"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <label className='font-bold text-2xl'>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <label className='font-bold text-2xl'>Degree</label>
        <input
          type="text"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="Degree"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <label className='font-bold text-2xl'>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          className="border border-gray-300 p-2 rounded"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-600 font-medium text-xl text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition"
          >
            {editRollNo ? 'Update' : 'Save'}
          </button>
          {/* {editRollNo && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )} */}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Student Table</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-400">
            <th className="text-xl border border-gray-300 p-4">Roll No</th>
            <th className="text-xl border border-gray-300 p-4">Name</th>
            <th className="text-xl border border-gray-300 p-4">Degree</th>
            <th className="text-xl border border-gray-300 p-4">City</th>
            <th className="text-xl border border-gray-300 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.rollNo} className="text-center">
                <td className="text-xl border border-gray-300 p-2">{student.rollNo}</td>
                <td className="text-xl border border-gray-300 p-2">{student.name}</td>
                <td className="text-xl border border-gray-300 p-2">{student.degree}</td>
                <td className="text-xl border border-gray-300 p-2">{student.city}</td>
                <td className="text-xl border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(student.rollNo)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.rollNo)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
