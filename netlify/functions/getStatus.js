const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const jsonbinUrl = 'https://api.jsonbin.io/v3/b/66c2da1cad19ca34f8980357/latest';

  try {
    const response = await fetch(jsonbinUrl, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      const status = data.record.status || 'red'; // Default to 'red' if status is not found

      return {
        statusCode: 200,
        body: JSON.stringify({ status }),
      };
    } else {
      // If the fetch fails, return a default status
      return {
        statusCode: 200,
        body: JSON.stringify({ status: 'red' }), // Default status
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error reading status', error: error.message }),
    };
  }
};
