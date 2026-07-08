// Google Apps Script for TekCog Job Applications
// This script handles form submissions and resume uploads

const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const FOLDER_ID = 'YOUR_DRIVE_FOLDER_ID_HERE'; // Replace with your Google Drive folder ID for resumes

// Configuration
const CONFIG = {
  sheetName: 'Applications',
  resumeFolderName: 'TekCog-Resumes',
  notificationEmail: 'hr@tekcog.com', // Change to your HR email
  maxFileSize: 8 * 1024 * 1024, // 8MB
  allowedFileTypes: ['application/pdf']
};

// Initialize the spreadsheet
function initializeSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName(CONFIG.sheetName) || ss.insertSheet(CONFIG.sheetName);
  
  // Set headers if they don't exist
  if (sheet.getRange(1, 1).getValue() === '') {
    const headers = [
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Position Applied',
      'Experience',
      'Resume File Name',
      'Resume Drive Link',
      'Status',
      'Notes'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

// Main function to handle form submissions
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.fullName || !data.emailId || !data.contactNo || !data.role || !data.about) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'Missing required fields'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle file upload if provided
    let resumeFileName = '';
    let resumeDriveLink = '';
    
    if (data.resumeFile && data.resumeFile !== '') {
      const uploadResult = uploadResume(data.resumeFile, data.resumeFileName);
      if (uploadResult.success) {
        resumeFileName = uploadResult.fileName;
        resumeDriveLink = uploadResult.driveLink;
      }
    }
    
    // Save to Google Sheets
    const result = saveApplication({
      fullName: data.fullName,
      emailId: data.emailId,
      contactNo: data.contactNo,
      role: data.role,
      about: data.about,
      resumeFileName: resumeFileName,
      resumeDriveLink: resumeDriveLink
    });
    
    // Send notification email
    sendNotificationEmail({
      fullName: data.fullName,
      emailId: data.emailId,
      contactNo: data.contactNo,
      role: data.role,
      about: data.about,
      resumeFileName: resumeFileName,
      resumeDriveLink: resumeDriveLink
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Application submitted successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing application:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to handle file uploads
function uploadResume(base64Data, fileName) {
  try {
    if (!base64Data || !fileName) {
      return {success: false, error: 'No file provided'};
    }
    
    // Get or create resume folder
    const folder = getOrCreateFolder(CONFIG.resumeFolderName);
    
    // Decode base64 file
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data.split(',')[1] || base64Data),
      'application/pdf',
      fileName
    );
    
    // Check file size
    if (blob.getBytes().length > CONFIG.maxFileSize) {
      return {success: false, error: 'File size exceeds 8MB limit'};
    }
    
    // Create file in Drive
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Permission.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return {
      success: true,
      fileName: file.getName(),
      driveLink: file.getUrl()
    };
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return {success: false, error: error.toString()};
  }
}

// Save application data to Google Sheets
function saveApplication(data) {
  try {
    const sheet = initializeSheet();
    const timestamp = new Date();
    
    const rowData = [
      timestamp,
      data.fullName,
      data.emailId,
      data.contactNo,
      data.role,
      data.about,
      data.resumeFileName || '',
      data.resumeDriveLink || '',
      'New',
      ''
    ];
    
    sheet.appendRow(rowData);
    
    return {success: true};
  } catch (error) {
    console.error('Error saving to sheet:', error);
    return {success: false, error: error.toString()};
  }
}

// Send notification email
function sendNotificationEmail(data) {
  try {
    const subject = `New Application: ${data.role} - ${data.fullName}`;
    const body = `
      New job application received:
      
      Name: ${data.fullName}
      Email: ${data.emailId}
      Phone: ${data.contactNo}
      Position: ${data.role}
      Experience: ${data.about}
      
      ${data.resumeFileName ? `Resume: ${data.resumeDriveLink}` : 'No resume uploaded'}
      
      Timestamp: ${new Date()}
    `;
    
    MailApp.sendEmail({
      to: CONFIG.notificationEmail,
      subject: subject,
      body: body
    });
    
    return {success: true};
  } catch (error) {
    console.error('Error sending email:', error);
    return {success: false, error: error.toString()};
  }
}

// Helper function to get or create folder
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

// Function to handle CORS preflight requests
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({message: 'TekCog Job Application API is running'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to get application statistics (optional)
function getStats() {
  try {
    const sheet = initializeSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return {total: 0, positions: {}};
    }
    
    const applications = data.slice(1); // Skip header
    const stats = {
      total: applications.length,
      positions: {}
    };
    
    applications.forEach(row => {
      const position = row[4]; // Position column
      if (stats.positions[position]) {
        stats
