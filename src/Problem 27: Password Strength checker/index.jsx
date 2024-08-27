import React, { useState } from "react";
// const passwordRule = {
//   weak: /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,}$/,
//   strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
// };

// Function to check the password strength
// this fails if add special character in password
/* 
const checkPasswordStrength1 = (string) => {
  let isStrongPass = false;

  if (passwordRule["strong"].test(string)) {
    isStrongPass = true;
  }

  return isStrongPass;
}; 

*/

// Function to check the password strength
// this will work  if add special character in password
const checkPasswordStrength2 = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  let isStrongPass = false;

  if (hasUpperCase && hasLowerCase && hasNumber) {
    isStrongPass = true;
  }

  return isStrongPass;
};

const PasswordStrength = () => {
  const [isStrongPassword, setIsStrongPassword] = useState(false);

  const handleChange = (e) => {
    const strength = checkPasswordStrength2(e.target.value);
    setIsStrongPassword(strength);
  };

  return (
    <div>
      <h3>Enter you password here</h3>
      <input type="text" onChange={handleChange} />
      <p>{isStrongPassword ? "Strong" : "Weak"} Password</p>
    </div>
  );
};

export default PasswordStrength;
