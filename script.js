
document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursorGlow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    }

    // 3. Navbar Class Change on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 4. Scroll Animation (Fade In Up)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .about-content, .timeline-item, .project-card, .skill-category, .contact-content, .github-widget');

    animatedElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // 5. Chat Widget Logic
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggle && chatClose && chatWindow) {
        function toggleChat() {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active')) {
                setTimeout(() => chatInput.focus(), 300);
            }
        }

        chatToggle.addEventListener('click', toggleChat);
        chatClose.addEventListener('click', toggleChat);

        const knowledgeBase = {
            "experience": "Aditya has over 4 years of experience. He has worked as a Machine Learning Systems Intern at Mainly.ai, a Graduate Assistant at Felician University, an Application Developer Intern at ISKCON, and a GSoC '23 Developer at Google.",
            "skills": "Aditya's technical skills include Python, Java, JavaScript, React, Node.js, TensorFlow, PyTorch, AWS, Google Cloud, Docker, and Kubernetes.",
            "projects": "Aditya's featured projects, including the Hierarchical Reasoning Model, Transformer from Scratch, and Vision Transformer, were all developed during his time at Mainly.ai. Check out the Projects section for more details!",
            "contact": "You can reach Aditya via email at adityainamdar74@gmail.com or inamdara@students.felician.edu.",
            "education": "Aditya completed his MS in Computer Science at Felician University (May 2026). He holds a BTech in CSE from MIT Pune (May 2024).",
            "mainly": "At Mainly.ai, Aditya collaborates with teams to deploy scalable AI solutions, optimizes model inference pipelines, and troubleshoots Docker/Kubernetes integrations.",
            "google": "At Google (GSoC '23), Aditya developed a deep learning model for bone cancer detection, improving accuracy by 15% and optimizing data preprocessing.",
            "resume": "I can certainly help you with information from the resume! Ask me about specific roles, skills, or education.",
            "hello": "Hello! How can I help you today?",
            "hi": "Hi there! Feel free to ask me about Aditya's professional background.",
            "default": "I'm not sure I have the exact answer for that, but I can tell you about Aditya's Experience, Skills, Projects, or Education. What would you like to know?"
        };

        function getBotResponse(input) {
            input = input.toLowerCase();
            if (input.includes('experience') || input.includes('work') || input.includes('job')) return knowledgeBase.experience;
            if (input.includes('skill') || input.includes('tech') || input.includes('stack')) return knowledgeBase.skills;
            if (input.includes('project') || input.includes('built') || input.includes('make')) return knowledgeBase.projects;
            if (input.includes('contact') || input.includes('email') || input.includes('phone') || input.includes('reach')) return knowledgeBase.contact;
            if (input.includes('education') || input.includes('degree') || input.includes('university') || input.includes('college')) return knowledgeBase.education;
            if (input.includes('mainly') || input.includes('intern')) return knowledgeBase.mainly;
            if (input.includes('google') || input.includes('gsoc')) return knowledgeBase.google;
            if (input.includes('resume') || input.includes('cv')) return knowledgeBase.resume;
            if (input.includes('hello') || input.includes('hi') || input.includes('hey')) return knowledgeBase.hello;
            return knowledgeBase.default;
        }

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function handleUserMessage() {
            const text = chatInput.value.trim();
            if (text === "") return;
            addMessage(text, 'user');
            chatInput.value = '';
            setTimeout(() => {
                const botResponse = getBotResponse(text);
                addMessage(botResponse, 'bot');
            }, 600);
        }

        chatSend.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }

    // 6. Horizontal Scroll Drag-to-Scroll Logic
    const sliders = document.querySelectorAll('.horizontal-scroll-wrapper');
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.style.cursor = 'grab';

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.scrollSnapType = 'none';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.style.scrollSnapType = 'x mandatory';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            slider.style.scrollSnapType = 'x mandatory';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2.5;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // 7. Dark/Light Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const currentTheme = localStorage.getItem('theme') || 'dark';

        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 8. Dynamic Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    if (typedTextSpan && cursorSpan) {
        const textArray = ["Full Stack Developer", "Transformer Architect", "Problem Solver"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        if (textArray.length) setTimeout(type, newTextDelay + 250);
    }

    // 9. Interactive Particle Background
    if (typeof tsParticles !== "undefined") {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: true, mode: "push" },
                    onHover: { enable: true, mode: "grab" },
                    resize: true,
                },
                modes: {
                    push: { quantity: 3 },
                    grab: { distance: 150, links: { opacity: 0.6 } }
                }
            },
            particles: {
                color: { value: "#e0aaff" },
                links: {
                    color: "#00f5d4",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: "none",
                    outModes: { default: "bounce" }
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 50,
                },
                opacity: { value: 0.5 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }

    // 10. Custom Ring Cursor
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursorDot = document.querySelector(".custom-cursor-dot");
        const cursorRing = document.querySelector(".custom-cursor-ring");

        if (cursorDot && cursorRing) {
            let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

            document.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorDot.style.left = `${mouseX}px`;
                cursorDot.style.top = `${mouseY}px`;
            });

            const renderCursor = () => {
                ringX += (mouseX - ringX) * 0.2;
                ringY += (mouseY - ringY) * 0.2;
                cursorRing.style.left = `${ringX}px`;
                cursorRing.style.top = `${ringY}px`;
                requestAnimationFrame(renderCursor);
            };
            requestAnimationFrame(renderCursor);

            const interactiveSelectors = 'a, button, input, textarea, .project-card, .chat-toggle, .github-widget, .theme-toggle, .navbar .logo, .social-links a, .fab-item';
            document.querySelectorAll(interactiveSelectors).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorRing.classList.add('hover');
                    cursorDot.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursorRing.classList.remove('hover');
                    cursorDot.classList.remove('hover');
                });
            });
        }
    }

    // 10.5 Bento Card Spotlight Hover Effect
    document.querySelectorAll('.bento-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 11. Scroll Reveal Animations
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach((el, index) => {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        revealObserver.observe(el);
    });

    // 12. Fetch Substack Articles
    initSubstackArticles();

    // 13. Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        document.querySelectorAll('.nav-links li').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }
});

// Separate functions for clarity
async function initSubstackArticles() {
    const rssUrl = `https://adityainamdar.substack.com/feed`;
    const apiBase = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const grid = document.getElementById("medium-articles-grid");
    if (!grid) return;

    const fallbackArticles = [{
        title: "A dataset is worth 1 mb",
        pubDate: new Date().toISOString(),
        link: "https://adityainamdar.substack.com/p/a-dataset-is-worth-1-mb",
        thumbnail: "https://images.unsplash.com/photo-1437964706703-40b90bdf563b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMDAzMzh8MHwxfHNlYXJjaHw3fHx0cmVlfGVufDB8fHx8MTc2NjMwMjkzNXww&ixlib=rb-4.1.0&q=80&w=1080",
        description: "An exploration into the true value of high-quality, dense datasets in modern machine learning architectures.",
        categories: ["Machine Learning", "Data Science"]
    }];

    const renderArticles = (articles) => {
        grid.innerHTML = '';
        grid.style.cssText = "display: flex; flex-wrap: nowrap; justify-content: flex-start; gap: 2rem; overflow-x: auto; padding-bottom: 2rem; scroll-snap-type: x mandatory;";

        articles.slice(0, 10).forEach((item, index) => {
            let imageUrl = item.thumbnail || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='100%25' height='100%25' fill='%23120E1F'/%3E%3C/svg%3E";
            const pubDate = new Date(item.pubDate).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
            let excerpt = (item.description || item.content || "").replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + "...";
            const categoriesHTML = (item.categories || []).slice(0, 3).map(tag => `<span>${tag.replace(/-/g, ' ')}</span>`).join('');

            grid.innerHTML += `
            <div class="project-card reveal active" data-tilt style="transition-delay: ${(index % 3) * 0.1}s; flex: 0 0 auto; width: 85vw; max-width: 480px; scroll-snap-align: center;">
                <div class="project-image" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
                    <div class="project-overlay">
                        <a href="${item.link}" class="project-link" target="_blank"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${item.title}</h3>
                    <p class="project-affiliation">${pubDate}</p>
                    <p>${excerpt}</p>
                    <div class="tags">${categoriesHTML}</div>
                </div>
            </div>`;
        });

        if (typeof VanillaTilt !== "undefined") VanillaTilt.init(grid.querySelectorAll(".project-card"));
    };

    try {
        const response = await fetch(apiBase);
        const data = await response.json();
        renderArticles(data.status === "ok" ? data.items : fallbackArticles);
    } catch (e) {
        renderArticles(fallbackArticles);
    }
}

