import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  raspberrypi,
  esp32,
  threejs,
  ecommerce,
  ecommerceImg,
  socialMediaImg,
  electricityPortalImg,
  weatherDashboardImg,
  todoAppImg,
  gameSalesBiImg,
  trainFaultIotImg,
  healthMonitorIotImg,
  signLanguageAiImg,
  smartWasteIotImg,
  vehicleHealthIotImg,
  livestockIotImg,
  iotSensorDashImg,
  bookmysaloonImg,
  geethavarnamImg,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "IoT and Embedded Systems Developer",
    icon: creator,
  },
  {
    title: "Data Scientist",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "Raspberry Pi",
    icon: raspberrypi,
  },
  {
    name: "ESP32",
    icon: esp32,
  },
];

const experiences = [
  {
    title: "Full Stack Web Developer",
    company_name: "Frontend & Full Stack Systems",
    icon: web,
    iconBg: "#383E56",
    date: "Web Applications",
    points: [
      "Engineered responsive and dynamic web interfaces using React, Tailwind CSS, and modular component architectures.",
      "Implemented global state management with Redux Toolkit to maintain seamless client-side state across views.",
      "Built interactive search, multi-criteria filtering, and booking flows with optimized rendering performance.",
      "Delivered responsive web applications with smooth Framer Motion animations and high Core Web Vitals scores.",
    ],
  },
  {
    title: "Mobile App Developer",
    company_name: "Cross-Platform & Mobile UI",
    icon: mobile,
    iconBg: "#1d1836",
    date: "Mobile Experiences",
    points: [
      "Designed mobile-first responsive layouts and cross-platform UI components for iOS and Android form factors.",
      "Structured reusable navigation stacks, touch-friendly touchpoints, and intuitive gesture workflows.",
      "Optimized viewport scaling, compact screen density, and fluid breakpoint transitions across diverse devices.",
      "Translated complex web flows into native-feeling, tactile mobile application interfaces.",
    ],
  },
  {
    title: "Backend & API Architect",
    company_name: "Server Systems & Databases",
    icon: backend,
    iconBg: "#383E56",
    date: "Backend Infrastructure",
    points: [
      "Architected robust RESTful APIs, routing layers, and microservice endpoints with Node.js and Express.",
      "Designed and modeled document databases in MongoDB and relational databases for high-concurrency queries.",
      "Implemented secure authentication, token management, error handling middleware, and request validation.",
      "Structured resilient backend services ensuring seamless data synchronization with client applications.",
    ],
  },
  {
    title: "IoT & Embedded Systems Engineer",
    company_name: "Hardware & Edge Computing",
    icon: creator,
    iconBg: "#1d1836",
    date: "Hardware & Physical Systems",
    points: [
      "Built IoT edge computing pipelines with Raspberry Pi for hardware-interfaced data processing and local control.",
      "Developed real-time firmware and wireless sensor telemetry on ESP32 microcontrollers using C++/Python.",
      "Interfaced GPIO peripherals, digital sensors, and communication protocols (MQTT, HTTP, WebSockets).",
      "Created hardware-to-cloud monitoring bridges for real-time telemetry and remote device interaction.",
    ],
  },
  {
    title: "Data & Systems Specialist",
    company_name: "Data Intelligence & Analytics",
    icon: creator,
    iconBg: "#383E56",
    date: "Analytics & Intelligence",
    points: [
      "Developed structured data pipelines to process, analyze, and visualize complex datasets efficiently.",
      "Implemented search and recommendation algorithms to power dynamic user interfaces and decision support.",
      "Applied data modeling and statistical methods to optimize system performance and feature relevance.",
      "Transformed high-volume data streams into clear, actionable visual reports and dashboard insights.",
    ],
  },
];

const testimonials = [];

