import React, { useState } from 'react';
import './GroupMembers.css';

const GroupMembers = () => {
  // Initial group members data (this would typically come from an API)
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    { id: 3, name: 'Alice Johnson', role: 'Project Manager' },
  ]);

  const [editMode, setEditMode] = useState(null); // Track which member is being edited
  const [editData, setEditData] = useState({ name: '', role: '' }); // Store edit form data

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle editing a member
  const handleEdit = (id) => {
    const memberToEdit = members.find((member) => member.id === id);
    setEditData({ name: memberToEdit.name, role: memberToEdit.role });
    setEditMode(id);
  };

  // Handle saving the edited member details
  const handleSave = (id) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, name: editData.name, role: editData.role } : member
      )
    );
    setEditMode(null);
  };

  // Handle deleting a member
  const handleDelete = (id) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  return (
    <div className="group-members">
      <h1>Group Members</h1>
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                {editMode === member.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  member.name
                )}
              </td>
              <td>
                {editMode === member.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editData.role}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  member.role
                )}
              </td>
              <td>
                {editMode === member.id ? (
                  <>
                    <button className="save-button" onClick={() => handleSave(member.id)}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={() => setEditMode(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEdit(member.id)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(member.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupMembers;