// 14. Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("myBar");
    if (bar) bar.style.width = scrolled + "%";
});

// Dynamic Animation Styles
const styleSheet = document.createElement("style");
styleSheet.innerText = `.fade-in-up { opacity: 0; transform: translateY(30px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; } .fade-in-up.visible { opacity: 1; transform: translateY(0); }`;
document.head.appendChild(styleSheet);

// --- 15. WebGPU In-Browser Model Engine & Assistant ---
(function initWebGPUEngine() {
    const webgpuInput = document.getElementById('webgpu-input');
    const webgpuSendBtn = document.getElementById('webgpu-send-btn');
    const webgpuResponseBox = document.getElementById('webgpu-response-box');
    const webgpuResponseContent = document.getElementById('webgpu-response-content');
    const webgpuStatusText = document.getElementById('webgpu-status-text');
    const webgpuProgressBarContainer = document.getElementById('webgpu-progress-container');
    const webgpuProgressBar = document.getElementById('webgpu-progress-bar');
    const webgpuEngineName = document.getElementById('webgpu-engine-name');
    const chipBtns = document.querySelectorAll('.chip-btn');

    if (!webgpuInput || !webgpuSendBtn) return;

    let webllmEngine = null;
    let isWebGPUAvailable = false;

    // Check WebGPU availability
    if (navigator.gpu) {
        isWebGPUAvailable = true;
        if (webgpuStatusText) webgpuStatusText.innerHTML = '<span class="text-accent">○ WebGPU Engine Ready</span>';
    } else {
        if (webgpuStatusText) webgpuStatusText.innerHTML = '<span class="text-secondary">○ Client Knowledge Engine</span>';
        if (webgpuEngineName) webgpuEngineName.innerText = 'Smart Knowledge Assistant';
    }

    const adityaKB = {
        "hire": "Aditya is a top-tier AI/ML Engineer with proven experience building production AI systems from scratch. Highlights for hiring managers:\n• MS in Computer Science (3.78 GPA) from Felician University.\n• Deconstructed Transformers & HRMs at Mainly.ai (Stockholm).\n• +15% CNN accuracy & 30% pipeline speedup for Google Summer of Code '23.\n• Expert in PyTorch, RAG, LLM Alignment (DPO/LoRA), C++, and MLOps.\n• Available for full-time AI/ML Engineering & Applied Scientist roles (NY Metro, Remote, or Relocation).",
        "gpa": "Aditya earned a 3.78 GPA in his Master of Science in Computer Science at Felician University (Rutherford, NJ - May 2026). He completed his B.Tech in CSE from MIT Pune.",
        "mainly": "At Mainly.ai (Stockholm / Remote), Aditya served as a Machine Learning Systems Intern (Jan 2026 – May 2026). He deconstructed Transformer & Hierarchical Risk Model (HRM) architectures using PyTorch to analyze layer-wise attention weights for financial and scientific datasets, and built deep graph visualizations in DGL.",
        "hrm": "Hierarchical Reasoning Models (HRM) combine multi-level abstraction networks with attention mechanisms to process complex multi-dimensional datasets. Aditya analyzed layer-wise attention weights to maximize interpretability at Mainly.ai.",
        "gsoc": "For Google Summer of Code '23, Aditya developed a Bone Cancer Detection model using CNNs (achieving a 15% diagnostic accuracy increase over baseline models) and built a high-throughput medical image preprocessing pipeline that reduced processing time by 30%.",
        "experience": "Aditya has 4+ years of hands-on ML and software engineering experience. Roles include: ML Systems Intern at Mainly.ai, Graduate Assistant (IT Operations Lead) at Felician University, Mobile Developer Intern at ISKCON, and ML Developer at GSoC '23.",
        "skills": "Key Technical Arsenal:\n• ML/AI: PyTorch, TensorFlow, MLX, Transformers, LangChain, RAG, ChromaDB, DPO, LoRA, SFT\n• Languages: Python (Expert), TypeScript, JavaScript, Java, C++, SQL\n• Backend & Cloud: FastAPI, Node.js, Docker, AWS, GCP, PostgreSQL",
        "contact": "You can contact Aditya via:\n• Direct Email: adityainamdar74@gmail.com\n• LinkedIn: linkedin.com/in/adityainamdar1/\n• GitHub: github.com/AdityaInamdar334\n• Official Resume PDF available on page top & bio card.",
        "education": "Aditya completed his Master of Science in Computer Science at Felician University with a 3.78 GPA (May 2026). He holds a B.Tech in CSE from MIT-WPU Pune (2024).",
        "projects": "Aditya's key projects include:\n1. AI Medical Image Analysis (MLOps + Streamlit)\n2. LLaMA Alignment Pipeline (SFT + DPO on Apple Silicon)\n3. RSSM World Model (Dreamer RL with 27.4x MPS speedup)\n4. Nexus Graph RAG (Graph-augmented LLM retrieval)"
    };

    function queryKnowledgeBase(query) {
        query = query.toLowerCase();
        if (query.includes('hire') || query.includes('why') || query.includes('candidate') || query.includes('role')) return adityaKB.hire;
        if (query.includes('gpa') || query.includes('grade') || query.includes('score')) return adityaKB.gpa;
        if (query.includes('mainly') || query.includes('stockholm') || query.includes('intern')) return adityaKB.mainly;
        if (query.includes('hrm') || query.includes('hierarchical') || query.includes('reasoning')) return adityaKB.hrm;
        if (query.includes('gsoc') || query.includes('google') || query.includes('cancer')) return adityaKB.gsoc;
        if (query.includes('experience') || query.includes('work') || query.includes('job')) return adityaKB.experience;
        if (query.includes('skill') || query.includes('tech') || query.includes('stack') || query.includes('pytorch')) return adityaKB.skills;
        if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('interview')) return adityaKB.contact;
        if (query.includes('education') || query.includes('degree') || query.includes('felician') || query.includes('university')) return adityaKB.education;
        if (query.includes('project') || query.includes('built') || query.includes('work')) return adityaKB.projects;
        return "Aditya Inamdar is a 3.78 GPA AI/ML Engineer specializing in LLMs, RAG pipelines, PyTorch, and full-stack development. Feel free to download his official Resume PDF or email him directly at adityainamdar74@gmail.com!";
    }

    function streamResponse(text) {
        webgpuResponseBox.style.display = 'block';
        webgpuResponseContent.innerHTML = '';
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                webgpuResponseContent.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
                i++;
                webgpuResponseBox.scrollTop = webgpuResponseBox.scrollHeight;
            } else {
                clearInterval(interval);
            }
        }, 12);
    }

    async function handleWebGPUQuery(userPrompt) {
        if (!userPrompt.trim()) return;
        webgpuResponseBox.style.display = 'block';
        webgpuResponseContent.innerHTML = '<span class="text-accent font-mono"><i class="fas fa-spinner fa-spin"></i> Processing query...</span>';

        // Attempt WebLLM if available and requested
        if (isWebGPUAvailable && typeof window.webllm === 'undefined') {
            try {
                if (webgpuStatusText) webgpuStatusText.innerText = 'Initializing WebLLM Cache...';
                if (webgpuProgressBarContainer) webgpuProgressBarContainer.style.display = 'block';

                // Dynamically import WebLLM from CDN
                const webllmModule = await import('https://esm.run/@mlc-ai/web-llm');
                window.webllm = webllmModule;

                const selectedModel = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';
                if (webgpuEngineName) webgpuEngineName.innerText = 'Qwen2.5-0.5B · Cached in Browser';

                webllmEngine = await window.webllm.CreateMLCEngine(selectedModel, {
                    initProgressCallback: (progress) => {
                        const pct = Math.round((progress.progress || 0) * 100);
                        if (webgpuProgressBar) webgpuProgressBar.style.width = pct + '%';
                        if (webgpuStatusText) webgpuStatusText.innerText = `Caching weights: ${pct}%`;
                    }
                });

                if (webgpuStatusText) webgpuStatusText.innerText = '● Cached & Ready (WebGPU)';
                if (webgpuProgressBarContainer) webgpuProgressBarContainer.style.display = 'none';
            } catch (err) {
                console.warn('WebGPU ML Engine notice:', err);
                if (webgpuStatusText) webgpuStatusText.innerText = '○ Client Knowledge Engine';
                if (webgpuProgressBarContainer) webgpuProgressBarContainer.style.display = 'none';
            }
        }

        if (webllmEngine) {
            try {
                const systemPrompt = `You are an AI assistant representing Aditya Inamdar, an AI Engineer & Researcher. 
Aditya's background:
- Degree: MS in Computer Science from Felician University (May 2026), B.Tech in CSE from MIT Pune.
- Mainly.ai (ML Systems Intern, Stockholm/Remote, Jan-May 2026): Deconstructed Transformer & Hierarchical Reasoning Models (HRM) using PyTorch; built deep graph visualizations in DGL.
- Google Summer of Code (GSoC '23 Intern): Developed Bone Cancer Detection CNN model (+15% accuracy) and medical image preprocessing pipeline (30% speedup).
- Felician University (Graduate Assistant, Jan 2025-May 2026): Led IT operations & student tech team, cut ticket resolution time by 15%.
- Skills: PyTorch, TensorFlow, Transformers, RAG, WebGPU, Python, TypeScript, React Native, MLOps, Docker.
- Contact: adityainamdar74@gmail.com | linkedin.com/in/adityainamdar1/ | github.com/AdityaInamdar334.

Be concise, accurate, direct, and professional.`;

                const messages = [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ];
                const reply = await webllmEngine.chat.completions.create({ messages, max_tokens: 200 });
                const lower = (content || "").toLowerCase();
                if (content && !lower.includes("didn't understand") && !lower.includes("can't assist") && !lower.includes("cannot assist") && !lower.includes("sorry")) {
                    streamResponse(content);
                } else {
                    streamResponse(queryKnowledgeBase(userPrompt));
                }
                return;
            } catch (e) {
                console.warn('Fallback to local knowledge engine:', e);
            }
        }

        // Fast fallback
        const responseText = queryKnowledgeBase(userPrompt);
        streamResponse(responseText);
    }

    webgpuSendBtn.addEventListener('click', () => {
        const val = webgpuInput.value;
        webgpuInput.value = '';
        handleWebGPUQuery(val);
    });

    webgpuInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const val = webgpuInput.value;
            webgpuInput.value = '';
            handleWebGPUQuery(val);
        }
    });

    chipBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const promptText = btn.textContent.trim();
            webgpuInput.value = promptText;
            handleWebGPUQuery(promptText);
        });
    });
})();

