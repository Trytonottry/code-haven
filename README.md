# Code Haven - Comprehensive Git Hosting Solution

## Table of Contents
1. [About The Project](#about-the-project)
2. [Project Structure](#project-structure)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [Roadmap](#roadmap)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)
9. [Acknowledgments](#acknowledgments)

## About The Project

Code Haven is a comprehensive Git hosting solution designed for the Russian and CIS markets. It includes a web platform, a mobile application, and a set of tools for managing Git repositories. The project aims to provide a seamless and secure experience for developers and organizations to manage their codebases.

### Features
- **Web Platform**: Full-featured Git hosting with repositories, pull requests, issues, and wiki.
- **Mobile Application**: Manage your repositories on the go with our Flutter-based mobile app.
- **CI/CD Integration**: Automated workflows and integration with cloud services.
- **AI Code Review**: Enhanced code review using Yandex GPT.
- **Security**: Robust security features, including encryption and compliance with local regulations.

### Built With
- **Backend**: Node.js, Express, PostgreSQL, Prisma
- **Frontend**: Next.js, React
- **Mobile App**: Flutter, Dart
- **CI/CD**: Custom runners, integration with cloud services (Selectel, Yandex Cloud)
- **AI**: Yandex GPT for code review

## Project Structure

The project is divided into several main components:

### Web Platform
- **Backend**: API server, database management, authentication, and security.
- **Frontend**: User interface for managing repositories, pull requests, issues, and wiki.

### Mobile Application
- **Flutter App**: Mobile application for managing repositories on the go.

### CI/CD
- **Runners**: Custom CI/CD runners for automated workflows.
- **Cloud Integration**: Integration with cloud services for scalable CI/CD pipelines.

### Security
- **Encryption**: Data encryption for secure storage and transmission.
- **Compliance**: Compliance with local regulations and standards (e.g., ФСТЭК).

## Getting Started

### Prerequisites
- **Node.js**: For backend development.
- **Flutter SDK**: For mobile app development.
- **Docker**: For containerization and deployment.
- **PostgreSQL**: For database management.

### Installation

#### Backend
1. Clone the repository:
```bash
git clone https://github.com/yourusername/gitapp.git
```

2. Navigate to the backend directory:
```bash
cd gitapp/backend
```

3. Install dependencies:
```bash
npm install
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
```

5. Start the backend server:
```bash
npm run dev
```

#### Frontend

1. Navigate to the frontend directory:
```bash
cd gitapp/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

## Mobile App

1. Navigate to the mobile app directory:
```bash
cd gitapp/mobile
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the mobile app:
```bash
flutter run
```

4. Deployment
Build Docker images:
```bash
docker compose build
```

5. Start the services:
```bash
docker compose up
```

### Usage
## Web Platform

    Repositories: Create, view, and manage repositories.
    Pull Requests: Create, view, and manage pull requests.
    Issues: Create, view, and manage issues.
    Wiki: Create and edit wiki pages.

## Mobile Application

    Repositories: View and manage repositories.
    Pull Requests: View and manage pull requests.
    Issues: View and manage issues.
    Wiki: View wiki pages.

### Roadmap
Short-term Goals

    Beta Testing: Launch beta testing for the web platform and mobile app.
    CI/CD Integration: Implement CI/CD pipelines with cloud services.
    AI Code Review: Integrate Yandex GPT for enhanced code review.

### Long-term Goals

    Feature Expansion: Add more features like project management, team collaboration, and analytics.
    Market Expansion: Expand to other markets and integrate with more cloud services.
    Security Enhancements: Continuously improve security features and compliance.

### Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

### License
This project is licensed under the Creative Commons Attribution 4.0 International License. See the LICENSE file for details.

### Contact

    Project Link: https://github.com/Trytonottry/code-haven
    Email: try2nottry.developer@gmail.com

## Acknowledgments

    Flutter: For the mobile app development framework.
    Node.js: For the backend development.
    PostgreSQL: For the database management.
    Prisma: For the ORM.
    Yandex GPT: For AI code review.
    Docker: For containerization and deployment.
    Selectel: For cloud services integration.
    Yandex Cloud: For cloud services integration.

Thank you for your interest in GitApp. We hope you find it useful and enjoyable to use!

Shield: [![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg
