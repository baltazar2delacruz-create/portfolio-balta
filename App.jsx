function useTheme() {

const [theme, setTheme] = React.useState(

() => localStorage.getItem("theme") || "light"

);

React.useEffect(() => {

localStorage.setItem("theme", theme);

document.documentElement.style.background = 

  theme === "dark" ? "#1a1a1a" : "#ffffff";

}, [theme]);

return [theme, setTheme];

}

function useFormData() {

const [formData, setFormData] = React.useState({ name: "", message: "" });

const updateField = (field, value) => {

setFormData(prev => ({ ...prev, [field]: value }));

};

return [formData, updateField];

}

// Header Component

function Header() {

return (

<header style={{ textAlign: "center", marginBottom: "32px", paddingBottom: "16px", borderBottom: "2px solid #ccc" }}>

  <h1 style={{ margin: "0 0 8px 0", fontSize: "32px" }}>Your Name</h1>

  <p style={{ margin: "0", fontSize: "18px", color: "#666" }}>Frontend Developer & React Enthusiast</p>

</header>

);

}

// About Section

function About(props) {

return (

<section style={{ marginBottom: "32px", padding: "16px", background: "#f5f7fb", borderRadius: "8px" }}>

  <h2 style={{ marginTop: "0" }}>About</h2>

  <p>{props.bio}</p>

  <p><strong>Current Status:</strong> <span style={{ color: "green" }}>● {props.status}</span></p>

</section>

);

}

// Projects Section with Filter

function Projects(props) {

const [filter, setFilter] = React.useState("All");

React.useEffect(() => {

document.title = `Portfolio | ${filter === "All" ? "All Projects" : filter}`;

}, [filter]);

const visible =

filter === "All" 

  ? props.projects 

  : props.projects.filter(p => p.type === filter);

const projectTypes = ["All", ...new Set(props.projects.map(p => p.type))];

return (

<section style={{ marginBottom: "32px", padding: "16px", background: "#f5f7fb", borderRadius: "8px" }}>

  <h2 style={{ marginTop: "0" }}>Projects ({visible.length})</h2>

  

  <div style={{ marginBottom: "16px", display: "flex", gap: "8px", flexWrap: "wrap" }}>

    {projectTypes.map(type => (

      <button

        key={type}

        onClick={() => setFilter(type)}

        style={{

          padding: "8px 16px",

          background: filter === type ? "#0066cc" : "#ddd",

          color: filter === type ? "#fff" : "#000",

          border: "none",

          borderRadius: "4px",

          cursor: "pointer",

          fontWeight: filter === type ? "bold" : "normal"

        }}

      >

        {type}

      </button>

    ))}

  </div>



  <ul style={{ margin: "0", paddingLeft: "20px" }}>

    {visible.map((project, index) => (

      <li key={project.id} style={{ marginBottom: "8px" }}>

        <strong>{project.name}</strong>

        <span style={{ color: "#666", fontSize: "14px" }}> • {project.type}</span>

        {project.description && <p style={{ margin: "4px 0 0 0", color: "#555" }}>{project.description}</p>}

      </li>

    ))}

  </ul>

</section>

);

}

// Contact Section with Refs & State

function Contact() {

const [open, setOpen] = React.useState(false);

const emailRef = React.useRef(null);

const [formData, updateField] = useFormData();

const handleFocusEmail = () => {

if (emailRef.current) {

  emailRef.current.focus();

  emailRef.current.select();

}

};

const handleSubmit = () => {

if (formData.name && formData.message) {

  alert(`Thanks ${formData.name}! I'll get back to you soon.`);

  updateField("name", "");

  updateField("message", "");

} else {

  alert("Please fill in all fields");

}

};

return (

<section style={{ marginBottom: "32px", padding: "16px", background: "#f5f7fb", borderRadius: "8px" }}>

  <h2 style={{ marginTop: "0" }}>Get In Touch</h2>

  

  <button

    onClick={() => setOpen(!open)}

    style={{

      padding: "10px 20px",

      background: "#0066cc",

      color: "#fff",

      border: "none",

      borderRadius: "4px",

      cursor: "pointer",

      fontSize: "16px"

    }}

  >

    {open ? "Hide Contact Form ✕" : "Show Contact Form ✉️"}

  </button>



  {open && (

    <div style={{ marginTop: "16px", padding: "16px", background: "#fff", borderRadius: "4px", border: "1px solid #ddd" }}>

      <div style={{ marginBottom: "12px" }}>

        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Your Name:</label>

        <input

          type="text"

          placeholder="John Doe"

          value={formData.name}

          onChange={(e) => updateField("name", e.target.value)}

          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}

        />

      </div>



      <div style={{ marginBottom: "12px" }}>

        <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Your Message:</label>

        <textarea

          placeholder="Tell me about your project..."

          value={formData.message}

          onChange={(e) => updateField("message", e.target.value)}

          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "100px", boxSizing: "border-box" }}

        />

      </div>



      <div style={{ marginBottom: "12px", padding: "12px", background: "#f0f0f0", borderRadius: "4px" }}>

        <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>📧 Direct Email:</label>

        <div style={{ display: "flex", gap: "8px" }}>

          <input

            ref={emailRef}

            type="email"

            defaultValue="yourname@example.com"

            readOnly

            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}

          />

          <button

            onClick={handleFocusEmail}

            style={{

              padding: "8px 16px",

              background: "#666",

              color: "#fff",

              border: "none",

              borderRadius: "4px",

              cursor: "pointer"

            }}

          >

            Copy

          </button>

        </div>

      </div>



      <button

        onClick={handleSubmit}

        style={{

          padding: "10px 20px",

          background: "#28a745",

          color: "#fff",

          border: "none",

          borderRadius: "4px",

          cursor: "pointer",

          fontSize: "16px",

          fontWeight: "bold"

        }}

      >

        Send Message 🚀

      </button>

    </div>

  )}

