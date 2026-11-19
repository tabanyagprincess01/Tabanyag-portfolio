

const SITE = {
    name: "Princess Tabanyag",
    email: "tabanyagprincess01@gmail.com",
    phone: "09358541312",
    location: "Imus,Cavite, Philippines",
    roles: ["Student Developer", "Aspiring Web Designer", "Canva Designer"],
    skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL / MariaDB", "GDScript (Godot)", "Arduino"]
};

const PROJECTS = [
    {
        title: "Library System",
        short: "A PHP and XAMPP library management system with an admin dashboard and RFID-based student records.",
        details: "A library management system built with PHP and XAMPP. It has an admin dashboard and uses RFID cards to identify students and keep their records.",
        tags: ["PHP", "XAMPP", "MySQL", "RFID"],
        link: ""   // paste a GitHub or demo link here
    },
    {
        title: "3D Library Map",
        short: "A Godot prototype of a rotatable 3D library map with clickable shelves, connected to a database.",
        details: "A 3D map of the library made in Godot. You can rotate the map, click a shelf to see what it holds, and follow an arrow to the entrance. It reads its data from a MariaDB database.",
        tags: ["Godot", "GDScript", "MariaDB", "Blender"],
        link: ""
    },
    {
        title: "CLINICARE",
        short: "A web-based clinic system for visit logging, inventory, reporting and online medical requirement submission.",
        details: "A web-based system for a school clinic. Staff can log visits, track inventory and create reports, and students can submit their medical requirements online.",
        tags: ["Web app", "Inventory", "Reports"],
        link: ""
    }
];

const CERTIFICATES = [
    {
        title: "Networking and Data Security",
        short: "Certificate of Participation for a 1hr 30min online webinar on networking and data security.",
        details: "Awarded for successfully participating in a 1hr 30min online webinar via Google Meet on September 16, 2026, organized by Ethel Programming Computer Programming Services.",
        issuer: "Ethel Programming Computer Programming Services",
        date: "September 16, 2026",
        image: "images/EPCPS-16.png",
        tags: ["Networking", "Data Security", "Webinar"]
    },
    {
        title: "Next-Gen Networkers: CompTIA Network and Security",
        short: "Certificate of Appreciation for a 1hr online webinar on CompTIA Network and Security.",
        details: "Awarded for active involvement and contribution to the success of a 1hr online webinar via Google Meet on September 18, 2026, organized by Ethel Programming Computer Programming Services.",
        issuer: "Ethel Programming Computer Programming Services",
        date: "September 18, 2026",
        image: "images/EPCPS-21.png",
        tags: ["CompTIA", "Network", "Security", "Webinar"]
    }
];




const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


document.title = SITE.name + " | Portfolio";
$("#logoName").textContent = SITE.name;
document.querySelector(".your-name").textContent = SITE.name;
document.querySelector(".your-name-footer").textContent = SITE.name;
$("#emailLink").textContent = SITE.email;
$("#emailLink").href = "mailto:" + SITE.email;
$("#phoneLink").textContent = SITE.phone;
$("#phoneLink").href = "tel:" + SITE.phone.replace(/[^\d+]/g, "");
$("#locationText").textContent = SITE.location;
$("#year").textContent = new Date().getFullYear();


$("#skills").innerHTML = SITE.skills
    .map((s) => `<p class="skill"><svg aria-hidden="true"><use href="#flower"/></svg>${escapeHtml(s)}</p>`)
    .join("");


function renderCards(list, container, kind) {
    container.innerHTML = "";
    list.forEach((item, i) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "project-card";
        card.innerHTML = `<h2>${escapeHtml(item.title)}</h2>
            <p>${escapeHtml(item.short)}</p>
            <span class="card-more">Read more</span>`;
        card.addEventListener("click", () => openDialog(item, kind));
        container.appendChild(card);
    });
}
renderCards(PROJECTS, $("#projectList"), "project");
renderCards(CERTIFICATES, $("#certList"), "certificate");


const dialog = $("#detailDialog");

