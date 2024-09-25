import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.css'

const Login = () => {
	const [formValues, setFormValues] = useState({email: '', password: '' });
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [authentication, setAuthentication] = useState(null);

	const navigate = useNavigate();

	// Regular expressions for validation
	const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	
		// Validate as user types
		validateField(name, value);
	};
	
	const validateField = (name, value) => {
		let error = '';
	
		switch (name) {
			case 'username':
				if (!value.trim()) {
					error = 'Username is required';
				}
				break;
			case 'email':
				if (!emailRegex.test(value)) {
					error = 'Enter a valid email address';
				}
				break;
			case 'password':
				if (!strongPasswordRegex.test(value)) {
					error =
						'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @$!%*?&)';
				}
				break;
			default:
				break;
		}
	
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: error,
		}));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
	
		// Validate all fields before submitting
		const { email, password } = formValues;
		if (!email || !password || errors.email || errors.password) {
			validateField('email', email);
			validateField('password', password);
			return;
		}
	
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			})
		}
	
		fetch("http://localhost:8080/api/v1/authenticate/login", requestOptions).then(response => {
			console.log("the response: " + JSON.stringify(response))
			return response.json()
		})
			.then(data => setAuthentication(data))
			.then(() => {
				console.log('response from the api:', authentication);
				console.log('form values after api:', formValues);

				navigate('/account');
			})
			.catch(error => console.error(error));
	
		console.log('form values:', formValues);
	
	};

	return (
		<div className="form-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				{/* <label htmlFor="email">Email:</label>
      <input type="email" id="email" placeholder="Enter your email" required />
      <label htmlFor="password">Password:</label>
      <input
					type="password"
					id="password"
					name="password"
					value={formValues.password}
					onChange={handleChange}
					placeholder="Enter your password"
					required
				/> */}
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formValues.email}
					onChange={handleChange}
					placeholder="Enter your email"
					required
				/>
				{errors.email && <span className="error">{errors.email}</span>}

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formValues.password}
					onChange={handleChange}
					placeholder="Enter your password"
					required
				/>
				{errors.password && <span className="error">{errors.password}</span>}
				<button type="submit">Login</button>
			</form>
		</div>
	)
}

export default Login
