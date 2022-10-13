import axios from "axios";

const sendEmail = async (email, message) => {
  try {
    const res = await axios.post(
      "/api/email",
      JSON.stringify({
        to: email,
        subject: `You have got a anonymous message.`,
        html: `<div>
                <p>You have received a new message.</p>
                <h2>${message}</h2>
                <br/>
                <small>This is a computer generated email. Please do not reply to this.</small>
            </div>`,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {}
};

export default sendEmail;
