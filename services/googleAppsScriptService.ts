// Google Apps Script Service for form submission
export interface FormData {
  name: string;
  email: string;
  company: string;
  linkedin: string;
  university: string;
  benefit: string;
}

export interface AppsScriptResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
  row?: number;
}

// Replace with your Google Apps Script URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTREuxRVvtY6eedo_HALdMP-4vuyUi8keuPmLTNlzMJXf4G2_y-dondkbIxL6MVPegbQ/exec';

export const submitToGoogleSheets = async (data: FormData): Promise<AppsScriptResponse> => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // Remove mode: 'no-cors' to allow proper error handling
    });

    // Try to parse response
    let result;
    try {
      const responseText = await response.text();
      result = JSON.parse(responseText);
    } catch (parseError) {
      // If we can't parse the response, assume success (Google Apps Script often returns empty responses)
      result = { success: true, message: 'Submitted successfully' };
    }

    console.log('✅ Google Sheets submission successful');
    return {
      success: true,
      message: result.message || 'Data submitted successfully',
      timestamp: result.timestamp
    };
  } catch (error) {
    console.error('❌ Error submitting to Google Sheets:', error);
    
    // Fallback to localStorage
    const existingData = JSON.parse(localStorage.getItem('outliers_submissions') || '[]');
    existingData.push({
      ...data,
      timestamp: new Date().toISOString(),
      fallback: true
    });
    localStorage.setItem('outliers_submissions', JSON.stringify(existingData));
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Saved to localStorage as fallback'
    };
  }
};

// Alternative method using URL-encoded form data (often more reliable with Google Apps Script)
export const submitToGoogleSheetsForm = async (data: FormData): Promise<AppsScriptResponse> => {
  try {
    const formData = new URLSearchParams();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('company', data.company);
    formData.append('linkedin', data.linkedin);
    formData.append('university', data.university);
    formData.append('benefit', data.benefit);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    let result;
    try {
      const responseText = await response.text();
      result = JSON.parse(responseText);
    } catch (parseError) {
      result = { success: true, message: 'Submitted successfully' };
    }

    console.log('✅ Google Sheets submission successful (form data)');
    return {
      success: true,
      message: result.message || 'Data submitted successfully',
      timestamp: result.timestamp
    };
  } catch (error) {
    console.error('❌ Error submitting to Google Sheets (form data):', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
