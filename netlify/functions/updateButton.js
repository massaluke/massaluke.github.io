const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const jsonbinUrl = 'https://api.jsonbin.io/v3/b/66c2da1cad19ca34f8980357'; // Public bin URL

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