// Floating Back-to-Top Button & Notebook Execution Logic
document.addEventListener('DOMContentLoaded', () => {
    // 1. Back-to-Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Notebook Code Execution Preview Buttons
    document.querySelectorAll('.notebook-cell-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetBox = document.getElementById(targetId);
            if (targetBox) {
                if (targetBox.style.display === 'block') {
                    targetBox.style.display = 'none';
                    this.innerHTML = this.innerHTML.replace('Running...', 'Run').replace('Output ▼', 'Run');
                } else {
                    this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Running...';
                    setTimeout(() => {
                        targetBox.style.display = 'block';
                        this.innerHTML = '<i class="fas fa-check me-1" style="color:#10b981;"></i> Output ▼';
                    }, 400);
                }
            }
        });
    });
});

// --- 16. Interactive Moving Particle Constellation Background ---
(function initParticleConstellation() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 1.8 + 1;
            this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248,' : 'rgba(59, 130, 246,';
            this.alpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Interactive mouse repulse/attract
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 1.2;
                    this.y -= (dy / dist) * force * 1.2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const opacity = (1 - dist / 130) * 0.28;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.75;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
})();

// --- 17. Executive Command Palette (⌘K) & Arsenal Filter Logic ---
(function initCommandPaletteAndFilters() {
    const trigger = document.getElementById('cmd-palette-trigger');
    const triggerMobile = document.getElementById('cmd-palette-trigger-mobile');
    const triggerOffcanvas = document.getElementById('cmd-palette-trigger-offcanvas');
    const modal = document.getElementById('cmd-palette-modal');
    const searchInput = document.getElementById('cmd-search-input');
    const optionItems = document.querySelectorAll('.cmd-option-item');

    if (!modal) return;

    function openModal() {
        modal.style.display = 'flex';
        setTimeout(() => searchInput && searchInput.focus(), 50);
    }

    function closeModal() {
        modal.style.display = 'none';
        if (searchInput) searchInput.value = '';
        optionItems.forEach(item => item.style.display = 'flex');
    }

    if (trigger) trigger.addEventListener('click', openModal);
    if (triggerMobile) triggerMobile.addEventListener('click', openModal);
    if (triggerOffcanvas) triggerOffcanvas.addEventListener('click', openModal);

    // Keyboard Shortcuts (⌘K, Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            modal.style.display === 'none' || !modal.style.display ? openModal() : closeModal();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Close on overlay backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Action Executions
    optionItems.forEach(item => {
        item.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            closeModal();

            if (action === 'resume') {
                window.open('Aditya_Inamdar_Resume.pdf', '_blank');
            } else if (action === 'email') {
                window.location.href = 'mailto:adityainamdar74@gmail.com';
            } else if (action === 'work') {
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'experience') {
                document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'skills') {
                document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'webgpu') {
                document.querySelector('#webgpu-input')?.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Instant Fuzzy Search inside Command Palette
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const term = this.value.toLowerCase().trim();
            optionItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(term) ? 'flex' : 'none';
            });
        });
    }

    // Technical Arsenal Filter Buttons
    const filterBtns = document.querySelectorAll('.arsenal-filter-btn');
    const cardCols = document.querySelectorAll('.arsenal-card-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            filterBtns.forEach(b => {
                b.classList.remove('btn-warning', 'text-dark', 'fw-semibold', 'active');
                b.classList.add('btn-outline-secondary', 'text-silver');
            });

            this.classList.remove('btn-outline-secondary', 'text-silver');
            this.classList.add('btn-warning', 'text-dark', 'fw-semibold', 'active');

            cardCols.forEach(col => {
                const category = col.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    col.classList.remove('dimmed');
                } else {
                    col.classList.add('dimmed');
                }
            });
        });
    });
})();

// --- 18. Project Spec Modal & Copy Toast System ---
(function initProjectSpecAndToast() {
    const specModal = document.getElementById('project-spec-modal');
    const closeBtn = document.getElementById('close-project-modal');

    if (specModal && closeBtn) {
        closeBtn.addEventListener('click', () => specModal.style.display = 'none');
        specModal.addEventListener('click', (e) => {
            if (e.target === specModal) specModal.style.display = 'none';
        });
    }

    // Attach click triggers to project spec buttons
    document.querySelectorAll('.open-project-spec').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const metrics = this.getAttribute('data-metrics');
            const demo = this.getAttribute('data-demo');
            const source = this.getAttribute('data-source');

            document.getElementById('modal-project-title').innerText = title || 'Project Spec';
            document.getElementById('modal-project-desc').innerText = desc || '';
            document.getElementById('modal-project-metrics').innerHTML = metrics || '';

            const demoBtn = document.getElementById('modal-demo-link');
            const sourceBtn = document.getElementById('modal-source-link');

            if (demo) {
                demoBtn.href = demo;
                demoBtn.style.display = 'inline-flex';
            } else {
                demoBtn.style.display = 'none';
            }

            if (source) {
                sourceBtn.href = source;
                sourceBtn.style.display = 'inline-flex';
            } else {
                sourceBtn.style.display = 'none';
            }

            if (specModal) specModal.style.display = 'flex';
        });
    });

    // Copy to Clipboard Toast Notification
    function showToast(msg) {
        let toast = document.getElementById('copy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copy-toast';
            toast.className = 'copy-toast-notification';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fas fa-check-circle me-1.5 text-success"></i> ${msg}`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    }

    document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function () {
            const href = this.getAttribute('href');
            const text = href.replace('mailto:', '').replace('tel:', '');
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text);
                showToast(`Copied ${text} to clipboard!`);
            }
        });
    });
})();