function openDialog(item, kind) {
    $("#dialogTitle").textContent = item.title;
    $("#dialogMeta").textContent =
        kind === "certificate" ? [item.issuer, item.date].filter(Boolean).join(" • ") : "";
    $("#dialogMeta").hidden = kind !== "certificate";
    $("#dialogText").textContent = item.details;
    $("#dialogTags").innerHTML = (item.tags || []).map((t) => `<span>${escapeHtml(t)}</span>`).join("");

    const img = $("#dialogImage");
    if (item.image) {
        img.src = item.image;
        img.alt = item.title + " certificate";
        img.hidden = false;
        img.onerror = () => { img.hidden = true; };
    } else {
        img.hidden = true;
    }

    const link = $("#dialogLink");
    if (item.link) {
        link.href = item.link;
        link.textContent = kind === "certificate" ? "View Certificate" : "Open Project";
        link.hidden = false;
    } else {
        link.hidden = true;
    }
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
}

$("#dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => {

    const r = dialog.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) dialog.close();
});


const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
menuToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });


const links = [...navLinks.querySelectorAll("a")];

function updateActive() {
    let current = "home";
    const y = window.scrollY + 120;
    document.querySelectorAll("section[id]").forEach((sec) => {
        if (sec.offsetTop <= y) current = sec.id;
    });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}

const toTop = $("#toTop");
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

window.addEventListener("scroll", () => {
    updateActive();
    toTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
updateActive();


(function typing() {
    const el = $("#typed");
    if (reduceMotion) { el.textContent = SITE.roles[0]; return; }
    let role = 0, char = 0, deleting = false;

    function tick() {
        const word = SITE.roles[role];
        el.textContent = word.slice(0, char);
        let delay = deleting ? 45 : 90;

        if (!deleting && char === word.length) { deleting = true; delay = 1600; }
        else if (deleting && char === 0) { deleting = false; role = (role + 1) % SITE.roles.length; delay = 350; }
        else char += deleting ? -1 : 1;

        setTimeout(tick, delay);
    }
    tick();
})();


const form = $("#contactForm");
const formStatus = $("#formStatus");

function setError(id, input, msg) {
    $(id).textContent = msg;
    input.classList.toggle("invalid", Boolean(msg));
    input.setAttribute("aria-invalid", msg ? "true" : "false");
}

function validate() {
    const name = $("#cName"), email = $("#cEmail"), msg = $("#cMessage");
    let ok = true;

    if (name.value.trim().length < 2) { setError("#errName", name, "Please enter your name."); ok = false; }
    else setError("#errName", name, "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError("#errEmail", email, "Please enter a valid email address."); ok = false; }
    else setError("#errEmail", email, "");

    if (msg.value.trim().length < 10) { setError("#errMessage", msg, "Your message should be at least 10 characters."); ok = false; }
    else setError("#errMessage", msg, "");

    return ok;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    if (!validate()) return;

    const subject = encodeURIComponent("Portfolio message from " + $("#cName").value.trim());
    const body = encodeURIComponent(
        $("#cMessage").value.trim() + "\n\n— " + $("#cName").value.trim() + " (" + $("#cEmail").value.trim() + ")"
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    formStatus.textContent = "Your email app is opening with your message. Press send there to finish.";
    form.reset();
});

["#cName", "#cEmail", "#cMessage"].forEach((id) => {
    $(id).addEventListener("input", () => { if ($(id).classList.contains("invalid")) validate(); });
});


(function petals() {
    const canvas = $("#petals");
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    const colors = ["#E7A8C9", "#F6DDEB", "#D9C3F0", "#FFFFFF"];
    let w, h, list = [], running = true;

    function resize() {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
    }

    function make(initial) {
        return {
            x: Math.random() * w,
            y: initial ? Math.random() * h : -20,
            size: 6 + Math.random() * 9,
            speed: 0.4 + Math.random() * 0.8,
            sway: Math.random() * Math.PI * 2,
            swaySpeed: 0.01 + Math.random() * 0.02,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.03,
            color: colors[Math.floor(Math.random() * colors.length)]
        };
    }

    function init() {
        resize();
        const count = Math.max(10, Math.min(26, Math.round(w / 55)));
        list = Array.from({ length: count }, () => make(true));
    }

    function draw() {
        if (running) {
            ctx.clearRect(0, 0, w, h);
            list.forEach((p, i) => {
                p.y += p.speed;
                p.sway += p.swaySpeed;
                p.x += Math.sin(p.sway) * 0.6;
                p.rot += p.rotSpeed;
                if (p.y > h + 20) list[i] = make(false);

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.85;
                ctx.beginPath();
                ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }
        requestAnimationFrame(draw);
    }

    
    new IntersectionObserver(([entry]) => { running = entry.isIntersecting; }).observe(canvas);
    document.addEventListener("visibilitychange", () => { running = !document.hidden; });
    window.addEventListener("resize", init);
    init();
    draw();
})();


function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
