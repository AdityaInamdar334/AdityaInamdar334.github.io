
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
            this.color = Math.random() > 0.4 ? 'rgba(245, 158, 11,' : 'rgba(129, 140, 248,';
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
                    const opacity = (1 - dist / 130) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
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
    const icon = document.getElementById('audio-icon');
    const text = document.getElementById('audio-status-text');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            if (audioEnabled) {
                if (icon) icon.className = 'fas fa-volume-up text-accent';
                if (text) text.textContent = 'Audio: On';
            } else {
                if (icon) icon.className = 'fas fa-volume-mute text-muted';
                if (text) text.textContent = 'Audio: Off';
            }
        });
    }

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

