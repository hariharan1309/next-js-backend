"use server";

export const saveUser = async (
  prevState: {
    error: boolean;
    success: boolean;
  },
  payload: { formData: FormData }
) => {
  const { formData } = payload;
  console.log(formData);
  return { error: true, success: true };
};
