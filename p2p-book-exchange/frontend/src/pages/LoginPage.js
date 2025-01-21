// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from "axios";

// const LoginPage = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false); // State to handle button loading
//   const navigate = useNavigate(); // For navigation after login
//   const { login } = useAuth(); // Login function from AuthContext

//   // Handle the form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       setMessage(''); // Clear any previous messages

//       // Send login request to the backend
//       const response = await axios.post("http://localhost:8080/auth/login", {
//         username,
//         password,
//       });

//       // Call the login method to store the token or user details
//       login(response.data.token);

//       // Navigate the user to the appropriate page after login
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       if (error.response && error.response.data && error.response.data.message) {
//         setMessage(error.response.data.message); // Display error message from the server
//       } else {
//         setMessage('Invalid username or password. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update username and password states and clear any error message
//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value);
//     setMessage(''); // Clear the error message on input change
//   };

//   return (
//     <main className="flex min-h-screen bg-gray-100">
//       <div className="flex flex-col justify-center w-full sm:w-1/2 p-8 bg-white">
//         <div className="max-w-md mx-auto">
//           <div className="mb-8 text-center">
//             <h1 className="text-4xl font-bold text-gray-900">Login</h1>
//             <p className="text-gray-600">Enter your credentials to access your account</p>
//           </div>

//           {/* Login Form */}
//           <form onSubmit={handleSubmit}>
//             {message && (
//               <p
//                 className={`${
//                   message.includes('successfully') ? 'text-green-600' : 'text-red-600'
//                 }`}
//               >
//                 {message}
//               </p>
//             )}
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-gray-700">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 placeholder="Username"
//                 value={username}
//                 onChange={handleInputChange(setUsername)}
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="block text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 placeholder="Password"
//                 value={password}
//                 onChange={handleInputChange(setPassword)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className={`w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg ${
//                 loading ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               disabled={loading}
//             >
//               {loading ? 'Processing...' : 'Login'}
//             </button>
//             <p className="mt-2 text-center">
//               <Link to="/forgot-password" className="text-blue-600 hover:underline">
//                 Forgot Password?
//               </Link>
//             </p>
//           </form>

//           {/* Link to register if the user doesn't have an account */}
//           <p className="mt-4 text-center">
//             Don’t have an Account?{' '}
//             <Link to="/register" className="text-blue-600 hover:underline">
//               Register Here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default LoginPage;
