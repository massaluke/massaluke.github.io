const fs = require('fs');

exports.handler = async (event, context) => {
  try {
    const statusFile = '/tmp/button-status.json';
    if (fs.existsSync(statusFile)) {
      const statusData = fs.readFileSync(statusFile);
      return {
        statusCode: 200,
        //body: statusData,
      body: JSON.stringify({ status: 'gruubbo' }), // Default status

      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'redrub' }), // Default status
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error reading status' }),
    };
  }
};
