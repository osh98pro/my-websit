/* ==============================
   설정
============================== */

const GITHUB_USERNAME = "osh98pro";

const SCROLL_TOP_POSITION = 300;
const HEADER_SCROLL_POSITION = 60;
const OBSERVER_THRESHOLD = 0.2;


/* ==============================
   DOM Elements
============================== */

const header = document.querySelector("#header");

const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.querySelector("#themeToggle");

const scrollTopButton = document.querySelector("#scrollTop");

const revealElements = document.querySelectorAll(".reveal");

const projectStatus = document.querySelector("#projectStatus");
const projectGrid = document.querySelector("#projectGrid");
const retryButton = document.querySelector("#retryButton");

const contactForm = document.querySelector("#contactForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const messageError = document.querySelector("#messageError");

const formSuccess = document.querySelector("#formSuccess");

const currentYear = document.querySelector("#currentYear");


/* ==============================
   State
============================== */

const state = {
  theme: "light",

  projects: {
    status: "idle",
    data: [],
    error: null
  },

  form: {
    values: {
      name: "",
      email: "",
      message: ""
    },

    errors: {
      name: "",
      email: "",
      message: ""
    }
  }
};


/* ==============================
   Footer Year
============================== */

currentYear.textContent = new Date().getFullYear();


/* ==============================
   Hamburger Menu
============================== */

const toggleMobileMenu = () => {
  navMenu.classList.toggle("active");

  const isOpen = navMenu.classList.contains("active");

  hamburger.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
};


hamburger.addEventListener("click", toggleMobileMenu);


/* ==============================
   Navigation / Smooth Scroll
============================== */

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");

    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    targetSection.scrollIntoView({
      behavior: "smooth"
    });

    navMenu.classList.remove("active");

    hamburger.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});


/* ==============================
   Scroll Event
============================== */

const handleScroll = () => {
  const scrollPosition = window.scrollY;


  /* Header */
  if (scrollPosition >= HEADER_SCROLL_POSITION) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }


  /* Scroll Top Button */
  if (scrollPosition >= SCROLL_TOP_POSITION) {
    scrollTopButton.classList.add("active");
  } else {
    scrollTopButton.classList.remove("active");
  }
};


window.addEventListener("scroll", handleScroll);


/* ==============================
   Scroll To Top
============================== */

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/* ==============================
   Theme
============================== */

const renderTheme = () => {
  document.documentElement.setAttribute(
    "data-theme",
    state.theme
  );

  if (state.theme === "dark") {
    themeToggle.textContent = "☀️";

    themeToggle.setAttribute(
      "aria-label",
      "라이트 모드로 전환"
    );
  } else {
    themeToggle.textContent = "🌙";

    themeToggle.setAttribute(
      "aria-label",
      "다크 모드로 전환"
    );
  }
};


const saveTheme = () => {
  localStorage.setItem(
    "theme",
    state.theme
  );
};


const loadTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (
    savedTheme === "dark" ||
    savedTheme === "light"
  ) {
    state.theme = savedTheme;
  }

  renderTheme();
};


const toggleTheme = () => {
  state.theme =
    state.theme === "light"
      ? "dark"
      : "light";

  renderTheme();

  saveTheme();
};


themeToggle.addEventListener(
  "click",
  toggleTheme
);


/* ==============================
   Scroll Animation
============================== */

const observerOptions = {
  threshold: OBSERVER_THRESHOLD
};


const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      observer.unobserve(entry.target);
    }
  });
};


const observer = new IntersectionObserver(
  observerCallback,
  observerOptions
);


revealElements.forEach((element) => {
  observer.observe(element);
});


/* ==============================
   Form Validation
============================== */

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/* 입력값 상태 업데이트 */

const updateFormState = () => {
  state.form.values = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };
};


/* 개별 필드 검사 */

const validateName = () => {
  const { name } = state.form.values;

  if (!name) {
    state.form.errors.name =
      "이름을 입력해주세요.";

    return false;
  }

  state.form.errors.name = "";

  return true;
};


const validateEmail = () => {
  const { email } = state.form.values;

  if (!email) {
    state.form.errors.email =
      "이메일을 입력해주세요.";

    return false;
  }

  if (!emailPattern.test(email)) {
    state.form.errors.email =
      "올바른 이메일 형식을 입력해주세요.";

    return false;
  }

  state.form.errors.email = "";

  return true;
};


const validateMessage = () => {
  const { message } = state.form.values;

  if (!message) {
    state.form.errors.message =
      "메시지를 입력해주세요.";

    return false;
  }

  state.form.errors.message = "";

  return true;
};


/* 에러 화면 출력 */

