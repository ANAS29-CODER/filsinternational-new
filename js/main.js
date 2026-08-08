(function () {
  "use strict";

  document.documentElement.classList.add("has-js");

  const body = document.body;
  const hero = document.querySelector(".hero");
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".page-progress span");
  const navToggle = document.querySelector(".nav-toggle");
  const navPanel = document.querySelector(".nav-panel");
  const navClose = document.querySelector("[data-nav-close]");
  const menuBackdrop = document.querySelector("[data-menu-backdrop]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const languageSwitch = document.querySelector("[data-language-switch]");
  const languageLabel = document.querySelector("[data-language-label]");
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const originalMetadata = {
    title: document.title,
    description: metaDescription?.content || "",
    ogTitle: ogTitle?.content || "",
    ogDescription: ogDescription?.content || ""
  };

  const englishGroups = [
    { selector: ".skip-link", values: ["Skip to content"] },
    { selector: ".nav-links a", values: ["Experience", "Benefits", "Plans", "About Fils", "FAQ"] },
    { selector: ".nav-contact", values: ["Contact us"] },
    { selector: ".nav-cta", values: ["Get it on Google Play"] },
    { selector: ".hero-copy > .eyebrow", values: ['<span class="live-dot"></span>Kuwaiti e-commerce mall for smarter commerce'] },
    { selector: ".hero-copy h1", values: ["Your whole business,<br><span>in your pocket.</span>"] },
    { selector: ".hero-lead", values: ["From your first listing to your first auction, Fils is an e-commerce mall that brings your storefront, live selling, payments and delivery into one experience built to grow."] },
    { selector: ".float-card small", values: ["Live auction", "Your store"] },
    { selector: ".float-card strong", values: ["Bidding now", "Built to grow"] },
    { selector: ".hero-actions .button", values: ['Get it on Google Play <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>', 'See the experience <span class="play-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5V7Z"/></svg></span>'] },
    { selector: ".store-button small", values: ["Download on", "Get it on"] },
    { selector: ".price:not(.price-custom) > span", values: ['KWD <small data-period> / month</small>', 'KWD <small data-period> / month</small>'] },
    { selector: ".proof-copy > span", values: ["Launched in Kuwait", "Languages in one platform", "Available now", "Final-sale commission"] },
    { selector: ".tour-swipe-hint", values: ["Swipe or tap for the next step"] },
    { selector: "#experience .section-heading .eyebrow", values: ["Inside the Fils experience"] },
    { selector: "#experience .section-heading h2", values: ["One app. <span>Three ways to grow.</span>"] },
    { selector: "#experience .section-heading p", values: ["Explore the Fils journey as customers and merchants see it—from managing a store to winning an auction."] },
    { selector: ".tour-tab strong", values: ["Your store, your name", "Transparent auctions", "Live selling"] },
    { selector: ".tour-tab small", values: ["Products, subscriptions and flexible management in one place.", "Interactive rooms, clear timing and organized rules for everyone.", "Show the product, engage the audience and close sales in real time."] },
    { selector: "#solutions .split-heading .eyebrow", values: ["An e-commerce mall, not just a storefront"] },
    { selector: "#solutions .split-heading h2", values: ["Everything commerce needs,<br><span>connected.</span>"] },
    { selector: "#solutions .split-heading > p", values: ["An e-commerce mall that connects the customer experience with merchant tools and turns each interaction into an opportunity to sell or grow."] },
    { selector: ".card-kicker", values: ["01 / YOUR STORE", "02 / AUCTIONS", "03 / TRANSACTIONS", "04 / REACH", "05 / DELIVERY"] },
    { selector: ".bento-card h3", values: ["A professional storefront<br>without building a new app", "Organized auctions.<br>Clear rules.", "Simpler payments,<br>stronger trust", "Five languages.<br>Commerce without barriers.", "From your store to the customer’s door"] },
    { selector: ".bento-card p", values: ["Present products, photos and videos under your brand, with management, payment and delivery tools built in.", "Timed and live auctions in one organized experience built on clarity and trust.", "Supported payment channels and a clear transaction record for every party.", "A multilingual interface brings merchants and customers closer across local and regional markets.", "Flexible delivery across Kuwait, right to the customer’s door."] },
    { selector: ".bento-copy a", values: ['Choose your plan <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'] },
    { selector: ".payment-chip span", values: ["Digital payments"] },
    { selector: ".payment-chip strong", values: ["Clear steps"] },
    { selector: ".audiences-section .section-heading .eyebrow", values: ["Fils for every buying and selling journey"] },
    { selector: ".audiences-section .section-heading h2", values: ["Designed for you, <span>whatever your role.</span>"] },
    { selector: ".audience-label", values: ["FOR SHOPPERS AND INDIVIDUALS", "FOR MERCHANTS AND ENTREPRENEURS"] },
    { selector: ".audience-card h3", values: ["Discover. Bid. Buy with confidence.", "Launch your store. Expand your reach."] },
    { selector: ".audience-card > p", values: ["Shop new and used products and join timed or live auctions through one streamlined experience.", "Turn products into a scalable storefront with live selling, auctions and practical merchant tools."] },
    { selector: ".audience-card li", values: ["New and used products", "Timed and live auctions", "Payments and delivery in one place", "A storefront with your name and logo", "Management tools and clear activity", "Plans that match your stage"] },
    { selector: ".package-heading .eyebrow", values: ["MERCHANT PLANS"] },
    { selector: ".package-heading h2", values: ["Start simply. <span>Scale without limits.</span>"] },
    { selector: ".package-heading > p", values: ["Clear pricing, 0% final-sale commission, and the flexibility to add only what your operation needs."] },
    { selector: ".billing-toggle button", values: ["Monthly", 'Annual <span>2 months free</span>'] },
    { selector: ".popular-badge", values: ["BEST FIT FOR GROWTH"] },
    { selector: ".plan-for", values: ["A SMART START", "FOR ACTIVE MERCHANTS", "FOR LARGER ORGANIZATIONS"] },
    { selector: ".price-card h3", values: ["Starter <small>Start</small>", "Pro <small>Growth</small>", "Enterprise <small>Custom</small>"] },
    { selector: ".price-card > p", values: ["For new merchants ready to launch a storefront and test their first selling channels.", "For merchants who need more products, regular visibility and live-selling access throughout the month.", "A plan tailored to the product volume, operations and support your organization requires."] },
    { selector: ".price-custom strong", values: ["Custom quote"] },
    { selector: ".plan-list li", values: ["<i></i>Storefront inside the Fils app", "<i></i>Up to 150 products", "<i></i>15 timed auctions and 4 live days monthly", "<i></i>Integrated payments and delivery", "<i></i>Full store with up to 600 products", "<i></i>60 auctions and 30 live days monthly", "<i></i>Storage shelf included", "<i></i>4 posts, priority scheduling and stronger support", "<i></i>Custom product and auction limits", "<i></i>Contract-based live days and storage", "<i></i>Dedicated operations and performance reports", "<i></i>Custom visibility and payment terms"] },
    { selector: ".plan-details-trigger span", values: ["View full plan details", "View full plan details", "View full plan details"] },
    { selector: ".price-card .button", values: ["Choose Starter", "Choose Pro", "Talk to our team"] },
    { selector: ".plan-detail-kicker", values: ["STARTER PLAN", "PRO PLAN", "ENTERPRISE PLAN"] },
    { selector: ".plan-detail-summary h3", values: ["Starter", "Pro", "Enterprise"] },
    { selector: ".plan-detail-summary > div:first-child > p", values: ["For new merchants who want a simple, practical start.", "For active merchants who want to scale quickly.", "For larger companies and merchants with extensive product ranges."] },
    { selector: ".plan-detail-prices small", values: ["Monthly", "Annual", "Monthly", "Annual", "Price and term"] },
    { selector: ".plan-detail-prices strong", values: ["KWD 49", "KWD 490", "KWD 120", "KWD 1,200", "Custom quote"] },
    { selector: ".plan-detail-prices em", values: ["2 months free", "2 months free", "Monthly or annual by contract"] },
    { selector: ".plan-detail-block h4", values: ["<i aria-hidden=\"true\"></i>What you receive", "<i aria-hidden=\"true\"></i>Available as add-ons", "<i aria-hidden=\"true\"></i>What you receive", "<i aria-hidden=\"true\"></i>Available as add-ons", "<i aria-hidden=\"true\"></i>A tailored plan may include"] },
    { selector: ".plan-detail-list li", values: ["Storefront inside the Fils app", "Upload up to 150 products", "Up to 15 timed auctions per month", "4 live-selling days per month", "Up to 3 auctions per live day, each lasting up to 90 minutes", "Online payment gateway for approved merchants", "Delivery across Kuwait", "Simple store-management dashboard", "Basic support from the Fils team", "Storage space", "Social-media posts", "In-app advertising", "Additional live-selling days", "The plan does not include a sales guarantee", "Storefront inside the Fils app", "Upload up to 600 products", "Up to 60 timed auctions per month", "30 live-selling days per month", "Up to 3 auctions per live day, each lasting up to 90 minutes", "Storage shelf included and removable if not needed", "Online payment gateway for approved merchants", "Delivery across Kuwait", "Higher priority when scheduling live days", "4 social-media posts per month", "Enhanced support from the Fils team", "In-app advertising", "Additional storage beyond the included shelf", "Permanent featured visibility", "The plan does not include a sales guarantee", "An expanded storefront inside the app", "Custom product limits", "Custom timed-auction limits", "Custom live-selling days", "Additional storage solutions", "Dedicated operational support", "A content or visibility plan by contract", "Performance reports", "Custom payment terms"] },
    { selector: ".plan-addon-grid h4", values: ["Additional storage shelf", "Additional live days", "Additional products", "Additional auctions", "Additional posts"] },
    { selector: ".plan-addon-grid p", values: ["For merchants who need more storage capacity.", "After using the days included in the plan.", "Increase the product limit in your storefront.", "After reaching the plan's monthly limit.", "Social-media posts beyond the included allowance."] },
    { selector: ".plan-extra-summary span", values: ["Available add-ons", "Rules for every plan"] },
    { selector: ".plan-extra-intro", values: ["Available on top of Starter or Pro with monthly or annual billing."] },
    { selector: ".plan-rules-list li", values: ["<span>01</span>Each live day allows up to 3 auctions.", "<span>02</span>Each live auction can last up to 90 minutes.", "<span>03</span>Total live time cannot exceed 180 minutes per day.", "<span>04</span>Live days are scheduled according to the Fils calendar and operational availability.", "<span>05</span>Plans are available only to approved merchants.", "<span>06</span>Merchant approval follows document submission and review.", "<span>07</span>There is no commission on the final sale.", "<span>08</span>In-app advertising is separate from subscriptions.", "<span>09</span>Fils social posts are not paid ads or guaranteed visibility.", "<span>10</span>Annual billing is prepaid and equals 10 monthly payments."] },
    { selector: ".about-badge strong", values: ["From Kuwait"] },
    { selector: ".about-badge span", values: ["To a more connected market"] },
    { selector: ".about-copy .eyebrow", values: ["OUR STORY"] },
    { selector: ".about-copy h2", values: ["A Gulf idea,<br><span>with global ambition.</span>"] },
    { selector: ".about-lead", values: ["Fils launched in 2024 to make digital commerce more accessible to individuals and merchants through a trusted e-commerce mall that brings shopping and auctions into one environment."] },
    { selector: ".about-values p", values: ["<strong>Trust</strong> Clearer transactions and protected rights for every party.", "<strong>Agility</strong> Solutions that adapt from a merchant’s first launch to expansion.", "<strong>Innovation</strong> An interactive experience that rethinks how people buy and sell."] },
    { selector: ".text-link", values: ['Start your Fils experience <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'] },
    { selector: ".faq-intro .eyebrow", values: ["BEFORE YOU START"] },
    { selector: ".faq-intro h2", values: ["Clear questions.<br><span>Direct answers.</span>"] },
    { selector: ".faq-intro p", values: ["Still need help? The Fils team is available on WhatsApp."] },
    { selector: ".faq-intro .button", values: ["Ask the Fils team"] },
    { selector: ".faq-item button span", values: ["Is Fils for shoppers or merchants?", "Is there a commission on completed sales?", "How does annual billing work?", "What are the live-selling rules?", "How is a merchant account approved?"] },
    { selector: ".faq-answer p", values: ["Both. Individuals can shop, sell new or used items and join auctions, while approved merchants receive an integrated storefront and selling tools.", "The current plans charge 0% commission on the final sale. Subscription, add-on and in-app advertising fees are priced separately.", "Annual plans are prepaid at the value of 10 months, giving you two additional months free compared with monthly billing.", "Live days are scheduled according to the Fils calendar and operational availability. Each day allows up to 3 auctions, each lasting up to 90 minutes, with no more than 180 total minutes per day.", "Merchant plans are for verified merchants. Activation begins after the required business documents are uploaded and reviewed by the Fils team."] },
    { selector: ".footer-brand-block > p", values: ["A Kuwaiti e-commerce mall bringing storefronts, auctions, payments and delivery together in one app."] },
    { selector: ".contact-label", values: ["Phone", "Email", "Location"] },
    { selector: ".footer-download-copy small", values: ["Start your experience today"] },
    { selector: ".footer-download-copy strong", values: ["Download the Fils app"] },
    { selector: ".footer-column > strong", values: ["Explore", "Useful links", "Contact"] },
    { selector: ".footer-column:not(.footer-contact) > a", values: ["App experience", "Benefits", "Merchant plans", "About Fils", "FAQ", "All social channels", "WhatsApp"] },
    { selector: ".footer-contact-address", values: ["Kuwait City, Kuwait"] },
    { selector: ".footer-bottom p", values: ['© <span id="year">2026</span> Fils International. All rights reserved.', "From Kuwait, for the future of commerce."] }
  ];

  const originalHtml = new Map();
  englishGroups.forEach((group) => {
    document.querySelectorAll(group.selector).forEach((element) => originalHtml.set(element, element.innerHTML));
  });

  const translatedAttributes = [
    { selector: ".nav-shell", name: "aria-label", values: ["Main navigation"] },
    { selector: ".site-header .brand", name: "aria-label", values: ["Fils home"] },
    { selector: ".store-row", name: "aria-label", values: ["Available on the App Store and Google Play"] },
    { selector: ".store-button", name: "aria-label", values: ["Download Fils from the App Store", "Download Fils from Google Play"] },
    { selector: ".hero-actions .button", name: "aria-label", values: ["Get Fils on Google Play", "See the Fils experience"] },
    { selector: "#hero-screen", name: "alt", values: ["Fils app storefront screen"] },
    { selector: ".screen-dots", name: "aria-label", values: ["Change app preview"] },
    { selector: ".screen-dots button", name: "aria-label", values: ["Store screen", "Auction screen", "Fils app intro screen"] },
    { selector: ".tour-tabs", name: "aria-label", values: ["App features"] },
    { selector: ".tour-device-wrap", name: "aria-label", values: ["Show the next step in the app journey"] },
    { selector: ".billing-toggle", name: "aria-label", values: ["Choose billing cycle"] },
    { selector: ".plan-dialog", name: "aria-label", values: ["Plan details"] },
    { selector: ".plan-dialog-close", name: "aria-label", values: ["Close plan details"] },
    { selector: "#tour-screen", name: "alt", values: ["Fils store dashboard"] },
    { selector: ".audience-card > img", name: "alt", values: ["Auction details in the Fils app", "Store dashboard in the Fils app"] },
    { selector: ".about-image-frame img", name: "alt", values: ["Fils app intro screen"] },
    { selector: ".footer-download a", name: "aria-label", values: ["Download Fils from the App Store", "Download Fils from Google Play"] },
    { selector: ".tour-tab", name: "data-alt", values: ["Fils store dashboard", "Auction details in Fils", "Live selling in Fils"] },
    { selector: ".price-card .button", name: "href", values: ["https://wa.me/96569055541?text=I%20would%20like%20to%20subscribe%20to%20the%20Starter%20plan", "https://wa.me/96569055541?text=I%20would%20like%20to%20subscribe%20to%20the%20Pro%20plan", "https://wa.me/96569055541?text=I%20would%20like%20to%20discuss%20an%20Enterprise%20plan"] }
  ];
  const originalAttributes = new Map();
  translatedAttributes.forEach((group) => {
    document.querySelectorAll(group.selector).forEach((element) => {
      originalAttributes.set(`${group.name}:${group.selector}:${Array.from(document.querySelectorAll(group.selector)).indexOf(element)}`, element.getAttribute(group.name));
    });
  });

  function currentPeriodLabel() {
    const annual = document.querySelector('[data-billing="annual"]')?.classList.contains("is-active");
    const english = document.documentElement.lang === "en";
    if (english) return annual ? " / year" : " / month";
    return annual ? " / سنة" : " / شهر";
  }

  function applyLanguage(language) {
    const english = language === "en";
    document.documentElement.lang = english ? "en" : "ar";
    document.documentElement.dir = english ? "ltr" : "rtl";
    body.classList.toggle("is-english", english);

    englishGroups.forEach((group) => {
      document.querySelectorAll(group.selector).forEach((element, index) => {
        if (english && group.values[index] !== undefined) element.innerHTML = group.values[index];
        else if (!english && originalHtml.has(element)) element.innerHTML = originalHtml.get(element);
      });
    });

    translatedAttributes.forEach((group) => {
      const elements = Array.from(document.querySelectorAll(group.selector));
      elements.forEach((element, index) => {
        const key = `${group.name}:${group.selector}:${index}`;
        if (english) element.setAttribute(group.name, group.values[index]);
        else element.setAttribute(group.name, originalAttributes.get(key) || "");
      });
    });

    document.title = english ? "Fils | Your whole business in one app" : originalMetadata.title;
    if (metaDescription) metaDescription.content = english ? "Fils is a Kuwaiti e-commerce mall for storefronts, live and timed auctions, payments and delivery in one app." : originalMetadata.description;
    if (ogTitle) ogTitle.content = english ? "Fils | Your whole business in one app" : originalMetadata.ogTitle;
    if (ogDescription) ogDescription.content = english ? "Launch a store, sell live and join auctions through one Kuwaiti e-commerce mall." : originalMetadata.ogDescription;

    if (languageLabel) languageLabel.textContent = english ? "العربية" : "EN";
    if (languageSwitch) languageSwitch.setAttribute("aria-label", english ? "التبديل إلى العربية" : "Switch to English");
    if (navToggle) {
      const menuOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", english ? (menuOpen ? "Close menu" : "Open menu") : (menuOpen ? "إغلاق القائمة" : "فتح القائمة"));
    }
    if (navClose) navClose.setAttribute("aria-label", english ? "Close menu" : "إغلاق القائمة");
    document.querySelectorAll("[data-period]").forEach((period) => { period.textContent = currentPeriodLabel(); });

    const query = new URLSearchParams(window.location.search);
    if (english) query.set("lang", "en");
    else query.delete("lang");
    const nextUrl = `${window.location.pathname}${query.toString() ? `?${query}` : ""}${window.location.hash}`;
    window.history.replaceState({}, "", nextUrl);
    window.localStorage.setItem("fils-language", english ? "en" : "ar");
  }

  if (languageSwitch) {
    languageSwitch.addEventListener("click", () => {
      applyLanguage(document.documentElement.lang === "en" ? "ar" : "en");
      if (navToggle && navPanel && window.innerWidth <= 920) {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", document.documentElement.lang === "en" ? "Open menu" : "فتح القائمة");
        navPanel.classList.remove("is-open");
        body.classList.remove("menu-open");
      }
    });
  }

  const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
  const storedLanguage = window.localStorage.getItem("fils-language");
  if (requestedLanguage === "en" || (!requestedLanguage && storedLanguage === "en")) applyLanguage("en");

  function updateScrollState() {
    const scrollTop = window.scrollY;
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(scrollTop / scrollable, 1);

    if (header) header.classList.toggle("is-scrolled", scrollTop > 24);
    if (progress) progress.style.width = `${ratio * 100}%`;
    if (hero && !reduceMotion && scrollTop <= hero.offsetHeight) {
      hero.style.setProperty("--parallax-near", `${scrollTop * 0.1}px`);
      hero.style.setProperty("--parallax-far", `${scrollTop * -0.045}px`);
    }
  }

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

  const ambientParticles = document.querySelector("[data-ambient-particles]");
  if (ambientParticles && !reduceMotion) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 18; index += 1) {
      const particle = document.createElement("span");
      const duration = 12 + Math.random() * 10;
      particle.style.setProperty("--particle-x", `${Math.random() * 100}%`);
      particle.style.setProperty("--particle-size", `${2 + Math.random() * 4}px`);
      particle.style.setProperty("--particle-duration", `${duration}s`);
      particle.style.setProperty("--particle-delay", `${-Math.random() * duration}s`);
      particle.style.setProperty("--particle-drift", `${-70 + Math.random() * 140}px`);
      fragment.appendChild(particle);
    }
    ambientParticles.appendChild(fragment);
  }

  if (navToggle && navPanel) {
    const menuLabel = (opening) => {
      if (document.documentElement.lang === "en") return opening ? "Close menu" : "Open menu";
      return opening ? "إغلاق القائمة" : "فتح القائمة";
    };

    const closeMenu = (restoreFocus = false) => {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", menuLabel(false));
      navPanel.classList.remove("is-open");
      body.classList.remove("menu-open");
      if (restoreFocus) navToggle.focus({ preventScroll: true });
    };

    navToggle.addEventListener("click", () => {
      const opening = navToggle.getAttribute("aria-expanded") !== "true";
      navToggle.setAttribute("aria-expanded", String(opening));
      navToggle.setAttribute("aria-label", menuLabel(opening));
      navPanel.classList.toggle("is-open", opening);
      body.classList.toggle("menu-open", opening);
      if (opening && navClose) requestAnimationFrame(() => navClose.focus({ preventScroll: true }));
    });

    navPanel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
    navClose?.addEventListener("click", () => closeMenu(true));
    menuBackdrop?.addEventListener("click", () => closeMenu(true));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navPanel.classList.contains("is-open")) closeMenu(true);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");
  revealItems.forEach((item) => {
    if (item.dataset.delay) item.style.setProperty("--reveal-delay", `${item.dataset.delay}ms`);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-revealed"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.13, rootMargin: "0px 0px -50px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  function swapImage(image, source, alt) {
    if (!image || image.getAttribute("src") === source) return;
    image.classList.add("is-changing");

    const preload = new Image();
    preload.src = source;
    preload.onload = () => {
      window.setTimeout(() => {
        image.src = source;
        if (alt) image.alt = alt;
        image.classList.remove("is-changing");
      }, reduceMotion ? 0 : 120);
    };
  }

  const heroScreen = document.querySelector("#hero-screen");
  const heroDots = Array.from(document.querySelectorAll("[data-hero-screen]"));
  let heroIndex = 0;
  let heroTimer = null;

  function showHeroScreen(index) {
    if (!heroDots.length) return;
    heroIndex = (index + heroDots.length) % heroDots.length;
    heroDots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === heroIndex));
    const activeDot = heroDots[heroIndex];
    swapImage(heroScreen, activeDot.dataset.heroScreen, activeDot.getAttribute("aria-label"));
  }

  function startHeroTimer() {
    if (reduceMotion || heroDots.length < 2) return;
    window.clearInterval(heroTimer);
    heroTimer = window.setInterval(() => showHeroScreen(heroIndex + 1), 4800);
  }

  heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showHeroScreen(index);
      startHeroTimer();
    });
  });
  startHeroTimer();

  const tiltStage = document.querySelector("[data-tilt]");
  if (tiltStage && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    const heroVisual = tiltStage.closest(".hero-visual");

    heroVisual.addEventListener("pointermove", (event) => {
      const bounds = heroVisual.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      tiltStage.style.transform = `translateX(-50%) rotate(-4deg) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    });

    heroVisual.addEventListener("pointerleave", () => {
      tiltStage.style.transform = "translateX(-50%) rotate(-4deg) rotateY(0deg) rotateX(0deg)";
    });
  }

  const tourTabs = Array.from(document.querySelectorAll(".tour-tab"));
  const tourScreen = document.querySelector("#tour-screen");
  const tourDevice = document.querySelector(".tour-device-wrap");

  function activateTourTab(index, focusTab) {
    if (!tourTabs.length) return;
    const normalized = (index + tourTabs.length) % tourTabs.length;

    tourTabs.forEach((tab, tabIndex) => {
      const active = tabIndex === normalized;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    const tab = tourTabs[normalized];
    swapImage(tourScreen, tab.dataset.screen, tab.dataset.alt);
    if (focusTab) tab.focus();
  }

  tourTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTourTab(index, false));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") return activateTourTab(0, true);
      if (event.key === "End") return activateTourTab(tourTabs.length - 1, true);
      const forward = event.key === "ArrowDown" || event.key === "ArrowLeft";
      activateTourTab(index + (forward ? 1 : -1), true);
    });
  });

  if (tourDevice && tourTabs.length) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartedAt = 0;
    let suppressClickAdvance = false;

    const activeTourIndex = () => Math.max(0, tourTabs.findIndex((tab) => tab.classList.contains("is-active")));
    const moveTour = (direction) => activateTourTab(activeTourIndex() + direction, false);

    tourDevice.addEventListener("pointerdown", (event) => {
      if (window.innerWidth > 920 || event.pointerType === "mouse") return;
      touchStartX = event.clientX;
      touchStartY = event.clientY;
      touchStartedAt = performance.now();
    });

    tourDevice.addEventListener("pointerup", (event) => {
      if (window.innerWidth > 920 || event.pointerType === "mouse" || !touchStartedAt) return;
      const distanceX = event.clientX - touchStartX;
      const distanceY = event.clientY - touchStartY;
      const elapsed = performance.now() - touchStartedAt;
      touchStartedAt = 0;

      if (Math.abs(distanceX) > 42 && Math.abs(distanceX) > Math.abs(distanceY) * 1.2) {
        const forward = document.documentElement.dir === "rtl" ? distanceX > 0 : distanceX < 0;
        moveTour(forward ? 1 : -1);
        suppressClickAdvance = true;
        return;
      }

      if (Math.abs(distanceX) < 12 && Math.abs(distanceY) < 12 && elapsed < 500) {
        moveTour(1);
        suppressClickAdvance = true;
      }
    });

    tourDevice.addEventListener("pointercancel", () => { touchStartedAt = 0; });
    tourDevice.addEventListener("click", () => {
      if (window.innerWidth > 920 || suppressClickAdvance) {
        suppressClickAdvance = false;
        return;
      }
      moveTour(1);
    });
    tourDevice.addEventListener("keydown", (event) => {
      if (!["Enter", " ", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const forward = document.documentElement.dir === "rtl" ? event.key === "ArrowRight" : event.key === "ArrowLeft";
        moveTour(forward ? 1 : -1);
      } else {
        moveTour(1);
      }
    });
  }

  const billingButtons = Array.from(document.querySelectorAll("[data-billing]"));
  const prices = Array.from(document.querySelectorAll("[data-monthly][data-annual]"));
  const periods = Array.from(document.querySelectorAll("[data-period]"));

  function animateNumber(element, target) {
    const current = Number(element.textContent.replace(/,/g, "")) || 0;
    if (reduceMotion) {
      element.textContent = target.toLocaleString("en-US");
      return;
    }

    const duration = 420;
    const started = performance.now();
    const distance = target - current;

    function tick(now) {
      const progressValue = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      element.textContent = Math.round(current + distance * eased).toLocaleString("en-US");
      if (progressValue < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  billingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const billing = button.dataset.billing;
      billingButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      prices.forEach((price) => animateNumber(price, Number(price.dataset[billing])));
      periods.forEach((period) => { period.textContent = currentPeriodLabel(); });
    });
  });

  const planDialog = document.querySelector("[data-plan-dialog]");
  const planOpeners = Array.from(document.querySelectorAll("[data-plan-open]"));
  const planPanels = Array.from(document.querySelectorAll("[data-plan-panel]"));
  const planClose = document.querySelector("[data-plan-close]");
  let lastPlanTrigger = null;

  function activatePlanPanel(plan) {
    if (planDialog) planDialog.dataset.activePlan = plan;
    planPanels.forEach((panel) => {
      const active = panel.dataset.planPanel === plan;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    const dialogBody = planDialog?.querySelector(".plan-dialog-body");
    if (dialogBody) dialogBody.scrollTop = 0;
    planDialog?.querySelectorAll(".plan-detail-extras details").forEach((details) => { details.open = false; });
  }

  if (planDialog && planPanels.length) {
    planOpeners.forEach((opener) => {
      opener.addEventListener("click", () => {
        lastPlanTrigger = opener;
        activatePlanPanel(opener.dataset.planOpen);
        if (!planDialog.open) planDialog.showModal();
        body.classList.add("plan-dialog-open");
        requestAnimationFrame(() => planClose?.focus({ preventScroll: true }));
      });
    });

    planClose?.addEventListener("click", () => planDialog.close());
    planDialog.addEventListener("click", (event) => {
      if (event.target === planDialog) planDialog.close();
    });
    planDialog.addEventListener("close", () => {
      body.classList.remove("plan-dialog-open");
      lastPlanTrigger?.focus({ preventScroll: true });
    });
  }

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const opening = !item.classList.contains("is-open");

      document.querySelectorAll(".faq-item").forEach((otherItem) => {
        otherItem.classList.remove("is-open");
        otherItem.querySelector("button").setAttribute("aria-expanded", "false");
      });

      if (opening) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    observedSections.forEach((section) => navObserver.observe(section));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
