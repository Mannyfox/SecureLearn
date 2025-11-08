# **App Name**: Apfelkiste SecureLearn

## Core Features:

- Google Workspace SSO: Secure authentication using Google Sign-In with domain restriction (@apfelkiste.ch). User profiles (name, email, department) are stored in Firestore.
- Module Overview: Display security training modules with progress bars and completion status, indicating modules needing retakes.
- Interactive Quiz Interface: Present quiz questions one at a time with immediate feedback and explanations.
- Certificate Generation: Generate and display certificates upon completing all modules, auto-saving results to Firestore and indicating certificate validity.
- Admin Dashboard: Provide an admin interface with statistics, user lists, filtering, export to Excel, and charts showing completion rates.
- Annual Reminder System: Automatically check for expired training and display banners, triggering email reminders for recertification.
- Admin Question Management: Allow admins to add, edit, or remove quiz questions dynamically via the CMS

## Style Guidelines:

- Primary color: Grün (#94aa25) for a professional and trustworthy feel, aligning with corporate colors.
- Secondary color: Dunkelanthrazit (#1c1c1c) for a professional and trustworthy feel, aligning with corporate colors.
- Background color: Hellgrau (#f5f5f5) for a clean and modern look.
- Base color: White (#ffffff) for a clean and modern look.
- Base color: Black (#000000) for a clean and modern look.
- Body and headline font: 'Inter' sans-serif for a modern, readable interface.
- Code font: 'Source Code Pro' for displaying code snippets.
- Use modern, clear icons to represent training modules and actions.
- Subtle animations for transitions and feedback to enhance user experience.