const renderFormErrors = () => {
  const { name, email, message } =
    state.form.errors;


  nameError.textContent = name;
  emailError.textContent = email;
  messageError.textContent = message;


  if (name) {
    nameInput.classList.add("input-error");
  } else {
    nameInput.classList.remove("input-error");
  }


  if (email) {
    emailInput.classList.add("input-error");
  } else {
    emailInput.classList.remove("input-error");
  }


  if (message) {
    messageInput.classList.add(
      "input-error"
    );
  } else {
    messageInput.classList.remove(
      "input-error"
    );
  }
};


/* 전체 폼 검사 */

const validateForm = () => {
  updateFormState();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  renderFormErrors();

  return (
    isNameValid &&
    isEmailValid &&
    isMessageValid
  );
};


/* ==============================
   Input Event
============================== */

nameInput.addEventListener("input", () => {
  updateFormState();

  validateName();

  renderFormErrors();

  formSuccess.textContent = "";
});


emailInput.addEventListener("input", () => {
  updateFormState();

  validateEmail();

  renderFormErrors();

  formSuccess.textContent = "";
});


messageInput.addEventListener("input", () => {
  updateFormState();

  validateMessage();

  renderFormErrors();

  formSuccess.textContent = "";
});


/* ==============================
   Form Submit
============================== */

contactForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      formSuccess.textContent = "";

      return;
    }

    formSuccess.textContent =
      "메시지가 정상적으로 작성되었습니다.";

    contactForm.reset();


    state.form.values = {
      name: "",
      email: "",
      message: ""
    };


    state.form.errors = {
      name: "",
      email: "",
      message: ""
    };


    renderFormErrors();
  }
);


/* ==============================
   HTML Escape
============================== */

/*
  GitHub API로 가져온 문자열을
  innerHTML에 넣을 때 HTML 코드가
  실행되지 않도록 변환한다.
*/

const escapeHTML = (value = "") => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};


/* ==============================
   GitHub Projects
============================== */

const renderProjects = () => {
  const {
    status,
    data,
    error
  } = state.projects;


  /* Loading */

  if (status === "loading") {
    projectStatus.textContent =
      "프로젝트를 불러오는 중...";

    projectGrid.innerHTML = "";

    retryButton.classList.add("hidden");

    return;
  }


  /* Error */

  if (status === "error") {
    projectStatus.textContent =
      error ||
      "프로젝트를 불러올 수 없습니다.";

    projectGrid.innerHTML = "";

    retryButton.classList.remove("hidden");

    return;
  }


  /* Empty */

  if (
    status === "success" &&
    data.length === 0
  ) {
    projectStatus.textContent =
      "표시할 프로젝트가 없습니다.";

    projectGrid.innerHTML = "";

    retryButton.classList.add("hidden");

    return;
  }


  /* Success */

  if (status === "success") {
    projectStatus.textContent = "";

    retryButton.classList.add("hidden");


    const projectCards = data.map(
      (repository) => {
        const {
          name,
          description,
          html_url,
          language,
          stargazers_count
        } = repository;


        const safeName =
          escapeHTML(name);

        const safeDescription =
          escapeHTML(
            description ||
            "프로젝트 설명이 없습니다."
          );

        const safeLanguage =
          escapeHTML(
            language ||
            "사용 언어 정보 없음"
          );


        return `
          <article class="project-card">

            <h3>
              ${safeName}
            </h3>

            <p>
              ${safeDescription}
            </p>

            <p>
              <strong>Language:</strong>
              ${safeLanguage}
            </p>

            <p>
              <strong>Stars:</strong>
              ${stargazers_count}
            </p>

            <a
              href="${html_url}"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub에서 보기
            </a>

          </article>
        `;
      }
    );


    projectGrid.innerHTML =
      projectCards.join("");
  }
};


/* ==============================
   Fetch GitHub Repositories
============================== */

const fetchProjects = async () => {
  state.projects.status = "loading";

  state.projects.data = [];

  state.projects.error = null;

  renderProjects();


  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`
    );


    if (!response.ok) {
      throw new Error(
        `GitHub API 요청 실패: ${response.status}`
      );
    }


    const repositories =
      await response.json();


    /*
      fork 프로젝트를 제외한다.

      필요 없다면 아래 filter를 지우고
      repositories를 그대로 사용해도 된다.
    */

    const filteredRepositories =
      repositories.filter(
        (repository) => !repository.fork
      );


    state.projects.status = "success";

    state.projects.data =
      filteredRepositories;

    state.projects.error = null;

  } catch (error) {

    console.error(error);

    state.projects.status = "error";

    state.projects.data = [];

    state.projects.error =
      "프로젝트를 불러올 수 없습니다.";

  }


  renderProjects();
};


/* ==============================
   Retry
============================== */

retryButton.addEventListener(
  "click",
  () => {
    fetchProjects();
  }
);


/* ==============================
   Initialize
============================== */

const initialize = () => {
  loadTheme();

  handleScroll();

  fetchProjects();
};


initialize();