DELETE FROM project_highlights;
DELETE FROM project_tech;
DELETE FROM projects;
DELETE FROM skills;
DELETE FROM skill_categories;
DELETE FROM education;
DELETE FROM achievements;
DELETE FROM profile;

INSERT INTO profile
  (id, full_name, tagline, intro, about, email, phone, location, github_url, linkedin_url, leetcode_url, resume_path)
VALUES
  (1, 'Rishi Dusane', 'Software Engineer | MERN | Spring Boot',
   'Fresher Java Full-Stack Developer who builds secure, tested full-stack applications with Spring Boot, React and Node.js.',
   'Fresher Java Full-Stack Developer with a PG Diploma in Advanced Computing from CDAC. Built full-stack applications using Spring Boot, React.js, Node.js, REST APIs, JWT security and MySQL, including a microservices-based travel booking platform with Stripe payments. Comfortable with Docker, CI/CD and AWS fundamentals, and with using AI tools and prompt engineering to build faster. Strong foundation in DSA, OOP and unit/integration testing, with 200+ problems solved.',
   'rishidusane5@gmail.com', '+91-9834080685', '',
   'https://github.com/RishiDusane', 'https://www.linkedin.com/in/rishidusane/',
   'https://leetcode.com/u/RishiiiDusane/', '/Rishi_Dusane_Resume.pdf');

INSERT INTO skill_categories (id, name, sort_order) VALUES
  (1, 'Languages', 1),
  (2, 'Frontend', 2),
  (3, 'Backend', 3),
  (4, 'Database', 4),
  (5, 'Core', 5),
  (6, 'DevOps & Cloud', 6),
  (7, 'AI Tools', 7),
  (8, 'Tools & Testing', 8);

INSERT INTO skills (id, category_id, name, sort_order) VALUES
  (1, 1, 'Java', 1), (2, 1, 'JavaScript', 2), (3, 1, 'SQL', 3),
  (4, 2, 'React.js', 1), (5, 2, 'React Router', 2), (6, 2, 'Axios', 3), (7, 2, 'HTML5', 4), (8, 2, 'CSS3', 5),
  (9, 3, 'Spring Boot', 1), (10, 3, 'Spring MVC', 2), (11, 3, 'Spring Security', 3), (12, 3, 'Spring Data JPA', 4),
  (13, 3, 'Hibernate', 5), (14, 3, 'Node.js', 6), (15, 3, 'Express', 7), (16, 3, 'REST APIs', 8), (17, 3, 'JWT', 9), (18, 3, 'Microservices', 10),
  (19, 4, 'MySQL', 1),
  (20, 5, 'DSA (200+)', 1), (21, 5, 'OOP', 2), (22, 5, 'Exception Handling', 3),
  (23, 6, 'Docker', 1), (24, 6, 'Docker Compose', 2), (25, 6, 'CI/CD', 3), (26, 6, 'AWS', 4),
  (27, 7, 'Prompt Engineering', 1), (28, 7, 'ChatGPT', 2), (29, 7, 'Claude', 3), (30, 7, 'GitHub Copilot', 4), (31, 7, 'Cursor', 5),
  (32, 8, 'Git', 1), (33, 8, 'GitHub', 2), (34, 8, 'Maven', 3), (35, 8, 'Postman', 4), (36, 8, 'JUnit 5', 5), (37, 8, 'Mockito', 6);

INSERT INTO projects (id, title, badge, description, github_url, live_url, sort_order) VALUES
  (1, 'TripSync - Travel Booking Platform', 'Team Project',
   'A travel booking platform on a microservices architecture behind an API Gateway.',
   'https://github.com/RishiDusane/TripSync', NULL, 1),
  (2, 'Prime Properties - Real Estate Listing Application', 'CDAC Capstone',
   'A full-stack property platform for buyers, owners and admins.',
   'https://github.com/RishiDusane/PRIME-PROPERTIES-FULLSTACK', NULL, 2),
  (3, 'TaskFlow Planner - Task Management Application', 'Personal Project',
   'A full-stack task manager with list, Kanban (drag-and-drop) and calendar views.',
   'https://github.com/RishiDusane/ToDo', NULL, 3);

