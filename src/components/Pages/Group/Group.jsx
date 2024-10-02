import React, { useEffect, useState } from 'react';
import * as Constants from '../../../helpers/constants';
import './Group.css';

const Group = () => {

    const [groupDetails, setGroupDetails] = useState({
        teamName: 'test',
        members: [],
        files: []
    });

    useEffect(() => async function() {
        // Simulating an API call
            console.log("fetching group info");
            // Replace with your API endpoint
            try {
                const response = await fetch('http://44.210.137.95:8080/api/v1/group?groupId=8cb5f266-0225-4c18-9dfb-49d18e4ce261', {
                    headers: {
                        "X_H_ACCESS_KEY_HEADER": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mjc0Mjc2MTR9.4ZfNFNP4-87RDnvdhbD0o5eUzYjCvcRAvdYppu3jJGY"
                    }
                });
                const data = await response.json();
                console.log("The response: " + JSON.stringify(data));
                setGroupDetails(data[0]);
            } catch (error) {
                console.log("The error: " + error.stack);
            }
        }, []);


    return (
        <div className="container">
            <header>
                <h1>Hackathon Group Details</h1>
            </header>

            <section className="group-info">
                <h2>Team Name: <span id="team-name">Innovators</span></h2>
                <h3>Members:</h3>
                <ul id="members-list">
                    <li>
                        {groupDetails.teamName}
                        {groupDetails.members}
                        {groupDetails.members.length}
                    </li>
                    {groupDetails.members.length > 0 ? (
                        groupDetails.members.map((member, index) => (
                            <li key={index}>{member.user_name}</li>
                        ))
                    ) : (
                        <li>Loading members...</li>
                    )}
                </ul>
            </section>

            <section className="file-download">
                <h3>Uploaded Files:</h3>
                {/* <ul id="file-list">
                {groupDetails.group_files.length > 0 ? (
                        groupDetails.group_files.map((file, index) => (
                            <li key={index}>{file.file_name}</li>
                        ))
                    ) : (
                        <li>Loading files...</li>
                    )}
                </ul> */}
            </section>
        </div>
    );
};

export default Group;
