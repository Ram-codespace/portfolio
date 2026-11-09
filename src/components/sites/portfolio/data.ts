export interface DeveloperInfo {
  name: string;
  wordmark: string;
  role: {
    bold: string;
    light: string;
  };
  email: string;
  phone: string;
  location: string;
  url: string;
  whatsapp: string;
  socials: {
    github: string;
    linkedin: string;
  };
}

export const developer: DeveloperInfo = {
  name: "Raman",
  wordmark: "RAMAN",
  role: {
    bold: "Java Full Stack",
    light: "Developer",
  },
  email: "ramaniyappan08@gmail.com",
  phone: "+91 9159239526",
  location: "Chennai, Tamil Nadu, India",
  url: "https://github.com/Ram-codespace",
  whatsapp: "919159239526",
  socials: {
    github: "https://github.com/Ram-codespace",
    linkedin: "https://www.linkedin.com/in/raman-i-909111401/",
  },
};

export const introWords = [
  { text: "Hey," },
  { text: "I'm" },
  {
    text: "Raman.",
    className:
      "font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400",
  },
  { text: "A" },
  { text: "Java" },
  { text: "Full" },
  { text: "Stack" },
  { text: "Developer", className: "text-white font-medium" },
  { text: "with" },
  { text: "a" },
  { text: "B.Sc." },
  { text: "in" },
  { text: "Computer" },
  { text: "Science" },
  { text: "and" },
  { text: "hands-on" },
  { text: "experience" },
  { text: "building" },
  { text: "end-to-end" },
  { text: "web" },
  { text: "applications." },
  { text: "I" },
  { text: "work" },
  { text: "across" },
  { text: "the" },
  { text: "full" },
  { text: "web" },
  { text: "architecture" },
  { text: "—" },
  { text: "designing" },
  { text: "RESTful" },
  { text: "APIs" },
  { text: "and" },
  { text: "relational" },
  { text: "databases" },
  { text: "with" },
  { text: "Java,", className: "text-white font-medium" },
  { text: "Spring Boot,", className: "text-white font-medium" },
  { text: "Spring Security,", className: "text-white font-medium" },
  { text: "and" },
  { text: "MySQL,", className: "text-white font-medium" },
  { text: "while" },
  { text: "building" },
  { text: "responsive," },
  { text: "user-friendly" },
  { text: "interfaces" },
  { text: "with" },
  { text: "React.js,", className: "text-white font-medium" },
  { text: "JavaScript (ES6+),", className: "text-white font-medium" },
  { text: "HTML5," },
  { text: "and" },
  { text: "CSS3." },
  { text: "From" },
  { text: "data" },
  { text: "modeling" },
  { text: "with" },
  { text: "Spring Data JPA & Hibernate", className: "text-white font-medium" },
  { text: "to" },
  { text: "version" },
  { text: "control" },
  { text: "and" },
  { text: "builds" },
  { text: "with" },
  { text: "Git," },
  { text: "GitHub," },
  { text: "Maven," },
  { text: "and" },
  { text: "Docker,", className: "text-white font-medium" },
  { text: "I" },
  { text: "bring" },
  { text: "strong" },
  { text: "problem-solving" },
  { text: "skills," },
  { text: "clear" },
  { text: "communication," },
  { text: "and" },
  { text: "attention" },
  { text: "to" },
  { text: "detail" },
  { text: "to" },
  { text: "every" },
  { text: "project." },
];

export const stackCategories = [
  {
    label: "Backend",
    items: [
      "Java (Core & OOP)",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "JDBC",
      "PHP",
      "MVC Architecture",
    ],
    copies: 2,
    duration: 52,
    reverse: false,
  },
  {
    label: "Frontend & UI",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Responsive Web Design",
    ],
    copies: 4,
    duration: 44,
    reverse: true,
  },
  {
    label: "Database",
    items: [
      "MySQL",
      "SQL",
      "CRUD Operations",
      "Database Design & Management",
      "Oracle (Basics)",
    ],
    copies: 3,
    duration: 58,
    reverse: false,
  },
  {
    label: "Tools & Build",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Maven",
      "Docker",
      "Python",
      "IntelliJ IDEA",
      "Eclipse",
      "VS Code",
    ],
    copies: 2,
    duration: 48,
    reverse: true,
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#project" },
  { label: "Services", href: "#service" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
];

