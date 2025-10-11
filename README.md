<div id="project-overview">
    <h1># LifeAura AI – SANKALP</h1>

    <p>
        LifeAura AI is an intelligent health management platform designed to assist users with <b>medication reminders</b>, <b>quick symptom guidance</b>, and <b>AI-powered analysis</b> for minor health issues. 
        Built with a focus on accessibility and reliability, it serves as a digital health companion for individuals and caregivers alike.
    </p>

    <hr>

    <h2>Features</h2>
    <ul>
        <li><b>MERN-based Web App</b> – Full-stack application with a modern, scalable architecture.</li>
        <li><b>Medication Scheduling & Reminders</b> – Automated WhatsApp/SMS notifications to prevent missed doses.</li>
        <li><b>Prescription Digitization</b> – OCR-based scanning for easy tracking of medications.</li>
        <li><b>AI Chatbot</b> – Symptom-checking assistant for instant health guidance.</li>
        <li><b>Skin Condition Analysis</b> – AI-driven image analysis for basic dermatological support.</li>
    </ul>

    <hr>

    <h2>Target Users</h2>
    <ul>
        <li><b>Elderly Individuals</b> – Simplified interface for ease of use.</li>
        <li><b>People with Chronic Conditions</b> – Consistent reminders and health monitoring.</li>
        <li><b>Caregivers</b> – Better patient management tools.</li>
        <li><b>General Health-Conscious Users</b> – Quick, reliable first-aid and symptom guidance.</li>
    </ul>

    <b>Key User Needs:</b>
    <ul>
        <li>Simple, user-friendly design</li>
        <li>Large fonts & clear instructions</li>
        <li>Quick, reliable responses</li>
    </ul>

    <hr>

    <h2>Security & Privacy</h2>
    <p>LifeAura AI prioritizes data protection with:</p>
    <ul>
        <li>End-to-end encryption for sensitive health data</li>
        <li>API calls secured with HTTPS & AES-256 encryption at rest</li>
        <li>JWT-based authentication with role-based access control</li>
    </ul>

    <hr>

    <h2>Tech Stack</h2>
    <ul>
        <li><b>Frontend:</b> React.js</li>
        <li><b>Backend:</b> Node.js, Express.js</li>
        <li><b>Database:</b> MongoDB</li>
        <li><b>AI/ML Components:</b> Symptom-checking chatbot & image analysis models</li>
        <li><b>Communication:</b> WhatsApp & SMS integration</li>
    </ul>

    <hr>

    <h2>Project Roadmap</h2>
    <ol>
        <li>Initial design & scope finalization</li>
        <li>Implement MERN stack setup with authentication & user profiles</li>
        <li>Integrate OCR, AI chatbot & skin image analysis</li>
        <li>Deploy production-ready health companion platform</li>
    </ol>
</div>

<hr style="border: 4px solid #333; margin: 40px 0;">
<div id="project-setup-guide">
    <h1>Project Setup Guide</h1>
    <p>
        This guide explains how to <strong>install dependencies</strong>, <strong>configure environment variables</strong>, and <strong>run all servers</strong> (Backend, Frontend, and ML) locally.
    </p>

    <hr>

    <h2>🐍 Python/ML Setup</h2>
    <p>This setup is for the Python-based Machine Learning server.</p>

    <p>1️⃣ Create <code>.env</code> file</p>
    <p><strong>Location:</strong> <code>./ml/</code></p>
    <ul>
        <li><code>GITHUB_API_KEY=your_github_api_key_here</code></li>
    </ul>

    <p>Install dependencies</p>
    <pre><code>cd ml
pip install -r requirements.txt</code></pre>

    <p>Run Server</p>
    <pre><code>python test_server_pythonic.py</code></pre>

    <hr>

    <h2>🌐 Frontend Setup</h2>
    <p>This setup is for the web user interface.</p>

    <p>Install dependencies</p>
    <pre><code>cd frontend
npm install</code></pre>

    <p>Run Server</p>
    <pre><code>npm run dev</code></pre>

    <hr>

    <h2>⚙️ Backend Setup</h2>
    <p>This setup is for the main application programming interface (API).</p>

    <p>1️⃣ Create <code>.env</code> file</p>
    <p><strong>Location:</strong> <code>./backend/</code></p>
    <ul>
        <li><code>PORT=3000</code></li>
        <li><code>CORS_ORIGIN=http://localhost:5173</code></li>
        <li><code>ACCESS_TOKEN_SECRET=your_long_secure_secret_here</code></li>
        <li><code>ACCESS_TOKEN_EXPIRY=1h</code></li>
    </ul>

    <p>Install dependencies</p>
    <pre><code>cd backend
npm install</code></pre>

    <p>Run Server</p>
    <pre><code>npm run dev</code></pre>
</div>