INSERT INTO project_tech (id, project_id, tech, sort_order) VALUES
  (1, 1, 'Java 21', 1), (2, 1, 'Spring Boot', 2), (3, 1, 'Spring Cloud API Gateway', 3),
  (4, 1, 'Spring Security', 4), (5, 1, 'JWT', 5), (6, 1, 'React 19', 6), (7, 1, 'React Router', 7),
  (8, 1, 'Axios', 8), (9, 1, 'Stripe', 9), (10, 1, 'JUnit 5', 10), (11, 1, 'Mockito', 11), (12, 1, 'Postman', 12),
  (13, 2, 'Java 17', 1), (14, 2, 'Spring Boot', 2), (15, 2, 'Spring Security', 3), (16, 2, 'Hibernate/JPA', 4),
  (17, 2, 'MySQL', 5), (18, 2, 'JWT', 6), (19, 2, 'React.js', 7), (20, 2, 'Axios', 8), (21, 2, 'HTML5', 9),
  (22, 2, 'CSS3', 10), (23, 2, 'JUnit 5', 11), (24, 2, 'Mockito', 12),
  (25, 3, 'React 18', 1), (26, 3, 'Vite', 2), (27, 3, 'Tailwind CSS', 3), (28, 3, 'Zustand', 4),
  (29, 3, 'Node.js', 5), (30, 3, 'Express', 6), (31, 3, 'Sequelize', 7), (32, 3, 'MySQL 8', 8),
  (33, 3, 'JWT', 9), (34, 3, 'Zod', 10), (35, 3, 'Docker Compose', 11), (36, 3, 'Prompt Engineering', 12);

INSERT INTO project_highlights (id, project_id, text, sort_order) VALUES
  (1, 1, 'Built microservices (Auth, Catalog, Booking, Feedback) behind an API Gateway as the single entry point.', 1),
  (2, 1, 'Implemented JWT authentication and role-based access control (Admin/User) with Spring Security.', 2),
  (3, 1, 'Integrated Stripe payments into the booking flow, with automatic booking confirmation after payment.', 3),
  (4, 1, 'Covers tour package browsing, booking, and 1-5 star reviews per package, with a React 19 frontend using protected routes and Axios.', 4),
  (5, 1, 'Wrote unit tests (JUnit 5, Mockito) and integration tests per service, and verified APIs with Postman.', 5),
  (6, 2, 'Layered architecture (Controller, Service, Repository).', 1),
  (7, 2, 'Secured REST endpoints with JWT and role-based access control; added input validation and consistent error responses (400/401/403/404).', 2),
  (8, 2, 'Found and fixed an N+1 query problem in the listing flow using JOIN FETCH and @EntityGraph, confirmed by comparing DB call counts before and after.', 3),
  (9, 2, 'Owner features to add, update and delete listings, with a safeguard that blocks deletion of properties with active bookings.', 4),
  (10, 2, 'Tested business logic and role-based authorization with JUnit 5 and Mockito; validated APIs with Postman.', 5),
  (11, 3, 'Re-architected a client-side React app into a full-stack app backed by a documented REST API and MySQL.', 1),
  (12, 3, 'JWT authentication with bcrypt hashing and per-user ownership checks on every route; requests validated with Zod.', 2),
  (13, 3, 'Normalized schema (users, categories, tasks, subtasks) with cascading deletes and reversible Sequelize migrations, run on MySQL 8 via Docker Compose.', 3),
  (14, 3, 'Search, filters, multi-field sorting, overdue detection, dark mode and JSON import/export.', 4);

INSERT INTO education (id, institution, degree, score, location, start_label, end_label, sort_order) VALUES
  (1, 'Institute of Advanced Computing (IACSD), CDAC', 'PG Diploma in Advanced Computing (PG-DAC)', '70%', 'Pune, India', 'Aug 2025', 'Feb 2026', 1),
  (2, 'Dr. D. Y. Patil School of Engineering', 'Bachelor of Engineering', '7.91 CGPA', 'Pune, India', '2018', '2021', 2),
  (3, 'Government Polytechnic, Awasari (Khurd)', 'Diploma in Engineering', 'Score: 70%', 'Pune, India', '2015', '2018', 3);

INSERT INTO achievements (id, title, description, sort_order) VALUES
  (1, 'Problem Solving', 'Practiced 200+ DSA problems on LeetCode and GeeksforGeeks.', 1),
  (2, 'Career Transition', 'Prepared full-time for the UPSC Civil Services Examination (2021-2025), then retrained in software development through CDAC PG-DAC.', 2);
