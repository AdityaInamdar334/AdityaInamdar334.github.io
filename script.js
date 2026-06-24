
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
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursorGlow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });

    // 3. Navbar Class Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = '';
            navbar.style.boxShadow = '';
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
            "experience": "Aditya has over 4 years of experience. Currently, he is a Forward Deployed Engineer Intern at Mainly.ai. He has also worked as a Graduate Assistant at Felician University, an Application Developer Intern at ISKCON, and a GSoC '23 Developer at Google.",
            "skills": "Aditya's technical skills include Python, Java, JavaScript, React, Node.js, TensorFlow, PyTorch, AWS, Google Cloud, Docker, and Kubernetes.",
            "projects": "Aditya's featured projects, including the Hierarchical Reasoning Model, Transformer from Scratch, and Vision Transformer, were all developed during his time at Mainly.ai. Check out the Projects section for more details!",
            "contact": "You can reach Aditya via email at inamdara@students.felician.edu or by phone at +1 (862) 238-0508.",
            "education": "Aditya is currently pursuing an MS in Computer Science at Felician University (exp. May 2026). He holds a BTech in CSE from MIT Pune (May 2024).",
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
