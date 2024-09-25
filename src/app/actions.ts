"use server";

export async function createReport(formData: FormData) {
  const URL = `${process.env.DB_HOST}/api/report`;

  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    console.log(res);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
