const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const jsonbinUrl = 'https://api.jsonbin.io/v3/b/66c2da1cad19ca34f8980357'; // Public bin URL
  const pushoverUserKey = process.env.uf9x4sd873yaksumd7en71ud4d26yh;
  const pushoverApiToken = process.env.ant9wqy4dtuvrozrmb89z4cja1i392;

  if (event.httpMethod === 'POST') {
    let status = 'red'; // Default color
    if (event.body) {
      const data = JSON.parse(event.body);
      if (data.status === 'green') {
        status = 'green';
      }
    }

    try {
      // Update the status in JSONbin.io
      const response = await fetch(jsonbinUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const result = await response.json();

        // Send a Pushover notification
        await sendPushoverNotification(status);

        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Button status updated', status }),
        };
      } else {
        return {
          statusCode: response.status,
          body: JSON.stringify({ message: 'Failed to update status' }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error updating status', error: error.message }),
      };
    }
  } else if (event.httpMethod === 'GET') {
    try {
      // Fetch the status from JSONbin.io
      const response = await fetch(jsonbinUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        const status = data.record?.status || 'red'; // Default to 'red' if status is not found

        return {
          statusCode: 200,
          body: JSON.stringify({ status }),
        };
      } else {
        return {
          statusCode: response.status,
          body: JSON.stringify({ message: 'Failed to fetch status' }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error fetching status', error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};

// Function to send Pushover notification
async function sendPushoverNotification(status) {
  const pushoverUserKey = process.env.PUSHOVER_USER_KEY;
  const pushoverApiToken = process.env.PUSHOVER_API_TOKEN;

  const title = `Button Status Updated`;
  const message = `The button status has been updated to ${status}.`;

  try {
    const pushoverResponse = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        token: pushoverApiToken,
        user: pushoverUserKey,
        title: title,
        message: message,
      }),
    });

    if (pushoverResponse.ok) {
      console.log('Pushover notification sent successfully');
    } else {
      console.error('Failed to send Pushover notification');
    }
  } catch (error) {
    console.error('Error sending Pushover notification:', error.message);
  }
}
