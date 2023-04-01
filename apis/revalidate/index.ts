import clientApi from '..';

export const revalidateMainPage = async () => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: '/',
  });
};

export const revalidatePostPage = async (id: number) => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: `/post/${id}`,
  });
};

export const revalidateCategoryPage = async (name: string) => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: `/category/${name}`,
  });
};

export const revalidateTagPage = async (name: string) => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: `/tag/${name}`,
  });
};

export const revalidateManagePage = async () => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: '/manage',
  });
};

export const revalidateManageCategoryPage = async () => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: '/manage/category',
  });
};
