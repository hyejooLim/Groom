import clientApi from '..';

export const revalidatePostPage = async (id: number) => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: `/post/${id}`,
  });
};

export const revalidateManagePage = async () => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: '/manage',
  });
};

//
export const revalidateManageCategoryPage = async () => {
  await clientApi.put(`/revalidate?secret=${process.env.NEXT_PUBLIC_MY_SECRET_TOKEN}`, {
    path: '/manage/category',
  });
};
