const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const jsonbinUrl = 'https://api.jsonbin.io/v3/b/66c2daaaad19ca34f898037c';
  const apiKey = '$2a$10$GCEI54Bzh3KvOPwbzmx0Y.O4UTf/RsXZBDhnqGxDcqHt0UkmM7YCy';

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
          'X-Master-Key': apiKey,
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Button status updated', status }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error updating status', error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method not allowed' }),
  };
};