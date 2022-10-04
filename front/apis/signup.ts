import clientApi from '.';

interface SignupProps {
  email: string;
  password: string;
  name: string;
}

const signup = async ({ data }: { data: SignupProps }): Promise<Response | string> => {
  const response = await clientApi.post<Response | string>('/signup', data);

  return response;
};

export default signup;