const projects = [
  // WEB DEVELOPMENT
  {
    name: "E-Commerce Web Application",
    category: "web",
    description:
      "Built a responsive e-commerce platform with product listings, dynamic category filtering, cart management, and interactive UI components.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "redux", color: "purple-text-gradient" },
      { name: "tailwindcss", color: "emerald-text-gradient" },
      { name: "restapi", color: "pink-text-gradient" },
    ],
    image: ecommerceImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam/E-Commerce",
    live_link: "https://s-k-sriraam.github.io/E-Commerce/",
  },
  {
    name: "BookMySaloon",
    category: "web",
    description:
      "An on-demand salon & spa appointment booking platform featuring stylist selection, curated service catalogs, interactive calendar time-slot pickers, and automated scheduling.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "purple-text-gradient" },
      { name: "nodejs", color: "emerald-text-gradient" },
      { name: "booking-ui", color: "gold-text-gradient" },
    ],
    image: bookmysaloonImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Geethavarnam",
    category: "web",
    description:
      "An exclusive online boutique and e-commerce platform for silk sarees, bridal chudidhars, and ethnic collections with fabric & color filters, curated catalogs, and cart checkout.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "ecommerce", color: "gold-text-gradient" },
      { name: "boutique-ui", color: "purple-text-gradient" },
      { name: "tailwind", color: "emerald-text-gradient" },
    ],
    image: geethavarnamImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
    live_link: "https://saree-retail.vercel.app/",
  },
  {
    name: "Social Media Web Application",
    category: "web",
    description:
      "Designed and developed a modern social media style frontend interface with responsive feed layouts, stories carousel, post interactions, and profile views.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "javascript", color: "gold-text-gradient" },
      { name: "css3", color: "emerald-text-gradient" },
      { name: "responsive", color: "pink-text-gradient" },
    ],
    image: socialMediaImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam/social-media-",
    live_link: "https://s-k-sriraam.github.io/social-media-/",
  },
  {
    name: "Electricity Board Connection WebApp",
    category: "web",
    description:
      "Developed an online workflow management system for utility service applications, secure document uploads, and automated approval status tracking.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "express", color: "purple-text-gradient" },
      { name: "workflow", color: "gold-text-gradient" },
    ],
    image: electricityPortalImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "React Weather Dashboard",
    category: "web",
    description:
      "Created a dynamic weather forecast dashboard using React.js and OpenWeather API integration with real-time temperature trends and responsive UI updates.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "openweather", color: "emerald-text-gradient" },
      { name: "chartjs", color: "purple-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: weatherDashboardImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "To-Do List Application",
    category: "web",
    description:
      "Built a lightweight task management application with persistent local storage, interactive task status filtering, priority tags, and efficient DOM manipulation.",
    tags: [
      { name: "javascript", color: "gold-text-gradient" },
      { name: "localstorage", color: "purple-text-gradient" },
      { name: "html5", color: "orange-text-gradient" },
      { name: "css-grid", color: "blue-text-gradient" },
    ],
    image: todoAppImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },

  // IOT & HARDWARE SYSTEMS
  {
    name: "Train Fault Signal Detection System",
    category: "iot",
    description:
      "Raspberry Pi–based railway safety alerting system utilizing GPS tracking, GSM communication, and ultrasonic sensors to detect rail cracks in real-time.",
    tags: [
      { name: "raspberry-pi", color: "pink-text-gradient" },
      { name: "python", color: "blue-text-gradient" },
      { name: "gps-gsm", color: "green-text-gradient" },
      { name: "sensors", color: "gold-text-gradient" },
    ],
    image: trainFaultIotImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Health Monitoring System (ESP8266)",
    category: "iot",
    description:
      "Cloud-connected patient vitals monitoring system using MAX30102 pulse oximeter, temperature, and humidity sensors for continuous remote telemetry.",
    tags: [
      { name: "esp8266", color: "purple-text-gradient" },
      { name: "max30102", color: "pink-text-gradient" },
      { name: "iot-cloud", color: "blue-text-gradient" },
      { name: "embedded-cpp", color: "emerald-text-gradient" },
    ],
    image: healthMonitorIotImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Sign Language to Text Converter",
    category: "ai",
    description:
      "AI-driven gesture recognition platform converting American Sign Language into real-time text and speech output via camera feed and neural landmarks.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "opencv", color: "green-text-gradient" },
      { name: "mediapipe", color: "gold-text-gradient" },
      { name: "ai-vision", color: "purple-text-gradient" },
    ],
    image: signLanguageAiImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Smart Waste Bin With Alerts",
    category: "iot",
    description:
      "Automated municipal waste-level notifier with ultrasonic depth sensing and GSM alerting to optimize city sanitation and waste collection routes.",
    tags: [
      { name: "iot", color: "emerald-text-gradient" },
      { name: "ultrasonic", color: "blue-text-gradient" },
      { name: "gsm-alerts", color: "gold-text-gradient" },
      { name: "smart-city", color: "purple-text-gradient" },
    ],
    image: smartWasteIotImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Vehicle Health Monitoring System",
    category: "iot",
    description:
      "Automotive telematics platform enabling predictive maintenance through continuous OBD-II parameter logging, engine RPM, and thermal analytics.",
    tags: [
      { name: "iot-telematics", color: "blue-text-gradient" },
      { name: "obd-ii", color: "pink-text-gradient" },
      { name: "embedded-c", color: "green-text-gradient" },
      { name: "predictive-ml", color: "gold-text-gradient" },
    ],
    image: vehicleHealthIotImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Smart Livestock Monitoring System",
    category: "iot",
    description:
      "Agricultural IoT tracking platform with GPS geofencing, livestock biometric collars (heart rate & temperature), and real-time movement analytics.",
    tags: [
      { name: "iot-tracking", color: "emerald-text-gradient" },
      { name: "gps-geofence", color: "blue-text-gradient" },
      { name: "biometrics", color: "pink-text-gradient" },
      { name: "cloud-telemetry", color: "purple-text-gradient" },
    ],
    image: livestockIotImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "IoT Sensor Dashboard Interface",
    category: "iot",
    description:
      "Real-time web command center streaming live telemetry gauges, MQTT sensor feeds, connected device node health, and status diagnostics.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "mqtt", color: "green-text-gradient" },
      { name: "websockets", color: "gold-text-gradient" },
      { name: "telemetry", color: "purple-text-gradient" },
    ],
    image: iotSensorDashImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
  {
    name: "Video Game Sales Dashboard",
    category: "ai",
    description:
      "Interactive Business Intelligence dashboard built with Tableau visualizing global video game sales trends, regional heatmaps, and publisher KPIs.",
    tags: [
      { name: "tableau", color: "blue-text-gradient" },
      { name: "bi-analytics", color: "purple-text-gradient" },
      { name: "data-viz", color: "green-text-gradient" },
      { name: "kpi-metrics", color: "gold-text-gradient" },
    ],
    image: gameSalesBiImg,
    imageClassName: "object-cover",
    source_code_link: "https://github.com/s-k-sriraam",
  },
];

export { services, technologies, experiences, testimonials, projects };