// --- 19. Animated Metric Counters & Scroll-Spy Active Nav ---
(function initMetricsAndScrollSpy() {
    // 1. Metric Counter IntersectionObserver
    const metricsGrid = document.getElementById('metrics-grid');
    if (metricsGrid) {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                document.querySelectorAll('.metric-counter').forEach(el => {
                    const target = parseFloat(el.getAttribute('data-target'));
                    const prefix = el.getAttribute('data-prefix') || '';
                    const suffix = el.getAttribute('data-suffix') || '';
                    const decimals = parseInt(el.getAttribute('data-decimals') || '0');
                    const duration = 1200;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const currentVal = (target * easeOut).toFixed(decimals);

                        el.textContent = `${prefix}${currentVal}${suffix}`;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
                        }
                    }
                    requestAnimationFrame(updateCount);
                });
            }
        }, { threshold: 0.2 });

        observer.observe(metricsGrid);
    }

    // 2. Active Section Scroll-Spy Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSectionId) {
                link.classList.add('text-accent', 'fw-semibold');
                link.classList.remove('text-muted');
            } else {
                link.classList.remove('text-accent', 'fw-semibold');
                link.classList.add('text-muted');
            }
        });
    });

    // 3. 3D Tilt Initialization for Paper Cards
    if (window.VanillaTilt) {
        window.VanillaTilt.init(document.querySelectorAll(".paper-card"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.12,
        });
    }
})();

// --- 20. Web Audio API Haptic Micro-Sound FX Engine ---
(function initAudioFXEngine() {
    let audioCtx = null;
    let audioEnabled = true;

    const toggleBtn = document.getElementById('audio-toggle-btn');
    const toggleBtnMobile = document.getElementById('audio-toggle-btn-mobile');
    const icon = document.getElementById('audio-icon');
    const iconMobile = document.getElementById('audio-icon-mobile');
    const text = document.getElementById('audio-status-text');

    function toggleAudio() {
        audioEnabled = !audioEnabled;
        if (audioEnabled) {
            if (icon) icon.className = 'fas fa-volume-up text-accent';
            if (iconMobile) iconMobile.className = 'fas fa-volume-up text-accent';
            if (text) text.textContent = 'Audio: On';
        } else {
            if (icon) icon.className = 'fas fa-volume-mute text-muted';
            if (iconMobile) iconMobile.className = 'fas fa-volume-mute text-muted';
            if (text) text.textContent = 'Audio: Off';
        }
    }

    if (toggleBtn) toggleBtn.addEventListener('click', toggleAudio);
    if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleAudio);

    function playSoftClick(freq = 800, type = 'sine', duration = 0.03) {
        if (!audioEnabled) return;
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Audio context not allowed without gesture
        }
    }

    // Attach subtle audio feedback to key buttons
    document.querySelectorAll('.btn, .chip-btn, .cmd-option-item, .notebook-cell-btn').forEach(btn => {
        btn.addEventListener('click', () => playSoftClick(920, 'sine', 0.04));
    });
})();

