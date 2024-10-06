// import React, { useState, useEffect } from 'react';
// import './GroupMembers.css';

// const GroupMembers = () => {
//   const [members, setMembers] = useState([]); 
//   const [editMode, setEditMode] = useState(null);
//   const [editData, setEditData] = useState({ name: '', role: '' });
//   const [errors, setErrors] = useState({ name: '', role: '' });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [groupId, setGroupId] = useState(null); // State to store group ID

//   // Fetch group ID from local storage
//   useEffect(() => {
//     const storedGroupId = localStorage.getItem('groupid');
//     if (storedGroupId) {
//       try {
//         const parsedGroupId = JSON.parse(storedGroupId);
//         if (Array.isArray(parsedGroupId) && parsedGroupId.length > 0) {
//           setGroupId(parsedGroupId[0]); // Set only the first group ID
//         } else {
//           setGroupId(null);
//         }
//       } catch (error) {
//         console.error('Error parsing group ID:', error);
//         setGroupId(null);
//       }
//     }
//   }, []);

//   // Fetch group members from the API
//   useEffect(() => {
//     const fetchMembers = async () => {
//       if (!groupId) return; // Exit if groupId is not set

//       const jwt = localStorage.getItem('token'); // Assuming the token is stored under 'token'

//       try {
//         const response = await fetch(`http://localhost:8080/api/v1/group?groupId=${groupId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${jwt}`, // Include the token in the Authorization header
//             'X_H_ACCESS_KEY_HEADER': jwt,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch members');
//         }

//         const data = await response.json();

//         // Process the nested structure to flatten the members array
//         if (Array.isArray(data) && data.length > 0) {
//           const groupData = data[0]; // Assume first group is the one needed
//           const flatMembers = groupData.members.flat(); // Flatten members array
//           setMembers(flatMembers); // Set the flattened members list
//         } else {
//           setMembers([]); // If no data, set members to an empty array
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembers();
//   }, [groupId]); // Depend on groupId

//   // Handle input changes in the edit form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prevData) => ({ ...prevData, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//   };

//   // Handle editing a member
//   const handleEdit = (email) => {
//     const memberToEdit = members.find((member) => member.email === email);
//     setEditData({ name: memberToEdit.name || memberToEdit.user_name, role: memberToEdit.role });
//     setEditMode(email); // Use email as the unique key
//   };

//   // Handle saving the edited member details with validation
//   const handleSave = async (email) => {
//     if (!editData.name.trim()) {
//       setErrors((prevErrors) => ({ ...prevErrors, name: 'Name cannot be empty.' }));
//       return;
//     }
//     if (!editData.role.trim()) {
//       setErrors((prevErrors) => ({ ...prevErrors, role: 'Role cannot be empty.' }));
//       return;
//     }

//     const jwt = localStorage.getItem('token'); // Assuming the token is stored under 'token'

//     try {
//       // Update the member details in the API
//       const response = await fetch(`http://localhost:8080/api/v1/group?groupId=${groupId}`, {
//         method: 'PUT', // Assuming you're using PUT to update
//         headers: {
//           'Authorization': `Bearer ${jwt}`, // Include the token in the Authorization header
//           'X_H_ACCESS_KEY_HEADER': jwt,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: editData.name, role: editData.role }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update member');
//       }

//       // Update the state after a successful response
//       setMembers((prevMembers) =>
//         prevMembers.map((member) =>
//           member.email === email ? { ...member, name: editData.name, role: editData.role } : member
//         )
//       );

