# Secure Proxy Server Implementation Guide

This guide explains how to set up and use the Node.js proxy server to securely handle Airtable API requests without exposing credentials to the client.

## Project Structure

```
/admin-portal-proxy/
├── server.js              # Main server file
├── .env                   # Environment variables (keep this secure!)
├── package.json           # Node.js dependencies
├── public/                # Static files directory
│   ├── index.html         # Public-facing page
│   ├── portal.html        # Admin interface
│   └── css/               # (optional) CSS files if extracted from HTML
```

## Prerequisites

- Node.js v14 or higher
- npm (Node Package Manager)
- Airtable account with appropriate base configuration
- Personal Access Token (PAT) for Airtable API access

## Setup Instructions

### 1. Install Node.js and npm

If you don't have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

### 2. Create Project Directory and Files

Create a new directory for your project and copy the provided files:
- `server.js` - The main server file
- `.env` - Environment variables file
- `package.json` - Node.js package configuration

### 3. Install Dependencies

```bash
cd admin-portal-proxy
npm install
```

### 4. Configure Environment Variables

Edit the `.env` file with your Airtable credentials:

```
AIRTABLE_PERSONAL_ACCESS_TOKEN=your_personal_access_token
AIRTABLE_BASE_ID=your_base_id
PORT=2415
```

### 5. Set Up Static Files

Create a `public` directory in your project folder and place the HTML files there:

```bash
mkdir -p public
# Copy your HTML files to the public directory
cp path/to/your/portal.html public/
cp path/to/your/index.html public/
```

### 6. Update Client-Side API Calls

Modify your client-side JavaScript files to use the proxy endpoints instead of direct Airtable API calls. Use the provided `client-side-api.js` code as a reference. 

Key changes include:
- Change the API base URL to point to your proxy
- Remove all Airtable credentials from client-side code
- Update the API call patterns to match the proxy endpoints

### 7. Start the Server

```bash
npm start
```

Your server should now be running on port 2415 (or the port specified in your .env file).

## Proxy Endpoints

The proxy server provides the following endpoints that mirror the Airtable API:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/:table` | Get all records from a table |
| GET | `/api/:table/:id` | Get a specific record |
| POST | `/api/:table` | Create new record(s) |
| PATCH | `/api/:table` | Update record(s) |
| DELETE | `/api/:table/:id` | Delete a record |

## Security Features

This implementation includes several security enhancements:

1. **API Credential Protection**: Airtable credentials are stored server-side in the .env file and never sent to the client.

2. **Rate Limiting**: Prevents API abuse by limiting requests to 100 per IP address per 15-minute window.

3. **Error Handling**: Provides sanitized error responses that don't leak sensitive information.

4. **CORS**: Cross-Origin Resource Sharing is enabled for development but can be restricted in production.

## Production Deployment Considerations

For a production environment, consider these additional steps:

1. **Secure HTTPS**: Use HTTPS by deploying behind a reverse proxy like Nginx with SSL certificates.

2. **Environment Variables**: Use a secure method to manage environment variables on your production server.

3. **Process Management**: Use a process manager like PM2 to keep the server running:
   ```bash
   npm install -g pm2
   pm2 start server.js --name admin-portal
   ```

4. **CORS Configuration**: Restrict CORS to your specific domains:
   ```javascript
   // Modify the CORS configuration in server.js
   app.use(cors({
     origin: ['https://yourdomain.com', 'https://admin.yourdomain.com'],
     methods: ['GET', 'POST', 'PATCH', 'DELETE'],
     credentials: true
   }));
   ```

5. **Add Authentication**: This implementation doesn't include user authentication. Consider adding:
   - JWT-based authentication
   - OAuth integration
   - Session-based authentication

## Common Issues and Solutions

### "Cannot connect to server" error

- Check that the Node.js server is running
- Verify the port is not blocked by a firewall
- Ensure your client is using the correct URL for API calls

### "API rate limit exceeded" error

- The server limits requests to prevent abuse
- Implement request batching on the client-side to reduce API calls
- Adjust the rate limiter configuration for higher traffic needs

### Database connection errors

- Verify your Airtable credentials in the .env file
- Check that your Airtable base is accessible
- Confirm your Personal Access Token has the correct permissions

## Maintenance and Updates

### Updating Airtable Token

If your Airtable token expires or needs to be changed:

1. Update the `AIRTABLE_PERSONAL_ACCESS_TOKEN` in your .env file
2. Restart the Node.js server

### Adding New Tables or Fields

If you add new tables or fields to your Airtable base:

1. No server changes are needed - the proxy dynamically handles any table structure
2. Update your client-side code to work with the new tables/fields

### Updating Dependencies

Periodically update dependencies to get security fixes:

```bash
npm audit
npm update
```

## Conclusion

This proxy server implementation provides a secure way to access your Airtable data without exposing credentials in client-side code. It creates a clean API that can be easily consumed by your frontend application while adding important security features like rate limiting and proper error handling.
