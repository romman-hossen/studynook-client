/**
 * Validates password strength:
 * - At least 6 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 */
export function validatePassword(password = "") {
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const errors = [];
  if (!hasMinLength) {
    errors.push("Must be at least 6 characters");
  }
  if (!hasUppercase) {
    errors.push("Must contain at least one uppercase letter (A-Z)");
  }
  if (!hasLowercase) {
    errors.push("Must contain at least one lowercase letter (a-z)");
  }

  return {
    isValid: hasMinLength && hasUppercase && hasLowercase,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    errors,
  };
}

/**
 * Basic email format validator
 */
export function validateEmail(email = "") {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).trim().toLowerCase());
}

export const validators = {
  validatePassword,
  validateEmail,
};

export default validators;
