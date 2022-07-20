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

  const json = await response.json();

  if (!response.ok) {
    alert(json.message);
    throw new Error(json.message || '문제가 발생했습니다.');
  }
};

export default signup;
