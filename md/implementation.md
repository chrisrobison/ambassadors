# Admin Portal Implementation Guide

This document provides detailed instructions for deploying the Admin Portal application to a new server environment. The portal integrates event management and announcement features with a centralized dashboard.

## Application Overview

The Admin Portal consists of the following files:
- `index.html` - Public-facing page for viewing events
- `portal.html` - Main admin interface with integrated dashboard, events, and announcements management
- `announcements-admin.html` - Standalone announcements management page (optional after integration)
- `events-admin.html` - Standalone events management page (optional after integration)

## Prerequisites

- Web server with HTML, CSS, and JavaScript support (Apache, Nginx, etc.)
- Airtable account with appropriate base configuration
- Personal Access Token (PAT) for Airtable API access

## Server Requirements

- Any static web server capable of serving HTML/CSS/JS files
- No server-side processing required (all API calls are client-side)
- HTTPS recommended for production environments due to API token usage

## Installation Steps

1. **Prepare the Directory Structure**
   ```
   /admin-portal/
   ├── index.html
   ├── portal.html
   └── assets/
       ├── img/
       │   ├── logo.svg
       │   └── ambassador-bg.jpg
       └── css/ (optional - styles are currently embedded)
   ```

2. **Update API Configuration**
   
   Locate and update the following configuration variables in each file:
   
   ```javascript
   const AIRTABLE_PERSONAL_ACCESS_TOKEN = 'your_personal_access_token';
   const AIRTABLE_BASE_ID = 'your_base_id';
   const AIRTABLE_EVENTS_TABLE = 'Events'; // Update if your table name differs
   const AIRTABLE_ANNOUNCEMENTS_TABLE = 'Announcements'; // Update if your table name differs
   ```

3. **Verify Airtable Base Structure**
   
   Ensure your Airtable base has the correct tables and fields:
   
   **Events Table:**
   - Event Name (Text)
   - Date and Time (DateTime)
   - Description (Long Text)
   - Chapter (Link to Chapters table)
   - Attendance (Number)
   - Review Period (Link to Review Periods table)
   - Group Photo (Attachment)
   - All Photos (URL)
   - Email List (URL)

   **Announcements Table:**
   - Title (Text)
   - Content (Long Text)
   - Status (Single Select: "Draft" or "Published")
   - Image (URL or Attachment)
   - Chapters (Link to Chapters table)
   - People (Link to People table)

4. **Deploy to Web Server**
   
   Upload all files to your web server's appropriate directory.

5. **Test the Installation**
   
   Access the portal through your browser:
   - Admin interface: `https://your-domain.com/admin-portal/portal.html`
   - Public-facing page: `https://your-domain.com/admin-portal/index.html`

## Common Issues and Solutions

### API Authentication

**Issue**: Airtable API calls failing with 401 Unauthorized errors.

**Solution**: 
- Verify your Personal Access Token is correctly copied and has proper permissions.
- Check that the token hasn't expired (Airtable PATs have configurable expiration).
- Ensure the token has access to the specific base you're trying to access.

### CORS Restrictions

**Issue**: API calls blocked by Cross-Origin Resource Sharing policies.

**Solution**:
- Airtable API should allow CORS by default for authenticated requests.
- If hosting the application on a different domain than where API calls are made, ensure your server allows proper CORS headers.
- For local development, consider using a CORS proxy or browser extension to bypass restrictions.

### Table Structure Mismatch

**Issue**: Data not displaying correctly or errors when saving records.

**Solution**:
- Compare your Airtable base structure with the required fields listed above.
- Check field names for exact matches (case-sensitive).
- If using different field names, update the JavaScript to match your structure.

### Image Loading Issues

**Issue**: Images not displaying in the interface.

**Solution**:
- Check that image URLs are accessible and valid.
- For Airtable attachments, ensure you're using the thumbnail URLs for preview.
- If using relative paths for application images (like logo.svg), verify the path structure.

## Customization Options

### Theming

To customize the appearance:

1. Locate the `:root` CSS variables at the top of each HTML file:
   ```css
   :root {
       --primary-yellow: #ffdd00;
       --dark-text: #1a1a1a;
       /* other variables */
   }
   ```

2. Modify these variables to match your organization's branding.

### Adding New Features

The code is structured to allow easy expansion:

1. **New Dashboard Widgets**: Add new cards to the dashboard-widgets section in portal.html
2. **Additional Form Fields**: Extend the modal forms and update the corresponding JavaScript handlers
3. **New Pages**: Follow the pattern of the existing pages to add new content sections

## Security Considerations

1. **API Token Protection**: The current implementation exposes the Airtable token in client-side code. Consider:
   - Using environment variables and a simple backend for API calls in production
   - Implementing token-based authentication for the admin portal
   - Setting restrictive CORS policies on your server

2. **Access Control**: This implementation doesn't include user authentication. Consider adding:
   - Login functionality before accessing admin features
   - Role-based permissions for different admin functions

## Limitations and Known Issues

1. **File Uploads**: The current implementation doesn't support direct file uploads. It only handles URLs to images that are already uploaded elsewhere.

2. **Mock Data**: Development mock data is included as fallbacks. Make sure to properly connect to your Airtable instance by uncommenting the API calls and removing mock data references.

3. **Mobile Responsiveness**: While the interface is responsive, complex forms like the Event editor may benefit from further optimization for very small screens.

4. **Browser Compatibility**: The application uses modern JavaScript features and may require adjustments for older browsers.

## Maintenance

For ongoing maintenance:

1. **Airtable Schema Changes**: If you modify your Airtable structure, update the corresponding JavaScript object mappings.

2. **Token Renewal**: Remember to update the Personal Access Token before it expires.

3. **Backup**: Regularly export your Airtable base to prevent data loss.

## Support

For issues with:
- **Airtable API**: Refer to [Airtable API documentation](https://airtable.com/developers/web/api)
- **Application Code**: Debug using browser developer tools - all API calls log errors to the console

## Future Enhancements

Consider these improvements for future versions:
- Server-side API proxy to protect Airtable credentials
- User authentication and access control
- Direct file upload functionality
- Expanded dashboard analytics
- Email notifications for new events or announcements