// --- 21. Architecture Specs Modal System ---
(function initArchSpecsModal() {
    const specsData = {
        "nexus-graph": {
            title: "Nexus Graph RAG Architecture",
            tag: "Fig. 01 — Retrieval Augmented Generation & Knowledge Graph",
            footer: "Next.js · FastAPI · LangChain · Cytoscape.js · Chroma Vector DB",
            diagramSvg: `
                <svg viewBox="0 0 760 140" class="w-100" style="max-height: 140px;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
                        </marker>
                    </defs>
                    <path d="M 120 70 L 175 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 315 70 L 370 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 510 70 L 565 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    
                    <g transform="translate(10, 35)">
                        <rect width="110" height="70" class="arch-node" />
                        <text x="55" y="32" text-anchor="middle" class="arch-node-text">PDF Ingestion</text>
                        <text x="55" y="48" text-anchor="middle" class="arch-node-sub">FastAPI Async Stream</text>
                    </g>
                    <g transform="translate(175, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#38bdf8" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#38bdf8">Vector + Graph DB</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">ChromaDB + LangChain</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">Entity Extraction</text>
                    </g>
                    <g transform="translate(370, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#34d399" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#34d399">Cytoscape Visualizer</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">Topological Subgraph</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">18.4ms Retrieval</text>
                    </g>
                    <g transform="translate(565, 35)">
                        <rect width="130" height="70" class="arch-node" stroke="#a78bfa" />
                        <text x="65" y="32" text-anchor="middle" class="arch-node-text" fill="#a78bfa">LLM Streamer</text>
                        <text x="65" y="48" text-anchor="middle" class="arch-node-sub">Grounded Context</text>
                    </g>
                </svg>
            `,
            metrics: [
                { label: "Retrieval Latency", val: "< 150ms", sub: "p95 vector & graph query", icon: "fa-bolt text-warning" },
                { label: "Graph Capacity", val: "1,420 Nodes", sub: "3,890 relational edges", icon: "fa-project-diagram text-info" },
                { label: "Subgraph Extraction", val: "18.4ms", sub: "Interactive neighborhood", icon: "fa-microchip text-success" },
                { label: "Vector Precision", val: "98.1%", sub: "Top-5 RAG accuracy", icon: "fa-bullseye text-accent" }
            ],
            highlights: `
                <ul class="mb-0 ps-3">
                    <li class="mb-1.5"><strong>Hybrid Dense + Graph Retrieval:</strong> Blends dense vector search in ChromaDB with structural entity relationship traversing via LangChain.</li>
                    <li class="mb-1.5"><strong>Real-Time Topological Render:</strong> Streams node adjacency matrices directly into Cytoscape.js canvas rendering graphs live at 60 FPS.</li>
                    <li><strong>Asynchronous PDF Processing:</strong> Background worker pipeline ingests multi-page technical documents and extracts entities without blocking incoming HTTP requests.</li>
                </ul>
            `
        },
        "voice-ai": {
            title: "Real-Time Voice AI Agent Specs",
            tag: "Fig. 02 — WebSockets + Twilio Bidirectional Voice Streaming",
            footer: "FastAPI · WebSockets · Twilio Media Streams · Deepgram VAD · ElevenLabs",
            diagramSvg: `
                <svg viewBox="0 0 760 140" class="w-100" style="max-height: 140px;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
                        </marker>
                    </defs>
                    <path d="M 115 70 L 165 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 305 70 L 355 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 505 70 L 555 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    
                    <g transform="translate(10, 35)">
                        <rect width="105" height="70" class="arch-node" stroke="#c084fc" />
                        <text x="52" y="32" text-anchor="middle" class="arch-node-text" fill="#c084fc">Twilio Phone/Web</text>
                        <text x="52" y="48" text-anchor="middle" class="arch-node-sub">Bi-directional Audio</text>
                    </g>
                    <g transform="translate(165, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#38bdf8" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#38bdf8">WebSocket Gateway</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">FastAPI Multiplexer</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">VAD Frame Buffer</text>
                    </g>
                    <g transform="translate(355, 35)">
                        <rect width="150" height="70" class="arch-node" stroke="#34d399" />
                        <text x="75" y="30" text-anchor="middle" class="arch-node-text" fill="#34d399">STT + LLM + Tools</text>
                        <text x="75" y="46" text-anchor="middle" class="arch-node-sub">Deepgram + Function Call</text>
                        <text x="75" y="58" text-anchor="middle" class="arch-node-sub">Interruption Handler</text>
                    </g>
                    <g transform="translate(555, 35)">
                        <rect width="135" height="70" class="arch-node" stroke="#f472b6" />
                        <text x="67" y="32" text-anchor="middle" class="arch-node-text" fill="#f472b6">ElevenLabs TTS</text>
                        <text x="67" y="48" text-anchor="middle" class="arch-node-sub">&lt;185ms Audio Stream</text>
                    </g>
                </svg>
            `,
            metrics: [
                { label: "Bidirectional Latency", val: "< 185ms", sub: "Round-trip voice streaming", icon: "fa-bolt text-warning" },
                { label: "VAD Accuracy", val: "99.2%", sub: "Voice activity detection", icon: "fa-microphone text-info" },
                { label: "Barge-in / Interrupt", val: "< 45ms", sub: "Instant buffer flush", icon: "fa-stopwatch text-danger" },
                { label: "Tool Invocation", val: "Async", sub: "Zero-latency audio drop", icon: "fa-code-branch text-accent" }
            ],
            highlights: `
                <ul class="mb-0 ps-3">
                    <li class="mb-1.5"><strong>Ultra-Low Latency Streaming:</strong> Built over raw WebSocket multiplexing connecting Twilio Media Streams to Python asyncio loops.</li>
                    <li class="mb-1.5"><strong>Smart Barge-In Interruption:</strong> Voice Activity Detection (VAD) monitors incoming audio frames continuously, instantly clearing TTS audio queues when the user speaks.</li>
                    <li><strong>Concurrent Function Calling:</strong> Invokes external APIs (e.g. databases, reservation engines) mid-conversation while synthesizing filler audio cues.</li>
                </ul>
            `
        },
        "llama-alignment": {
            title: "LLaMA Alignment Pipeline Specs",
            tag: "Fig. 03 — SFT + Direct Preference Optimization (DPO)",
            footer: "MLX · LoRA · DPO · Hugging Face · Apple Silicon M3 Max",
            diagramSvg: `
                <svg viewBox="0 0 760 140" class="w-100" style="max-height: 140px;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
                        </marker>
                    </defs>
                    <path d="M 125 70 L 175 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 315 70 L 365 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 505 70 L 555 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    
                    <g transform="translate(10, 35)">
                        <rect width="115" height="70" class="arch-node" />
                        <text x="57" y="32" text-anchor="middle" class="arch-node-text">UltraFeedback</text>
                        <text x="57" y="48" text-anchor="middle" class="arch-node-sub">Pairwise Preferences</text>
                    </g>
                    <g transform="translate(175, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#fbbf24" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#fbbf24">SFT Warmup Stage</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">LLaMA 3 Base Weights</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">4-bit LoRA Adapters</text>
                    </g>
                    <g transform="translate(365, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#818cf8" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#818cf8">DPO Loss Engine</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">Implicit Reward (β=0.1)</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">MLX Metal Kernels</text>
                    </g>
                    <g transform="translate(555, 35)">
                        <rect width="145" height="70" class="arch-node" stroke="#34d399" />
                        <text x="72" y="32" text-anchor="middle" class="arch-node-text" fill="#34d399">Aligned LLaMA Model</text>
                        <text x="72" y="48" text-anchor="middle" class="arch-node-sub">42 tokens/sec (M3 Max)</text>
                    </g>
                </svg>
            `,
            metrics: [
                { label: "Training Speed", val: "42 tok/s", sub: "Apple Silicon M3 Max", icon: "fa-bolt text-warning" },
                { label: "Reward Margin", val: "+2.84", sub: "Implicit DPO preference", icon: "fa-chart-line text-success" },
                { label: "Memory Footprint", val: "< 16GB", sub: "Unified memory 4-bit LoRA", icon: "fa-memory text-info" },
                { label: "Convergence Loss", val: "0.142", sub: "1,200 training steps", icon: "fa-check-circle text-accent" }
            ],
            highlights: `
                <ul class="mb-0 ps-3">
                    <li class="mb-1.5"><strong>Apple Silicon MLX Optimization:</strong> Implemented entirely using Apple's MLX array framework, taking full advantage of unified memory bandwidth.</li>
                    <li class="mb-1.5"><strong>Direct Preference Optimization (DPO):</strong> Eliminates separate reward model training by directly optimizing reference and policy log-ratios.</li>
                    <li><strong>Consumer Hardware Alignment:</strong> Enables full 8B model preference alignment on standard workstation hardware under 16GB VRAM.</li>
                </ul>
            `
        },
        "medical-ai": {
            title: "AI Medical Image Analysis Specs",
            tag: "Fig. 04 — Medical MLOps & Vision Transformer Explainability",
            footer: "PyTorch · FastAPI · Grad-CAM · Streamlit · NIH CXR-14 Dataset",
            diagramSvg: `
                <svg viewBox="0 0 760 140" class="w-100" style="max-height: 140px;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
                        </marker>
                    </defs>
                    <path d="M 115 70 L 165 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 305 70 L 355 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 505 70 L 555 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    
                    <g transform="translate(10, 35)">
                        <rect width="105" height="70" class="arch-node" />
                        <text x="52" y="32" text-anchor="middle" class="arch-node-text">Chest X-Ray DICOM</text>
                        <text x="52" y="48" text-anchor="middle" class="arch-node-sub">FastAPI Preprocess</text>
                    </g>
                    <g transform="translate(165, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#38bdf8" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#38bdf8">PyTorch ViT-B/16</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">86.4M Parameters</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">Multi-label Classifier</text>
                    </g>
                    <g transform="translate(355, 35)">
                        <rect width="150" height="70" class="arch-node" stroke="#f43f5e" />
                        <text x="75" y="30" text-anchor="middle" class="arch-node-text" fill="#f43f5e">Grad-CAM Explainer</text>
                        <text x="75" y="46" text-anchor="middle" class="arch-node-sub">Layer 11 Heatmap Map</text>
                        <text x="75" y="58" text-anchor="middle" class="arch-node-sub">14.2ms Generation</text>
                    </g>
                    <g transform="translate(555, 35)">
                        <rect width="135" height="70" class="arch-node" stroke="#34d399" />
                        <text x="67" y="32" text-anchor="middle" class="arch-node-text" fill="#34d399">Streamlit UI</text>
                        <text x="67" y="48" text-anchor="middle" class="arch-node-sub">Radiology Report</text>
                    </g>
                </svg>
            `,
            metrics: [
                { label: "Model AUC / Sensitivity", val: "94.2%", sub: "Tested on NIH CXR-14 dataset", icon: "fa-stethoscope text-danger" },
                { label: "Inference Latency", val: "14.2ms", sub: "Per scan classification", icon: "fa-bolt text-warning" },
                { label: "Model Architecture", val: "86.4M Params", sub: "Vision Transformer ViT-B/16", icon: "fa-brain text-info" },
                { label: "Grad-CAM Resolution", val: "224 x 224", sub: "Pixel-level visual attribution", icon: "fa-eye text-success" }
            ],
            highlights: `
                <ul class="mb-0 ps-3">
                    <li class="mb-1.5"><strong>Explainable Medical AI:</strong> Computes Grad-CAM feature attribution heatmaps to highlight pathological anomalies for radiologist validation.</li>
                    <li class="mb-1.5"><strong>Vision Transformer Backbone:</strong> Uses fine-tuned ViT-B/16 pretrained weights achieving 94.2% AUC across 14 thoracic disease categories.</li>
                    <li><strong>Production MLOps Pipeline:</strong> Fully dockerized FastAPI serving layer connected to Streamlit interactive demonstration interface.</li>
                </ul>
            `
        },
        "rssm-world": {
            title: "RSSM World Model Specs",
            tag: "Fig. 05 — Recurrent State Space Model & Reinforcement Learning",
            footer: "PyTorch · Metal MPS · World Models · Reinforcement Learning · DreamerV2",
            diagramSvg: `
                <svg viewBox="0 0 760 140" class="w-100" style="max-height: 140px;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
                        </marker>
                    </defs>
                    <path d="M 125 70 L 175 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 315 70 L 365 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 505 70 L 555 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    
                    <g transform="translate(10, 35)">
                        <rect width="115" height="70" class="arch-node" />
                        <text x="57" y="32" text-anchor="middle" class="arch-node-text">64x64 Pixels</text>
                        <text x="57" y="48" text-anchor="middle" class="arch-node-sub">CNN Encoder</text>
                    </g>
                    <g transform="translate(175, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#a855f7" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#a855f7">RSSM Latent State</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">Stoch: 30 | Deter: 200</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">Transition Model</text>
                    </g>
                    <g transform="translate(365, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#38bdf8" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#38bdf8">Latent Imagination</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">15 Step Rollouts</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">Actor-Critic Policy</text>
                    </g>
                    <g transform="translate(555, 35)">
                        <rect width="145" height="70" class="arch-node" stroke="#34d399" />
                        <text x="72" y="32" text-anchor="middle" class="arch-node-text" fill="#34d399">MPS Acceleration</text>
                        <text x="72" y="48" text-anchor="middle" class="arch-node-sub">27.4x Speedup vs CPU</text>
                    </g>
                </svg>
            `,
            metrics: [
                { label: "Metal Acceleration", val: "27.4x", sub: "MPS Metal vs CPU training", icon: "fa-bolt text-warning" },
                { label: "Imagination Horizon", val: "15 Steps", sub: "Pure latent trajectory prediction", icon: "fa-compass text-info" },
                { label: "Model Scale", val: "5.2M Params", sub: "Compact world model", icon: "fa-cube text-accent" },
                { label: "Imagination Reward", val: "894.1", sub: "Cheetah domain benchmark", icon: "fa-trophy text-success" }
            ],
            highlights: `
                <ul class="mb-0 ps-3">
                    <li class="mb-1.5"><strong>Recurrent State Space Model (RSSM):</strong> Decomposes state representations into deterministic GRU trajectories and stochastic Categorical latent spaces.</li>
                    <li class="mb-1.5"><strong>In-Latent Policy Training:</strong> Learns optimal control policies purely inside imagined RSSM latent trajectories without interacting with environment simulators.</li>
                    <li><strong>Apple Silicon MPS Kernels:</strong> Custom PyTorch Metal performance shader pipeline delivering a 27.4x acceleration over CPU.</li>
                </ul>
            `
        },
        "gpt-scratch": {
            title: "GPT & Transformers From Scratch Specs",
            tag: "Fig. 06 — First-Principles Autoregressive Transformer Engine",
            footer: "PyTorch · NumPy · Multi-Head Attention · KV-Caching · First Principles",
            diagramSvg: `
                <svg viewBox="0 0 760 140" class="w-100" style="max-height: 140px;" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8"/>
                        </marker>
                    </defs>
                    <path d="M 125 70 L 175 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 315 70 L 365 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    <path d="M 505 70 L 555 70" class="arch-flow-line" marker-end="url(#arrow)" />
                    
                    <g transform="translate(10, 35)">
                        <rect width="115" height="70" class="arch-node" />
                        <text x="57" y="32" text-anchor="middle" class="arch-node-text">Token + Pos Embed</text>
                        <text x="57" y="48" text-anchor="middle" class="arch-node-sub">512 Sequence Window</text>
                    </g>
                    <g transform="translate(175, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#6366f1" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#6366f1">Multi-Head Attention</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">12 Heads / 768 Dim</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">Causal Softmax Mask</text>
                    </g>
                    <g transform="translate(365, 35)">
                        <rect width="140" height="70" class="arch-node" stroke="#10b981" />
                        <text x="70" y="30" text-anchor="middle" class="arch-node-text" fill="#10b981">KV-Cache Layer</text>
                        <text x="70" y="46" text-anchor="middle" class="arch-node-sub">Autoregressive Sampling</text>
                        <text x="70" y="58" text-anchor="middle" class="arch-node-sub">4.2x Latency Speedup</text>
                    </g>
                    <g transform="translate(555, 35)">
                        <rect width="145" height="70" class="arch-node" stroke="#38bdf8" />
                        <text x="72" y="32" text-anchor="middle" class="arch-node-text" fill="#38bdf8">FeedForward + Norm</text>
                        <text x="72" y="48" text-anchor="middle" class="arch-node-sub">Logit Probability Gen</text>
                    </g>
                </svg>
            `,
            metrics: [
                { label: "KV-Cache Speedup", val: "4.2x", sub: "Inference latency reduction", icon: "fa-bolt text-warning" },
                { label: "Attention Heads", val: "12 Heads", sub: "Scaled dot-product attention", icon: "fa-network-wired text-info" },
                { label: "Context Window", val: "512 Tokens", sub: "Learned positional embeddings", icon: "fa-layer-group text-accent" },
                { label: "Autograd Accuracy", val: "Exact", sub: "Verified against PyTorch GPT-2", icon: "fa-check-double text-success" }
            ],
            highlights: `
                <ul class="mb-0 ps-3">
                    <li class="mb-1.5"><strong>First-Principles Implementation:</strong> Constructed entire transformer architecture using standard PyTorch tensor math without high-level nn.Transformer modules.</li>
                    <li class="mb-1.5"><strong>Key-Value (KV) Caching:</strong> Implemented KV-caching for efficient autoregressive sequence generation, reducing redundant self-attention computation by 4.2x.</li>
                    <li><strong>Multi-Head Masking:</strong> Verified numerical stability across scaled dot-product attention scores and causal triangular softmax masks.</li>
                </ul>
            `
        }
    };

    function getModal() {
        return document.getElementById('arch-specs-modal');
    }

    function openModal(projectId) {
        const modal = getModal();
        const data = specsData[projectId];
        if (!modal || !data) return;

        const title = document.getElementById('arch-modal-title');
        const tag = document.getElementById('arch-modal-tag');
        const footerInfo = document.getElementById('arch-modal-footer-info');
        const diagram = document.getElementById('arch-modal-diagram');
        const highlights = document.getElementById('arch-modal-highlights');
        const metricsContainer = document.getElementById('arch-modal-metrics');

        if (title) title.textContent = data.title;
        if (tag) tag.textContent = data.tag;
        if (footerInfo) footerInfo.textContent = data.footer;
        if (diagram) diagram.innerHTML = data.diagramSvg;
        if (highlights) highlights.innerHTML = data.highlights;

        if (metricsContainer) {
            metricsContainer.innerHTML = data.metrics.map(m => `
                <div class="col-6 col-md-3">
                    <div class="arch-metric-card h-100">
                        <div class="d-flex align-items-center gap-1.5 text-muted text-3xs mb-1">
                            <i class="fas ${m.icon}"></i> <span>${m.label}</span>
                        </div>
                        <div class="arch-metric-val font-mono">${m.val}</div>
                        <div class="text-3xs text-muted/80 mt-1">${m.sub}</div>
                    </div>
                </div>
            `).join('');
        }

        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = getModal();
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.arch-specs-btn, .arch-specs-link');
        if (trigger) {
            e.preventDefault();
            const projectId = trigger.getAttribute('data-project');
            openModal(projectId);
            return;
        }

        const closeTrigger = e.target.closest('#arch-specs-close, #arch-modal-close-btn');
        if (closeTrigger) {
            e.preventDefault();
            closeModal();
            return;
        }

        const modal = getModal();
        if (modal && e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = getModal();
            if (modal && modal.classList.contains('active')) {
                closeModal();
            }
        }
    });
})();