export const services = [
  {
    id: "01",
    title: "JAVA FULL STACK WEB DEVELOPMENT",
    description:
      "I build end-to-end web applications, from the database to the browser: business logic in Java and Spring Boot, persistence in MySQL, and responsive interfaces with React.js, HTML5, CSS3, and JavaScript (ES6+).",
    capabilities: [
      "Full web architecture with Java and Spring Boot",
      "Responsive, user-friendly interfaces with React.js, HTML5, and CSS3",
      "Relational database design in MySQL with JPA/Hibernate",
      "Role-based access control with Spring Security",
      "MVC architecture and input validation",
    ],
    buttonText: "VIEW PROJECTS",
  },
  {
    id: "02",
    title: "RESTFUL API & BACKEND SERVICES",
    description:
      "I design and build RESTful back-end APIs with Spring Boot, with CRUD operations across 15+ endpoints in my training projects.",
    capabilities: [
      "Spring Boot REST APIs and CRUD operations",
      "Spring Security and endpoint authorization",
      "Exception handling and input validation",
      "API testing with Postman",
      "JDBC and Spring Data repositories",
    ],
  },
  {
    id: "03",
    title: "DATABASE DESIGN & PERSISTENCE",
    description:
      "I design and manage MySQL databases, including 8+ relational tables in my training projects, and map them to Java entities with Spring Data JPA and Hibernate.",
    capabilities: [
      "Relational schema design",
      "Spring Data JPA and Hibernate entity mapping",
      "SQL and CRUD operations",
      "Database design and management",
      "Oracle (basics)",
    ],
  },
  {
    id: "04",
    title: "FRONTEND & RESPONSIVE UI",
    description:
      "I build responsive, user-friendly interfaces following modern web design practices, using React.js, HTML5, CSS3, and modern JavaScript.",
    capabilities: [
      "React.js components",
      "JavaScript (ES6+)",
      "HTML5 and CSS3",
      "Responsive web design",
      "Integrating front ends with REST APIs",
    ],
  },
  {
    id: "05",
    title: "VERSION CONTROL, BUILD & AGILE WORKFLOW",
    description:
      "I work with Git, GitHub, Maven, and Docker, and follow Agile and SDLC practices when collaborating with a team.",
    capabilities: [
      "Git and GitHub version control",
      "Maven build and dependency management",
      "Docker",
      "Postman for REST API testing",
      "Agile practices and SDLC",
    ],
  },
];

export interface Project {
  name: string;
  prefix: string;
  serif: string;
  suffix: string;
  description: string;
  image?: string;
  badge?: string;
  live: string;
  liveLabel: string;
  repo: string;
}

export const projects: Project[] = [
  {
    name: "MedBook — Hospital Appointment Scheduling System",
    prefix: "MEDBOOK ",
    serif: "hospital",
    suffix: "SCHEDULING SYSTEM",
    description:
      "A full stack web application built with Java, Spring Boot, MySQL, and React, with separate back-end and front-end modules supporting 3 user roles (patient, doctor, admin). It exposes 12+ RESTful APIs, models 7 relational entities with Spring Data JPA/Hibernate, and uses Spring Security for role-based access control across all API routes.",
    image: "/portfolio/projects/medbook.webp",
    live: "https://github.com/Ram-codespace",
    liveLabel: "View on GitHub",
    repo: "https://github.com/Ram-codespace",
  },
  {
    name: "Bank Management System",
    prefix: "BANK ",
    serif: "banking",
    suffix: "MANAGEMENT SYSTEM",
    description:
      "A banking web application built with Java, Spring Boot, and MySQL, supporting account management, deposits, withdrawals, and fund transfers for up to 4 account types. It provides REST APIs for 10+ account and transaction operations over 5 MySQL tables, using MVC architecture and input validation for cases like insufficient balance and invalid transfers.",
    image: "/portfolio/projects/bank.webp",
    live: "https://github.com/Ram-codespace/Banking-Management-System",
    liveLabel: "View on GitHub",
    repo: "https://github.com/Ram-codespace/Banking-Management-System",
  },
  {
    name: "High-Throughput URL Shortener & Analytics",
    prefix: "HIGH-THROUGHPUT ",
    serif: "url",
    suffix: "SHORTENER & ANALYTICS",
    description:
      "A URL shortener with link analytics, designed to handle a high volume of redirects and clicks.",
    image: "/portfolio/projects/url-shortener.webp",
    live: "https://github.com/Ram-codespace/url-short",
    liveLabel: "View on GitHub",
    repo: "https://github.com/Ram-codespace/url-short",
  },
  {
    name: "Real-Time Interactive Quiz Engine",
    prefix: "REAL-TIME ",
    serif: "interactive",
    suffix: "QUIZ ENGINE",
    description:
      "An interactive quiz engine with real-time quizzes that give instant feedback and scoring, a live leaderboard, detailed analytics, and a responsive design for any device. Built with Java, Spring Boot, MySQL, React, and Tailwind CSS.",
    image: "/portfolio/projects/quiz-engine.webp",
    live: "https://github.com/Ram-codespace/quiz-engine",
    liveLabel: "View on GitHub",
    repo: "https://github.com/Ram-codespace/quiz-engine",
  },
];

