// interface SignupProps {
//   email: string;
//   password: string;
//   name: string;
// }

const signup = async ({ data }) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
};

export default signup;
