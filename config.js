

const PORTFOLIO_DATA = {
  personal: {
    name: "Janhavi Vaidya",
    title: "Computer Science Engineer",
    subtitle: "Backend Developer | AI/ML Enthusiast | Systems Builder",
    email: "1680.janhavi@gmail.com",
    location: "Nagpur, India",
    resume: "#", // Replace with your resume link
    aboutText: "I'm a final-year CS student who likes building systems from the ground up — payment backends, order matching engines, and ML pipelines. My work spans fintech-style REST APIs, VRP-based logistics optimization, and applied ML, backed by a strong DSA foundation (700+ problems solved). I'm looking to bring that systems-first mindset to a backend or AI/ML engineering team.",
    socials: {
      github: "#", // Replace with your GitHub URL
      linkedin: "#", // Replace with your LinkedIn URL
      leetcode: "#", // Replace with your LeetCode URL
    }
  },

  experience: [
    {
      company: "Visvesvaraya National Institute of Technology, Nagpur",
      role: "Research Intern",
      duration: "Nov 2025 - June 2026",
      points: [
        "Built a VRP-based fleet route optimization backend for 383 milk pour points across 39 dynamically optimized collection routes, processing 89,709 L/day using Google OR-Tools, Haversine distance matrices, and OSRM road-network validation.",
        "Engineered a heuristic optimization pipeline (Nearest Neighbor, 2-Opt, Guided Local Search) with parallel OSRM validation, achieving a 21.9% distance reduction (4536 km → 3543 km) and cutting transport cost from Rs. 2.00/liter to Rs. 1.56/liter.",
        "Ran statistical comparisons across heuristic configurations to identify the best-performing pipeline and presented findings to guide route-planning decisions."
      ],
      tech: ["Python", "Google OR-Tools", "OSRM", "Statistical Analysis"]
    },
    {
      company: "Techwalnut Innovations LLP",
      role: "Machine Learning Intern",
      duration: "Oct 2025 - May 2026",
      points: [
        "Designed a Flutter + Django REST Framework backend for real-time bird sound classification using an EfficientNetB0-based BirdNET model, processing live and uploaded audio recordings.",
        "Engineered a scalable audio analysis workflow with FFmpeg-based conversion, SQLite-backed detection history, and parallel request handling.",
        "Built REST APIs for predictions, statistics, and historical analytics with confidence-based species detection and metadata enrichment."
      ],
      tech: ["Django REST Framework", "TensorFlow", "EfficientNetB0", "FFmpeg", "SQLite"]
    },
    {
      company: "Techwalnut Innovations LLP",
      role: "Full-Stack Development Intern",
      duration: "May 2025 - Jul 2025",
      points: [
        "Developed a Django backend and mobile-first responsive HTML/CSS/JS frontend.",
        "Participated in a full Agile sprint cycle — design, development, code review, testing, and release."
      ],
      tech: ["Django", "HTML5", "CSS3", "JavaScript", "Agile/Scrum"]
    }
  ],

  skills: {
    programming: [
      { name: "Java", icon: "https://img.icons8.com/color/144/000000/java-coffee-cup-logo.png" },
      { name: "Python", icon: "https://img.icons8.com/color/48/null/python--v1.png" },
      { name: "JavaScript", icon: "https://img.icons8.com/color/144/000000/javascript--v1.png" },
      { name: "C", icon: "https://img.icons8.com/color/144/000000/c-programming.png" },
      { name: "SQL", icon: "https://img.icons8.com/ios-filled/100/ffffff/sql.png" }
    ],
    backend: [
      { name: "Spring Boot", icon: "https://img.icons8.com/color/144/000000/spring-logo.png" },
      { name: "Django REST Framework", icon: "https://img.icons8.com/color/144/000000/django.png" },
      { name: "Node.js", icon: "https://img.icons8.com/fluency/144/000000/node-js.png" },
      { name: "Spring Security / JWT", icon: "https://img.icons8.com/color/144/000000/security-checked--v1.png" },
      { name: "Hibernate ORM", icon: "https://img.icons8.com/color/144/000000/database.png" }
    ],
    dataAndML: [
      { name: "Pandas", icon: "https://img.icons8.com/color/144/000000/pandas.png" },
      { name: "NumPy", icon: "https://img.icons8.com/color/144/000000/numpy.png" },
      { name: "Scikit-learn", icon: "https://img.icons8.com/color/144/000000/scikit-learn.png" },
      { name: "TensorFlow", icon: "https://img.icons8.com/color/144/000000/tensorflow.png" },
      { name: "XGBoost", icon: "https://img.icons8.com/color/144/000000/machine-learning.png" }
    ],
    databases: [
      { name: "MySQL", icon: "https://img.icons8.com/color/144/000000/mysql-logo.png" },
      { name: "PostgreSQL", icon: "https://img.icons8.com/color/48/null/postgreesql.png" }
    ],
    devopsAndTools: [
      { name: "Docker", icon: "https://img.icons8.com/color/144/000000/docker.png" },
      { name: "Docker Compose", icon: "https://img.icons8.com/color/144/000000/docker.png" },
      { name: "Microsoft Azure (AZ-900)", icon: "https://img.icons8.com/color/144/000000/azure-1.png" },
      { name: "CI/CD", icon: "https://img.icons8.com/color/144/000000/continuous-integration.png" },
      { name: "Git & GitHub", icon: "https://img.icons8.com/fluency/144/000000/github.png" },
      { name: "Postman", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/96/external-postman-is-the-only-complete-api-development-environment-logo-color-tal-revivo.png" }
    ]
  },

  projects: [
    {
      name: "NexWallet",
      title: "Digital Wallet & Payment Backend",
      description: "A fintech REST API covering the full transaction lifecycle: wallet management, UPI/NEFT/IMPS payment processing, fraud detection, and KYC verification. Implements JWT authentication, Spring Security RBAC, async audit logging, a JUnit 5/Mockito test suite, and Swagger API docs, containerized with Docker.",
      tech: ["Spring Boot 3.2", "Java 21", "MySQL 8.0", "Docker", "JWT", "Spring Security"],
      github: "#",
      live: "#",
      banner: "https://img.icons8.com/fluency/144/000000/wallet.png"
    },
    {
      name: "Order Matching Engine",
      title: "Trading Backend",
      description: "A stock exchange order matching backend implementing Price-Time Priority execution using a dual-heap architecture (max-heap for BUY orders, min-heap for SELL orders). Supports partial and full order fills, trade execution, and full order lifecycle transitions, with RESTful APIs for order placement, tracking, and trade history.",
      tech: ["Java", "Spring Boot", "MySQL", "Spring Data JPA", "REST APIs"],
      github: "#",
      live: "#",
      banner: "https://img.icons8.com/fluency/144/000000/stocks.png"
    },
    {
      name: "F1 Race Winner Prediction Model",
      title: "Race Time Prediction using Telemetry Data",
      description: "A data-driven prediction system for Formula 1 race times using historical telemetry, sector-wise timing, and team performance data. Engineered features from raw race data and trained Linear Regression, Random Forest, and XGBoost models, comparing performance to select the best-fit model.",
      tech: ["Python", "Regression", "Random Forest", "XGBoost"],
      github: "#",
      live: "#",
      banner: "https://img.icons8.com/color/144/000000/racing-flag.png"
    },
    {
      name: "Real Estate Price Prediction Model",
      title: "Neural Network Price Predictor",
      description: "A neural network model built in TensorFlow/Keras to predict real estate prices from historical property data, including preprocessing and feature scaling, evaluated using RMSE and R² score.",
      tech: ["Python", "TensorFlow", "Keras", "Deep Learning"],
      github: "#",
      live: "#",
      banner: "https://img.icons8.com/color/144/000000/home--v1.png"
    }
  ],

  achievements: [
    "Solved 700+ problems across LeetCode, CodeChef, HackerRank, and GFG.",
    "Achieved a 21.9% distance reduction and Rs. 0.44/liter cost saving in a VRP-based dairy logistics optimization project at VNIT.",
    "Holds Microsoft Azure Fundamentals (AZ-900) certification.",
    "Completed Andrew Ng's Machine Learning Specialization (Stanford/DeepLearning.AI)."
  ],

  hobbies: [
    {
      name: "Systems Building",
      icon: "https://img.icons8.com/ios/50/ffffff/code.png",
      description: "Building things like order matching engines and payment backends to understand how real systems work under the hood."
    },
    {
      name: "Competitive Programming",
      icon: "https://img.icons8.com/ios/50/ffffff/learning.png",
      description: "Practicing DSA in Java and solving problems on LeetCode and GFG to stay interview-ready."
    },
    {
      name: "Applied ML",
      icon: "https://img.icons8.com/ios/50/ffffff/artificial-intelligence.png",
      description: "Exploring ML through Andrew Ng's course and applying it to real projects like race-time and price prediction."
    }
  ]
};
