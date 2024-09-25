import React from 'react';
import './Account.css';

const Account = () => {
    const user = {
        username: 'john_doe',
        email: 'john@example.com',
    };

    const hackathonGroup = {
        name: 'Innovators',
        role: 'Team Member',
        project: 'AI for Good',
    };

    return (
        <div className="account-container">
            <h1>Account Information</h1>
            <div className="user-info">
                <h2>User Details</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div className="group-info">
                <h2>Hackathon Group Information</h2>
                <p><strong>Group Name:</strong> {hackathonGroup.name}</p>
                <p><strong>Role:</strong> {hackathonGroup.role}</p>
                <p><strong>Project:</strong> {hackathonGroup.project}</p>
            </div>
        </div>
    );
};

export default Account;