</section>

);

}

// Main App

export default function App() {

const [theme, setTheme] = useTheme();

const [tab, setTab] = React.useState("About");

const profileData = {

bio: "Passionate about building modern, interactive web experiences with React. I specialize in component-based architecture and state management.",

status: "Available for new projects"

};

const projectsData = [

{ id: 1, name: "Portfolio Website", type: "React", description: "Modern portfolio built with React hooks and context" },

{ id: 2, name: "Weather Dashboard", type: "React", description: "Real-time weather data with dynamic UI updates" },

{ id: 3, name: "Task Tracker App", type: "React", description: "Full-featured task management with local storage" },

{ id: 4, name: "Landing Page", type: "HTML", description: "Beautiful landing page for a tech startup" },

{ id: 5, name: "E-commerce UI", type: "React", description: "Responsive product catalog with filtering" }

];

const isDark = theme === "dark";

const bgColor = isDark ? "#1a1a1a" : "#ffffff";

const textColor = isDark ? "#ffffff" : "#000000";

const containerBg = isDark ? "#2a2a2a" : "#f9f9f9";

return (

<div style={{

  background: bgColor,

  color: textColor,

  transition: "all 0.3s ease",

  minHeight: "100vh",

  padding: "20px"

}}>

  <main style={{ maxWidth: "720px", margin: "0 auto" }}>

    {/* Theme Toggle */}

    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>

      <button

        onClick={() => setTheme(isDark ? "light" : "dark")}

        style={{

          padding: "10px 16px",

          background: isDark ? "#fff" : "#333",

          color: isDark ? "#000" : "#fff",

          border: "none",

          borderRadius: "20px",

          cursor: "pointer",

          fontSize: "14px",

          fontWeight: "bold"

        }}

      >

        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}

      </button>

    </div>



    {/* Header */}

    <Header />



    {/* Navigation Tabs */}

    <nav style={{

      display: "flex",

      gap: "12px",

      marginBottom: "24px",

      borderBottom: `2px solid ${isDark ? "#444" : "#ddd"}`,

      paddingBottom: "12px"

    }}>

      {["About", "Projects", "Contact"].map(section => (

        <button

          key={section}

          onClick={() => setTab(section)}

          style={{

            padding: "10px 20px",

            background: tab === section 

              ? (isDark ? "#0066cc" : "#0066cc") 

              : "transparent",

            color: tab === section ? "#fff" : textColor,

            border: tab === section ? "none" : `2px solid ${isDark ? "#444" : "#ddd"}`,

            borderRadius: "4px",

            cursor: "pointer",

            fontSize: "16px",

            fontWeight: tab === section ? "bold" : "normal",

            transition: "all 0.2s ease"

          }}

        >

          {section}

        </button>

      ))}

    </nav>



    {/* Content Sections */}

    <div style={{

      background: containerBg,

      borderRadius: "8px",

      padding: "24px",

      transition: "all 0.3s ease"

    }}>

      {tab === "About" && <About {...profileData} />}

      {tab === "Projects" && <Projects projects={projectsData} />}

      {tab === "Contact" && <Contact />}

    </div>



    {/* Footer */}

    <footer style={{

      marginTop: "40px",

      padding: "20px",

      textAlign: "center",

      borderTop: `2px solid ${isDark ? "#444" : "#ddd"}`,

      color: isDark ? "#aaa" : "#666",

      fontSize: "14px"

    }}>

      <p>© 2024 Your Name. Built with React & Reacture 🚀</p>

      <p>All lessons combined into one dynamic portfolio</p>

    </footer>

  </main>

</div>

);

}