export const resumeFile = {
  href: "/Raman_Resume.pdf",
  downloadName: "Raman_Resume.pdf",
};

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Python", "JavaScript (ES6+)", "PHP", "SQL", "HTML5", "CSS3"],
  },
  {
    label: "Back End",
    items: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "JDBC",
      "REST APIs",
    ],
  },
  {
    label: "Front End",
    items: ["React.js", "HTML5", "CSS3", "Responsive Web Design"],
  },
  {
    label: "Database",
    items: [
      "MySQL",
      "Oracle (Basics)",
      "SQL",
      "CRUD Operations",
      "Database Design & Management",
    ],
  },
  {
    label: "Architecture",
    items: [
      "MVC",
      "REST Architecture",
      "Web Architecture",
      "Object-Oriented Programming",
    ],
  },
  {
    label: "Tools & Build",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Maven",
      "Docker",
      "IntelliJ IDEA",
      "Eclipse",
      "VS Code",
    ],
  },
];

export const timeline = [
  {
    type: "Experience",
    role: "Java Full Stack Developer — Professional Training Program",
    organization: "Training Program",
    period: "Nov 2025 – Jul 2026",
    location: "Chennai, Tamil Nadu",
    highlight:
      "6+ hands-on projects · 15+ REST endpoints · 8+ MySQL tables",
    details: [
      "Built Java applications using Core Java, OOP, Collections, Exception Handling, and JDBC across 6+ hands-on projects during the training program.",
      "Engineered RESTful back-end APIs with Spring Boot, implementing CRUD operations across 15+ endpoints for full stack web applications.",
      "Designed and managed MySQL databases with 8+ relational tables, applying strong database management and organizational skills to keep schema design consistent across projects.",
      "Created responsive web interfaces and user interfaces using HTML5, CSS3, and JavaScript (ES6+), following modern web design practices.",
      "Applied MVC architecture and SDLC practices consistently across 3 full stack projects, using strong problem-solving skills to debug and resolve integration issues.",
      "Collaborated using Git, GitHub, and Postman for version control and REST API testing, maintaining zero merge conflicts through clear verbal communication with teammates.",
    ],
    tags: [
      "Core Java",
      "OOP",
      "Collections",
      "JDBC",
      "Spring Boot",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "MVC",
      "SDLC",
      "Git",
      "GitHub",
      "Postman",
    ],
  },
  {
    type: "Education",
    role: "Bachelor of Science (B.Sc.) in Computer Science",
    organization: "St. Joseph’s College of Arts and Science",
    period: "2022 – 2025",
    location: "",
    highlight: "",
    details: [],
    tags: [],
  },
];

export const certifications = [
  {
    title: "Java Full Stack Developer",
    issuer: "Techpanda, via Trainer Central by Zoho",
    detail: "Professional IT Training Program in Java Full Stack",
    year: "",
  },
  {
    title: "Data Science and Data Analytics using Python",
    issuer: "PG & Research Department of Computer Science & Artificial Intelligence",
    detail: "",
    year: "2024 – 2025",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    detail: "Completion Certificate",
    year: "2026",
  },
];
