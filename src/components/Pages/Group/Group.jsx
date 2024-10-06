import React, { useEffect, useState } from 'react';
import * as Constants from '../../../helpers/constants';
import './Group.css';

const Group = () => {
  const [groupDetails, setGroupDetails] = useState({
    teamName: 'test',
    members: [],
    group_files: []
  });


  const groupId = localStorage.getItem('groupid');

  useEffect(() => {
    const fetchGroupInfo = async () => {
      // Only fetch group info if groupId is available
      if (!groupId) {
        console.log("Group ID is not available.");
        return; // Exit if groupId is null
      }

      console.log("fetching group info");
      const jwt = localStorage.getItem('token'); // Get JWT from local storage

      try {
        const response = await fetch(`${Constants.BACKEND_IP}/api/v1/group?groupId=${groupId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${jwt}`, // Include the token in the Authorization header
            "X_H_ACCESS_KEY_HEADER": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc0Mjc2MTR9.4ZfNFNP4-87RDnvdhbD0o5eUzYjCvcRAvdYppu3jJGY"
          }
        });

        const data = await response.json();
        console.log("The response: " + JSON.stringify(data));
        if (data && data.length > 0) {
          setGroupDetails(data[0]); // Set the group details if data is valid
        } else {
          console.error("No group details found for the given ID.");
        }
      } catch (error) {
        console.error("The error: " + error);
      }
    };

    fetchGroupInfo(); // Call the function to fetch group info
  }, [groupId]); // Dependency on groupId, will run when groupId changes

  return (
    <div className="container">
      <header>
        <h1>Hackathon Group Details</h1>
      </header>

      <section className="group-info">
        <h2>Team Name: <span id="team-name">{groupDetails.group_name}</span></h2>
        <h3>Members:</h3>
        <ul id="members-list">
        {groupDetails?.members?.length > 0 ? (
            groupDetails?.members?.flat().map((member, index) => ( // Flatten the nested array
              <li key={index}>
                {member?.name} - {member?.email} ({member?.role})
              </li>
            ))
          ) : (
            <li>Loading members...</li>
          )}
        </ul>
      </section>

      <section className="file-download">
        <h3>Uploaded Files:</h3>
        <ul id="file-list">
          {groupDetails?.group_files?.length > 0 ? (
            groupDetails.group_files.map((file, index) => (
              <li key={index}>{file.file_name}</li>
            ))
          ) : (
            <li>Loading files...</li>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Group;