//       setEditMode(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Handle deleting a member
//   const handleDelete = (email) => {
//     setMembers((prevMembers) => prevMembers.filter((member) => member.email !== email));
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   return (
//     <div className="group-members">
//       <h1>Group Members</h1>
//       <table className="members-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th> {/* Added the Email column */}
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(members) && members.length > 0 ? (
//             members.map((member) => (
//               <tr key={member.email}>
//                 <td>
//                   {editMode === member.email ? (
//                     <>
//                       <input
//                         type="text"
//                         name="name"
//                         value={editData.name}
//                         onChange={handleInputChange}
//                         className="edit-input"
//                       />
//                       {errors.name && <span className="error">{errors.name}</span>}
//                     </>
//                   ) : (
//                     member.name || member.user_name
//                   )}
//                 </td>
//                 <td>{member.email}</td> {/* Displaying the email field */}
//                 <td>
//                   {editMode === member.email ? (
//                     <>
//                       <input
//                         type="text"
//                         name="role"
//                         value={editData.role}
//                         onChange={handleInputChange}
//                         className="edit-input"
//                       />
//                       {errors.role && <span className="error">{errors.role}</span>}
//                     </>
//                   ) : (
//                     member.role
//                   )}
//                 </td>
//                 <td>
//                   {editMode === member.email ? (
//                     <>
//                       <button className="save-button" onClick={() => handleSave(member.email)}>
//                         Save
//                       </button>
//                       <button className="cancel-button" onClick={() => setEditMode(null)}>
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button className="edit-button" onClick={() => handleEdit(member.email)}>
//                         Edit
//                       </button>
//                       <button className="delete-button" onClick={() => handleDelete(member.email)}>
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No members found.</td> {/* Adjusted colspan to 4 */}
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GroupMembers;

import React, { useState, useEffect } from 'react';
import './GroupMembers.css';

const GroupMembers = () => {
  const [members, setMembers] = useState([]); 
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', role: '' });
  const [errors, setErrors] = useState({ name: '', email: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [groupId, setGroupId] = useState(null); // State to store group ID

  // Fetch group ID from local storage
  useEffect(() => {
    const storedGroupId = localStorage.getItem('groupid');
    if (storedGroupId) {
      try {
        const parsedGroupId = JSON.parse(storedGroupId);
        if (Array.isArray(parsedGroupId) && parsedGroupId.length > 0) {
          setGroupId(parsedGroupId[0]); // Set only the first group ID
        } else {
          setGroupId(null);
        }
      } catch (error) {
        console.error('Error parsing group ID:', error);
        setGroupId(null);
      }
    }
  }, []);

  // Fetch group members from the API
  useEffect(() => {
    const fetchMembers = async () => {
      if (!groupId) return; // Exit if groupId is not set

      const jwt = localStorage.getItem('token'); // Assuming the token is stored under 'token'

      try {
        const response = await fetch(`http://load-balancer-hackathon-385661405.us-east-1.elb.amazonaws.com/api/v1/group?groupId=${groupId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`, // Include the token in the Authorization header
            'X_H_ACCESS_KEY_HEADER': jwt,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }

        const data = await response.json();

        // Process the nested structure to flatten the members array
        if (Array.isArray(data) && data.length > 0) {
          const groupData = data[0]; // Assume first group is the one needed
          const flatMembers = groupData.members.flat(); // Flatten members array
          setMembers(flatMembers); // Set the flattened members list
        } else {
          setMembers([]); // If no data, set members to an empty array
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [groupId]); // Depend on groupId

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  // Handle deleting a member
  const handleDelete = (email) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.email !== email));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="group-members">
      <h1>Group Members</h1>
      <table className="members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th> {/* Added the Email column */}
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(members) && members.length > 0 ? (
            members.map((member) => (
              <tr key={member.email}>
                <td>
                  {editMode === member.email ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                      {errors.name && <span className="error">{errors.name}</span>}
                    </>
                  ) : (
                    member.name || member.user_name
                  )}
                </td>
                <td>
                  {editMode === member.email ? (
                    <>
                      <input
                        type="text"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                      {errors.email && <span className="error">{errors.email}</span>}
                    </>
                  ) : (
                    member.email
                  )}
                </td>
                <td>
                  {editMode === member.email ? (
                    <>
                      <input
                        type="text"
                        name="role"
                        value={editData.role}
                        onChange={handleInputChange}
                        className="edit-input"
                      />
                      {errors.role && <span className="error">{errors.role}</span>}
                    </>
                  ) : (
                    member.role
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No members found.</td> {/* Adjusted colspan to 4 */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GroupMembers;
