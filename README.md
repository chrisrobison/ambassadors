# Admin Portal with Secure Airtable Proxy

A comprehensive admin portal for managing events and announcements with a secure Node.js proxy server for Airtable API integration.

## 📋 Overview

This project provides a complete solution for organizations to manage and display events and announcements. It consists of a public-facing page for visitors and a secure admin portal for content management. All Airtable API interactions are handled through a secure proxy server to protect API credentials.

![Admin Portal Screenshot](https://via.placeholder.com/800x450?text=Admin+Portal+Screenshot)

## ✨ Features

- **Secure Airtable Integration**: Node.js proxy server keeps API credentials secure
- **Dashboard**: At-a-glance statistics and recent activity tracking
- **Event Management**: Create, edit, and delete events with detailed information
- **Announcement System**: Manage public announcements with draft/published status
- **Responsive Design**: Fully responsive interface works on desktop and mobile
- **Security**: API rate limiting, error handling, and credential protection

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Database**: Airtable
- **Security**: dotenv, express-rate-limit
- **API Communication**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js v14 or higher
- npm (Node Package Manager)
- Airtable account with appropriate base configuration
- Personal Access Token (PAT) for Airtable API access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/admin-portal.git
   cd admin-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Airtable credentials:
   ```
   AIRTABLE_PERSONAL_ACCESS_TOKEN=your_personal_access_token
   AIRTABLE_BASE_ID=your_base_id
   PORT=2415
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Access the application:
   - Public page: `http://localhost:2415/`
   - Admin portal: `http://localhost:2415/portal`

### Airtable Base Structure

This application requires the following Airtable base structure:

**Events Table:**
- Event Name (Text)
- Date and Time (DateTime)
- Description (Long Text)
- Chapter (Link to Chapters table)
- Attendance (Number)
- Group Photo (Attachment)
- All Photos (URL)
- Email List (URL)

**Announcements Table:**
- Title (Text)
- Content (Long Text)
- Status (Single Select: "Draft" or "Published")
- Image (URL)
- Chapters (Link to Chapters table)
- People (Link to People table)

## 🔒 Security Features

- **Credential Protection**: Airtable API credentials stored server-side
- **Rate Limiting**: Prevents API abuse (100 requests per 15 minutes per IP)
- **Error Sanitization**: Prevents exposure of sensitive information in errors
- **CORS Configuration**: Configurable access control for API endpoints

## 🌐 API Endpoints

The proxy server provides these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/:table` | Get all records from a table |
| GET | `/api/:table/:id` | Get a specific record |
| POST | `/api/:table` | Create new record(s) |
| PATCH | `/api/:table` | Update record(s) |
| DELETE | `/api/:table/:id` | Delete a record |

## 🔧 Configuration Options

### Environment Variables

- `AIRTABLE_PERSONAL_ACCESS_TOKEN`: Your Airtable Personal Access Token
- `AIRTABLE_BASE_ID`: Your Airtable Base ID
- `PORT`: Server port (default: 2415)
- `NODE_ENV`: Set to "production" for production mode

### Customizing the UI

The admin portal UI can be customized by modifying CSS variables:

```css
:root {
    --primary-yellow: #ffdd00;
    --dark-text: #1a1a1a;
    /* other variables */
}
```

## 🚢 Deployment

### For Production

1. Set up your server environment (Node.js v14+)
2. Clone the repository
3. Install dependencies: `npm install --production`
4. Set up environment variables securely
5. Start with a process manager: `pm2 start server.js --name admin-portal`
6. Configure a reverse proxy (Nginx/Apache) with HTTPS

### Security Recommendations

1. Always use HTTPS in production
2. Implement authentication for the admin portal
3. Restrict CORS to your specific domains
4. Regularly update dependencies
5. Set up proper logging

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [Airtable](https://airtable.com/) for the flexible database
- [Express](https://expressjs.com/) for the server framework
- [Axios](https://axios-http.com/) for HTTP requests