// --- 22. Nexus Graph Interactive Canvas Controller ---
(function initNexusGraphCanvas() {
    const canvas = document.getElementById('nexus-graph-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let width = 0;
    let height = 0;

    function resize() {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    const nodes = [
        { label: "PDF Doc", x: 0.15, y: 0.5, r: 16, color: "#818cf8" },
        { label: "Chunking", x: 0.32, y: 0.3, r: 14, color: "#38bdf8" },
        { label: "Entity Extraction", x: 0.35, y: 0.7, r: 15, color: "#c084fc" },
        { label: "Vector DB", x: 0.55, y: 0.35, r: 18, color: "#34d399" },
        { label: "Knowledge Graph", x: 0.62, y: 0.72, r: 20, color: "#f472b6" },
        { label: "Cytoscape.js", x: 0.84, y: 0.5, r: 16, color: "#fbbf24" }
    ];

    const edges = [
        [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5]
    ];

    let mouseX = -1000;
    let mouseY = -1000;
    let hoveredNode = null;

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    let time = 0;
    function render() {
        time += 0.03;
        ctx.clearRect(0, 0, width, height);

        hoveredNode = null;
        nodes.forEach((node, idx) => {
            const baseX = node.x * width;
            const baseY = node.y * height;
            
            const floatX = Math.sin(time + idx) * 4;
            const floatY = Math.cos(time * 0.8 + idx) * 4;
            
            let curX = baseX + floatX;
            let curY = baseY + floatY;

            const dx = mouseX - curX;
            const dy = mouseY - curY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 45) {
                hoveredNode = node;
                curX += (dx / dist) * (45 - dist) * 0.3;
                curY += (dy / dist) * (45 - dist) * 0.3;
            }

            node.renderX = curX;
            node.renderY = curY;
        });

        edges.forEach(([i, j]) => {
            const n1 = nodes[i];
            const n2 = nodes[j];

            ctx.beginPath();
            ctx.moveTo(n1.renderX, n1.renderY);
            ctx.lineTo(n2.renderX, n2.renderY);
            ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            const pulseProgress = (time * 0.8 + i) % 1;
            const px = n1.renderX + (n2.renderX - n1.renderX) * pulseProgress;
            const py = n1.renderY + (n2.renderY - n1.renderY) * pulseProgress;

            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#38bdf8';
            ctx.fill();
        });

        nodes.forEach(node => {
            const isHovered = (hoveredNode === node);
            ctx.beginPath();
            ctx.arc(node.renderX, node.renderY, isHovered ? node.r + 3 : node.r, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? node.color : 'rgba(15, 23, 42, 0.9)';
            ctx.strokeStyle = node.color;
            ctx.lineWidth = isHovered ? 2.5 : 1.5;
            ctx.fill();
            ctx.stroke();

            ctx.font = '500 8.5px "JetBrains Mono", monospace';
            ctx.fillStyle = isHovered ? '#ffffff' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.fillText(node.label, node.renderX, node.renderY + node.r + 10);
        });

        animationFrameId = requestAnimationFrame(render);
    }

    render();
})();

// --- 23. Real-Time Voice AI Agent Interactive Streaming Architecture Canvas Controller (Silent) ---
(function initVoiceAiPlayer() {
    const playBtn = document.getElementById('voice-ai-play-btn');
    const playIcon = document.getElementById('voice-play-icon');
    const playText = document.getElementById('voice-play-text');
    const waveformCanvas = document.getElementById('voice-waveform-canvas');
    const transcriptBox = document.getElementById('voice-transcript-box');

    if (!playBtn || !waveformCanvas || !transcriptBox) return;

    const ctx = waveformCanvas.getContext('2d');
    let isSimulating = false;
    let animFrame = null;
    let startTime = 0;

    const telemetryLogs = [
        { t: 0.2, text: '<span class="text-accent font-semibold">[0.2s] Twilio WebSocket Stream connected</span> (185ms roundtrip)' },
        { t: 0.9, text: '<span class="text-purple-400 font-semibold">[0.9s] Deepgram VAD:</span> Audio chunk received (16kHz PCM)' },
        { t: 1.6, text: '<span class="text-amber-400 font-semibold">[1.6s] Agent Engine:</span> Executing SQL tool <span class="text-accent font-mono">check_inventory()</span>...' },
        { t: 2.3, text: '<span class="text-emerald-400 font-semibold">[2.3s] Tool Output:</span> Table #14 reserved at Bistro for 7:00 PM.' },
        { t: 3.1, text: '<span class="text-purple-400 font-semibold">[3.1s] FastTTS Stream:</span> Generating bidirectional audio response...' },
        { t: 4.2, text: '<span class="text-emerald-400 font-semibold">[4.2s] Stream complete. Zero audio dropouts detected.</span>' }
    ];

    function resizeCanvas() {
        if (!waveformCanvas.parentElement) return;
        const rect = waveformCanvas.parentElement.getBoundingClientRect();
        waveformCanvas.width = rect.width;
        waveformCanvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const stages = [
        { name: "Twilio WS", icon: "☎" },
        { name: "Deepgram VAD", icon: "🎙" },
        { name: "FastAPI Agent", icon: "⚡" },
        { name: "TTS Stream", icon: "🔊" }
    ];

    function render() {
        time += isSimulating ? 0.04 : 0.015;
        ctx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);

        const width = waveformCanvas.width;
        const height = waveformCanvas.height;
        const margin = 40;
        const spacing = (width - margin * 2) / (stages.length - 1);
        const stageY = height / 2;

        stages.forEach((_, i) => {
            if (i < stages.length - 1) {
                const x1 = margin + i * spacing;
                const x2 = margin + (i + 1) * spacing;

                ctx.beginPath();
                ctx.moveTo(x1, stageY);
                ctx.lineTo(x2, stageY);
                ctx.strokeStyle = isSimulating ? 'rgba(129, 140, 248, 0.5)' : 'rgba(129, 140, 248, 0.2)';
                ctx.lineWidth = isSimulating ? 2.5 : 1.5;
                ctx.stroke();

                const packetT = (time * 1.8 + i * 0.3) % 1;
                const px = x1 + packetT * (x2 - x1);
                ctx.beginPath();
                ctx.arc(px, stageY, isSimulating ? 3.5 : 2, 0, Math.PI * 2);
                ctx.fillStyle = isSimulating ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)';
                ctx.fill();

                const backPacketT = (1 - (time * 1.5 + i * 0.25) % 1);
                const bpx = x1 + backPacketT * (x2 - x1);
                ctx.beginPath();
                ctx.arc(bpx, stageY, isSimulating ? 3 : 1.5, 0, Math.PI * 2);
                ctx.fillStyle = isSimulating ? '#a855f7' : 'rgba(168, 85, 247, 0.3)';
                ctx.fill();
            }
        });

        stages.forEach((st, idx) => {
            const x = margin + idx * spacing;

            if (isSimulating) {
                const pulseR = 14 + Math.sin(time * 4 + idx) * 3;
                ctx.beginPath();
                ctx.arc(x, stageY, pulseR, 0, Math.PI * 2);
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(x, stageY, 10, 0, Math.PI * 2);
            ctx.fillStyle = isSimulating ? '#1e1b4b' : '#0f172a';
            ctx.strokeStyle = isSimulating ? '#818cf8' : 'rgba(129, 140, 248, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.fill();
            ctx.stroke();

            ctx.font = '500 8.5px "JetBrains Mono", monospace';
            ctx.fillStyle = isSimulating ? '#ffffff' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.fillText(st.name, x, stageY + 22);

            ctx.font = '9px sans-serif';
            ctx.fillText(st.icon, x, stageY + 3);
        });

        requestAnimationFrame(render);
    }

    function updateSimulation() {
        if (!isSimulating) return;

        const elapsed = (Date.now() - startTime) / 1000;
        const currentLogs = telemetryLogs.filter(l => elapsed >= l.t);
        if (currentLogs.length > 0) {
            transcriptBox.innerHTML = currentLogs.map(l => `<div class="mb-0.5">${l.text}</div>`).join('');
            transcriptBox.scrollTop = transcriptBox.scrollHeight;
        }

        if (elapsed < 4.8) {
            animFrame = requestAnimationFrame(updateSimulation);
        } else {
            stopSimulation();
        }
    }

    function startSimulation() {
        isSimulating = true;
        startTime = Date.now();
        if (playIcon) playIcon.className = 'fas fa-stop me-1 text-danger';
        if (playText) playText.textContent = 'Stop Stream Flow';
        updateSimulation();
    }

    function stopSimulation() {
        isSimulating = false;
        if (animFrame) cancelAnimationFrame(animFrame);
        if (playIcon) playIcon.className = 'fas fa-play me-1 text-accent';
        if (playText) playText.textContent = 'Simulate Stream Flow';
    }

    playBtn.addEventListener('click', () => {
        if (isSimulating) stopSimulation();
        else startSimulation();
    });

    render();
})();

// --- 24. GPT Transformer Multi-Head Attention Canvas Controller ---
(function initAttentionMatrixCanvas() {
    const canvas = document.getElementById('attention-matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    const tokens = ["The", "transformer", "model", "uses", "attention", "KV-cache"];
    let hoveredIdx = -1;
    let mouseX = -1000;
    let mouseY = -1000;

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
        hoveredIdx = -1;
    });

    let time = 0;
    function render() {
        time += 0.02;
        ctx.clearRect(0, 0, width, height);

        const margin = 35;
        const spacing = (width - margin * 2) / (tokens.length - 1);
        const topY = 22;
        const botY = height - 22;

        hoveredIdx = -1;
        tokens.forEach((_, idx) => {
            const tx = margin + idx * spacing;
            const dx = mouseX - tx;
            const dy = mouseY - (topY + botY) / 2;
            if (Math.abs(dx) < spacing * 0.45 && Math.abs(dy) < 45) {
                hoveredIdx = idx;
            }
        });

        tokens.forEach((_, i) => {
            tokens.forEach((_, j) => {
                const x1 = margin + i * spacing;
                const x2 = margin + j * spacing;
                const weight = Math.max(0.1, Math.sin(time + i * 0.7 + j * 0.9) * 0.5 + 0.5);
                const isHovered = (hoveredIdx === i || hoveredIdx === j);

                if (isHovered || (i === 1 && j === 4) || (i === 4 && j === 5) || (i === 0 && j === 2)) {
                    ctx.beginPath();
                    ctx.moveTo(x1, topY + 10);
                    const controlY = topY + (botY - topY) / 2 + (i - j) * 6;
                    ctx.quadraticCurveTo((x1 + x2) / 2, controlY, x2, botY - 10);
                    
                    ctx.strokeStyle = isHovered ? '#818cf8' : 'rgba(129, 140, 248, 0.25)';
                    ctx.lineWidth = isHovered ? (weight * 2 + 1) : 1;
                    ctx.stroke();

                    if (isHovered) {
                        const t = (time * 1.5 + i * 0.2) % 1;
                        const px = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * ((x1 + x2) / 2) + t * t * x2;
                        const py = (1 - t) * (1 - t) * (topY + 10) + 2 * (1 - t) * t * controlY + t * t * (botY - 10);
                        
                        ctx.beginPath();
                        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
                        ctx.fillStyle = '#38bdf8';
                        ctx.fill();
                    }
                }
            });
        });

        tokens.forEach((tok, idx) => {
            const x = margin + idx * spacing;
            const isHov = (hoveredIdx === idx);

            ctx.fillStyle = isHov ? 'rgba(129, 140, 248, 0.35)' : 'rgba(15, 23, 42, 0.85)';
            ctx.strokeStyle = isHov ? '#38bdf8' : 'rgba(129, 140, 248, 0.4)';
            ctx.lineWidth = isHov ? 2 : 1;

            ctx.beginPath();
            ctx.roundRect(x - 22, topY - 9, 44, 18, 4);
            ctx.fill();
            ctx.stroke();

            ctx.font = '500 8.5px "JetBrains Mono", monospace';
            ctx.fillStyle = isHov ? '#ffffff' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.fillText(tok, x, topY + 3);

            ctx.beginPath();
            ctx.roundRect(x - 22, botY - 9, 44, 18, 4);
            ctx.fill();
            ctx.stroke();

            ctx.fillText(tok, x, botY + 3);
        });

        requestAnimationFrame(render);
    }

    render();
})();

// --- 25. RSSM World Model Latent Trajectory Dreaming Canvas Controller ---
(function initRssmDreamCanvas() {
    const canvas = document.getElementById('rssm-dream-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    let isHovered = false;
    canvas.parentElement.addEventListener('mouseenter', () => { isHovered = true; });
    canvas.parentElement.addEventListener('mouseleave', () => { isHovered = false; });

    let time = 0;
    const numNodes = 10;

    function render() {
        const speed = isHovered ? 0.05 : 0.02;
        time += speed;
        ctx.clearRect(0, 0, width, height);

        const margin = 25;
        const spacing = (width - margin * 2) / (numNodes - 1);
        const baselineY = height * 0.65;

        // Draw Imagined Latent Terrain Curve
        ctx.beginPath();
        ctx.moveTo(0, baselineY);
        for (let x = 0; x <= width; x += 5) {
            const y = baselineY + Math.sin(x * 0.02 + time * 2) * 12 + Math.cos(x * 0.01 - time) * 6;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.fill();

        // Terrain Edge Line
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
            const y = baselineY + Math.sin(x * 0.02 + time * 2) * 12 + Math.cos(x * 0.01 - time) * 6;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isHovered ? '#10b981' : 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = isHovered ? 2 : 1.2;
        ctx.stroke();

        // Draw Stochastic State Nodes (z_t gaussian latent states)
        for (let i = 0; i < numNodes; i++) {
            const nx = margin + i * spacing;
            const ny = baselineY + Math.sin(nx * 0.02 + time * 2) * 12 + Math.cos(nx * 0.01 - time) * 6 - 22;

            // Gaussian Variance Ring
            const ringRadius = 6 + Math.sin(time * 3 + i) * 3;
            ctx.beginPath();
            ctx.arc(nx, ny, ringRadius, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Core Latent Node
            ctx.beginPath();
            ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? '#34d399' : '#10b981';
            ctx.fill();

            // Label z_t
            ctx.font = '400 7px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
            ctx.textAlign = 'center';
            ctx.fillText(`z_${i+1}`, nx, ny - 10);
        }

        // Draw Animated Agent Torso / Trajectory Runner
        const runnerProgress = (time * 0.35) % 1;
        const rx = margin + runnerProgress * (width - margin * 2);
        const ry = baselineY + Math.sin(rx * 0.02 + time * 2) * 12 + Math.cos(rx * 0.01 - time) * 6 - 14;

        // Glowing Agent Core
        ctx.beginPath();
        ctx.arc(rx, ry, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Action Vector Arrows (a_t)
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 14, ry - 6);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.font = '600 7.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('a_t', rx + 18, ry - 8);

        requestAnimationFrame(render);
    }

    render();
})();

// --- 26. LLaMA Alignment DPO Implicit Reward Canvas Controller ---
(function initDpoRewardCanvas() {
    const canvas = document.getElementById('dpo-reward-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    let isHovered = false;
    canvas.parentElement.addEventListener('mouseenter', () => { isHovered = true; });
    canvas.parentElement.addEventListener('mouseleave', () => { isHovered = false; });

    let time = 0;
    function render() {
        time += 0.025;
        ctx.clearRect(0, 0, width, height);

        const margin = 30;
        const baselineY = height - 20;
        const curveW = width - margin * 2;

        ctx.beginPath();
        ctx.moveTo(margin, 15);
        ctx.lineTo(margin, baselineY);
        ctx.lineTo(width - margin, baselineY);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        const chosenPeakX = margin + curveW * 0.72 + Math.sin(time) * 4;
        for (let x = margin; x <= width - margin; x += 3) {
            const dist = (x - chosenPeakX) / 32;
            const y = baselineY - Math.exp(-dist * dist) * (height * 0.62);
            if (x === margin) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(245, 158, 11, 0.12)';
        ctx.lineTo(width - margin, baselineY);
        ctx.lineTo(margin, baselineY);
        ctx.fill();

        ctx.beginPath();
        const rejectedPeakX = margin + curveW * 0.32 - Math.sin(time) * 3;
        for (let x = margin; x <= width - margin; x += 3) {
            const dist = (x - rejectedPeakX) / 32;
            const y = baselineY - Math.exp(-dist * dist) * (height * 0.48);
            if (x === margin) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(192, 132, 252, 0.1)';
        ctx.lineTo(width - margin, baselineY);
        ctx.lineTo(margin, baselineY);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(rejectedPeakX + 15, height * 0.42);
        ctx.lineTo(chosenPeakX - 15, height * 0.42);
        ctx.strokeStyle = isHovered ? '#38bdf8' : 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '600 8px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText('Δ Reward = +2.84', (chosenPeakX + rejectedPeakX) / 2, height * 0.38);

        ctx.font = '500 7.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Chosen (y_w)', chosenPeakX, height * 0.2);

        ctx.fillStyle = '#c084fc';
        ctx.fillText('Rejected (y_l)', rejectedPeakX, height * 0.32);

        requestAnimationFrame(render);
    }

    render();
})();

// --- 27. AI Medical Chest X-Ray ViT Grad-CAM Canvas Controller ---
(function initMedicalGradcamCanvas() {
    const canvas = document.getElementById('medical-gradcam-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    function resize() {
        if (!canvas.parentElement) return;
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
    }
    resize();
    window.addEventListener('resize', resize);

    let mouseX = width * 0.62;
    let mouseY = height * 0.5;

    canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    let time = 0;
    function render() {
        time += 0.02;
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;

        ctx.beginPath();
        ctx.ellipse(cx - 38, cy, 26, 36, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + 38, cy, 26, 36, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy - 42);
        ctx.lineTo(cx, cy + 42);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let r = -30; r <= 30; r += 12) {
            ctx.beginPath();
            ctx.moveTo(cx - 36, cy + r);
            ctx.quadraticCurveTo(cx - 10, cy + r - 4, cx, cy + r + 2);
            ctx.quadraticCurveTo(cx + 10, cy + r - 4, cx + 36, cy + r);
            ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        const targetX = mouseX > 0 && mouseX < width ? mouseX : cx + 32 + Math.sin(time) * 8;
        const targetY = mouseY > 0 && mouseY < height ? mouseY : cy + 12 + Math.cos(time) * 6;

        const grad = ctx.createRadialGradient(targetX, targetY, 2, targetX, targetY, 32);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
        grad.addColorStop(0.4, 'rgba(245, 158, 11, 0.6)');
        grad.addColorStop(0.75, 'rgba(16, 185, 129, 0.3)');
        grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.beginPath();
        ctx.arc(targetX, targetY, 32, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.rect(targetX - 22, targetY - 22, 44, 44);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.font = '600 8px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'left';
        ctx.fillText('ViT BBox: 94.2%', targetX + 25, targetY - 10);

        requestAnimationFrame(render);
    }

    render();
})();


