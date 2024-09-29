"use server";

export async function getToken() {
  try {
    const formData = new FormData();
    formData.append('email', process.env.DB_USER || '');
    formData.append('password', process.env.DB_PASSWD || '');

    const res = await fetch(`${process.env.DB_HOST}/login`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data.data.token;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function createReport(formData: FormData) {
  const token = await getToken();
  if (!token) throw new Error('Unable to retrieve token');
  const URL = `${process.env.DB_HOST}/submissions`;
  console.log("TUTAJ", token, URL)
  try {
    const res = await fetch(URL, {
      method: "POST",
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(formData, res);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}
