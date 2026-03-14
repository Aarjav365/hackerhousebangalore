// Google Apps Script for Outliers Event Form Submission
// Deploy as Web App to receive form data and save to Google Sheets

function doGet() {
  return HtmlService.createHtmlOutput(`
    <html>
      <body>
        <h1>Outliers Event API</h1>
        <p>POST endpoint for form submissions</p>
        <p>URL: ${ScriptApp.getService().getUrl()}</p>
        <p>Status: Active</p>
      </body>
    </html>
  `);
}

function doPost(e) {
  try {
    // Get or create the sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions') || 
                   SpreadsheetApp.getActiveSpreadsheet().insertSheet('Submissions');
    
    // Add headers if sheet is new
    if (sheet.getLastRow() === 0) {
      sheet.getRange('A1:H1').setValues([[
        'Name', 'Email', 'Company', 'LinkedIn', 'University', 'Benefit', 'Timestamp', 'IP Address'
      ]]);
      sheet.autoResizeColumn(1, 8);
    }
    
    // Parse incoming data
    let data = {};
    
    // Handle JSON data
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If JSON parsing fails, try to parse as form data
        const params = e.postData.contents.split('&');
        params.forEach(param => {
          const [key, value] = param.split('=');
          if (key && value) {
            data[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        });
      }
    }
    
    // Also check parameters for form data
    if (e.parameters) {
      Object.keys(e.parameters).forEach(key => {
        if (key !== 'contentType') {
          data[key] = e.parameters[key][0];
        }
      });
    }
    
    // Get timestamp
    const timestamp = new Date().toISOString();
    
    // Get IP address
    const ip = e.parameter && e.parameter.ip ? e.parameter.ip : 
                e.headers && e.headers['X-Forwarded-For'] ? e.headers['X-Forwarded-For'] : 
                e.headers && e.headers['x-real-ip'] ? e.headers['x-real-ip'] : 
                'Unknown';
    
    // Validate required fields
    if (!data.name || !data.email) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Name and email are required',
        timestamp: timestamp
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append the data to the sheet
    sheet.appendRow([
      data.name || '',
      data.email || '',
      data.company || '',
      data.linkedin || '',
      data.university || '',
      data.benefit || '',
      timestamp,
      ip
    ]);
    
    // Log the submission for debugging
    Logger.log('New submission received: ' + JSON.stringify(data));
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully to Google Sheets',
      timestamp: timestamp,
      row: sheet.getLastRow(),
      data: {
        name: data.name,
        email: data.email
      }
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this in Apps Script editor to test
function testSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    company: 'Test Company',
    linkedin: 'https://linkedin.com/in/test',
    university: 'Test University',
    benefit: 'Test benefit response'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    },
    parameter: {
      ip: '127.0.0.1'
    },
    headers: {
      'X-Forwarded-For': '127.0.0.1'
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}

// Function to clear all data (use with caution)
function clearAllData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
  if (sheet) {
    sheet.clear();
    sheet.getRange('A1:H1').setValues([[
      'Name', 'Email', 'Company', 'LinkedIn', 'University', 'Benefit', 'Timestamp', 'IP Address'
    ]]);
    Logger.log('All data cleared from Submissions sheet');
  }
}

// Function to get submission count
function getSubmissionCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Submissions');
  if (sheet) {
    const count = sheet.getLastRow() - 1; // Subtract 1 for header row
    Logger.log('Total submissions: ' + count);
    return count;
  }
  return 0;
}
