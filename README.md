# Emmanuel's Professional Portfolio

![Ubuntu Portfolio Screenshot](./public/screenshot.png)

A sophisticated, modern portfolio application inspired by the Ubuntu desktop environment. This portfolio showcases professional achievements, technical expertise, and project work with an intuitive, visually engaging interface.

## 🌐 Live Demo

[Visit the live portfolio](https://ubuntu-portfolio-two.vercel.app/)

## ✨ Key Features

- **Ubuntu-Inspired Design**: Unique desktop-like interface that stands out from traditional portfolios
- **Dark Mode Theme**: Modern, eye-friendly aesthetics with professional color palette
- **Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices
- **Interactive Components**: Dynamic sidebar navigation with multi-tab window system
- **GitHub Integration**: Real-time project fetching from your GitHub repositories
- **Performance Optimized**: Fast loading times and smooth interactions
- **Type-Safe**: Built with TypeScript for robust, maintainable code

## 🏗️ Technology Stack

- **[Next.js 13+](https://nextjs.org/)** – Modern React framework with server-side rendering
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe JavaScript development
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS for responsive design
- **[Redux Toolkit](https://redux-toolkit.js.org/)** – State management solution
- **[Vercel](https://vercel.com/)** – Cloud deployment and hosting

## � Portfolio Sections

- **About**: Professional introduction and overview
- **Experience**: Career history and professional milestones
- **Skills**: Technical competencies and expertise areas
- **Projects**: Curated collection of GitHub repositories
- **Education**: Academic background and certifications
- **Resume**: Professional CV document

## � Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v18.0 or higher)
- **npm** (v9.0 or higher)

### Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Daniel235-web/ubuntu-portfolio.git
   cd ubuntu-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Create a `.env.local` file in the root directory
   - Add your GitHub token for fetching repositories:
     ```
     NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
     ```
   - To generate a GitHub token, visit [GitHub Settings > Developer Settings > Personal access tokens](https://github.com/settings/tokens)

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - The application will auto-refresh on code changes

### Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

The production build will be available in the `.next` directory.

## 🎨 Personalization Guide

### Content Customization

To adapt this portfolio to your own information:

1. **Profile Information** (`data/about-me.ts`):

   - Update personal details and professional summary
   - Modify professional statement and biography

2. **Work Experience** (`data/experience.ts`):

   - Add or edit your career history
   - Include key achievements and responsibilities

3. **Skills** (`data/skills.ts`):

   - List your technical skills and proficiencies
   - Organize by categories or expertise levels

4. **Education** (`data/educations.ts`):

   - Add academic qualifications
   - Include certifications and courses

5. **Visual Assets**:
   - Replace `public/myImage.jpeg` with your professional photo
   - Update `public/about-me/resume/Samuel Emmanuel D Resume.pdf` with your resume
   - Customize wallpapers in `public/images/`

### Styling & Theme

- Modify Tailwind CSS configuration in `tailwind.config.ts`
- Update color scheme in component files
- Adjust responsive breakpoints as needed

## 📁 Project Structure

```
├── app/                          # Next.js app directory
├── components/                   # Reusable React components
│   ├── apps/                    # Application components
│   │   └── about-me/           # Portfolio content sections
│   └── ...                      # Other UI components
├── data/                        # Content data files
├── public/                      # Static assets
│   ├── about-me/               # Resume and documents
│   └── images/                 # Wallpapers and media
├── redux/                       # State management
├── services/                    # API services (GitHub integration)
└── styles/                      # Global styles
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use it for personal or commercial projects.

## 📧 Get in Touch

I'd love to hear from you! Feel free to reach out for collaboration opportunities or inquiries:

- **Portfolio**: [Visit Live Portfolio](https://ubuntu-portfolio-two.vercel.app/)
- **GitHub**: [@Daniel235-web](https://github.com/Daniel235-web)
- **Email**: [emmanuel@example.com](mailto:emmanuel@example.com)

## 🙏 Acknowledgments

- Inspired by the Ubuntu desktop environment
- Built with modern web technologies
- Deployed on Vercel for optimal performance

---

**Made with ❤️ by Emmanuel**
