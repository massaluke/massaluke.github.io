exports.handler = async (event, context) => {
    if (event.httpMethod === 'POST') {
      let status = 'red'; // Default color
      if (event.body) {
        const data = JSON.parse(event.body);
        if (data.status === 'green') {
          status = 'green';
        }
      }
      // Save the status to a database or a file (simplified here)
      // This example uses a file to store the status (not recommended for production)
      // You can use a database or other persistent storage for a real application
  
      const fs = require('fs');
      fs.writeFileSync('/tmp/button-status.json', JSON.stringify({ status }));
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Button status updated', status }),
      };
    }
  
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  };
  