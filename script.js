const page = document.getElementById("page");
const nav = [...document.querySelectorAll(".nav-item")];

const home = () => `
<section class="hero fade">
  <div class="pill"><span class="dot"></span> Premium Activation</div>
  <h1>Alight Motion Premium</h1>
  <p class="lead">Activate your premium experience quickly and easily. Fast, simple, and secure.</p>
  <button class="primary" onclick="showPage('activate')">Activate Premium&nbsp; →</button>
</section>

<section class="grid fade">
  <article class="card">
    <div class="feature-icon">ϟ</div>
    <h3>Fast</h3>
    <p>Instant activation process</p>
  </article>

  <article class="card">
    <div class="feature-icon">✓</div>
    <h3>Simple</h3>
    <p>Just 3 easy steps to complete</p>
  </article>

  <article class="card">
    <div class="feature-icon">♢</div>
    <h3>Secure</h3>
    <p>Safe and verified access</p>
  </article>
</section>

<div class="section fade">
  <h2>How It Works</h2>
  <p class="lead">Follow these simple steps</p>
</div>

<section class="card steps fade">
  <div class="step">
    <div class="num">1</div>
    <div>
      <div class="step-title">✉ Enter Email</div>
      <p>Input your email address.</p>
    </div>
  </div>

  <div class="step">
    <div class="num">2</div>
    <div>
      <div class="step-title">⚿ Send Request</div>
      <p>A verification link will be sent to your email.</p>
    </div>
  </div>

  <div class="step">
    <div class="num">3</div>
    <div>
      <div class="step-title">✓ Verify</div>
      <p>Paste the verification link to finish.</p>
    </div>
  </div>
</section>
`;

const activate = () => `
<section class="fade">
  <div class="section" style="margin-top:0">
    <h2>Activation</h2>
    <p class="lead">Send the verification link, then paste it here to finish.</p>
  </div>

  <div class="progress">
    <div id="stepEmail" class="progress-step active">
      <div class="progress-dot">1</div>EMAIL
    </div>

    <div id="stepProcess" class="progress-step">
      <div class="progress-dot">2</div>PROCESS
    </div>

    <div id="stepVerify" class="progress-step">
      <div class="progress-dot">3</div>VERIFY
    </div>

    <div id="stepDone" class="progress-step">
      <div class="progress-dot">4</div>DONE
    </div>
  </div>

  <section class="card form-card">

    <div id="emailPanel">
      <h2>Send Premium Request</h2>
      <p class="sub">
        Enter your email. A verification link will be sent to it.
      </p>

      <label>EMAIL ADDRESS</label>

      <input
        id="email"
        class="input"
        type="email"
        placeholder="name@example.com"
        autocomplete="email"
      >

      <button
        id="sendBtn"
        class="primary"
        onclick="sendActivation()"
      >
        Send Premium Request&nbsp; →
      </button>
    </div>

    <div id="verifyPanel" style="display:none">

      <h2>Verify Premium</h2>

      <p class="sub">
        Check your email, copy the verification link,
        then paste it below.
      </p>

      <label>VERIFICATION LINK</label>

      <input
        id="verifyLink"
        class="input"
        type="url"
        placeholder="Paste verification link here"
        autocomplete="off"
      >

      <button
        id="verifyBtn"
        class="primary"
        onclick="verifyActivation()"
      >
        Verify Premium&nbsp; →
      </button>

    </div>

    <div id="notice" class="notice"></div>

    <div id="result" class="result">
      <pre></pre>
    </div>

  </section>
</section>
`;

const creator = () => `
<section class="card profile fade">
  <div class="cover"></div>
  <div class="avatar">🐺</div>
  <h2>denz <span class="verified">♢</span></h2>
  <div class="role">Developer & Creator</div>

  <p class="bio">
    Built and maintained by denz.
    Dedicated to providing simple and effective tools.
  </p>

  <div class="profile-actions">
    <a
      class="secondary"
      href="#"
      onclick="event.preventDefault();alert('Tambahkan link channel kamu di script.js')"
    >
      ◌ &nbsp; Join WhatsApp Channel
    </a>

    <a
      class="secondary"
      href="#"
      onclick="event.preventDefault();alert('Tambahkan link projects kamu di script.js')"
    >
      ↗ &nbsp; Projects
    </a>
  </div>
</section>
`;

const info = () => `
<section class="fade">

  <div class="section" style="margin-top:0">
    <h2>Information & FAQ</h2>
    <p class="lead">Everything you need to know</p>
  </div>

  <div class="info-box">
    <h3>ⓘ &nbsp;About this portal</h3>
    <p>
      API credentials are kept on the server.
      The browser never receives the secret API key.
    </p>
  </div>

  <div class="faq-wrap">

    <article class="card faq">
      <h3>Where is the API key?</h3>
      <p>
        It belongs in the server environment variable,
        not in this HTML or JavaScript.
      </p>
    </article>

    <article class="card faq">
      <h3>Which endpoints are configured?</h3>
      <p>
        Email Premium and Verify Premium are routed through
        <b>/api/email-prem</b> and <b>/api/vertif-prem</b>.
      </p>
    </article>

    <article class="card faq">
      <h3>Can I change the key?</h3>
      <p>
        Yes. Change the API_KEY environment variable
        on your hosting provider.
      </p>
    </article>

  </div>

</section>
`;

function setProgress(step) {
  const ids = [
    "stepEmail",
    "stepProcess",
    "stepVerify",
    "stepDone"
  ];

  ids.forEach((id, i) => {
    const el = document.getElementById(id);

    if (!el) return;

    el.classList.toggle("active", i < step);
    el.classList.toggle("done", i < step - 1);
  });
}

function showNotice(message, ok = false) {
  const notice = document.getElementById("notice");

  notice.textContent = message;

  notice.className =
    "notice show " + (ok ? "ok" : "err");
}

function showResult(data) {
  const result = document.getElementById("result");

  result.className = "result show";

  result.querySelector("pre").textContent =
    JSON.stringify(data, null, 2);
}

function isApiSuccess(data) {
  if (data && data.status === false) {
    return false;
  }

  if (
    typeof data?.result === "string" &&
    /^error\b/i.test(data.result.trim())
  ) {
    return false;
  }

  if (data?.error) {
    return false;
  }

  return true;
}

async function sendActivation() {
  const email = document.getElementById("email");
  const btn = document.getElementById("sendBtn");

  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }

  btn.disabled = true;
  btn.textContent = "Sending…";

  document.getElementById("result").className = "result";

  try {
    const r = await fetch("/api/email-prem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value.trim()
      })
    });

    const text = await r.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        raw: text || "Empty response"
      };
    }

    showResult(data);

    if (!r.ok || !isApiSuccess(data)) {
      throw new Error(
        data.message ||
        data.error ||
        data.result ||
        `HTTP ${r.status}`
      );
    }

    // EMAIL BERHASIL
    // pindah ke VERIFY
    setProgress(3);

    document.getElementById("emailPanel").style.display = "none";

    document.getElementById("verifyPanel").style.display = "block";

    showNotice(
      "Link verifikasi sudah dikirim. Cek email kamu lalu masukkan link di bawah.",
      true
    );

    document.getElementById("verifyLink").focus();

  } catch (e) {

    showNotice(
      "Request gagal: " + e.message,
      false
    );

  } finally {

    btn.disabled = false;
    btn.textContent = "Send Premium Request  →";

  }
}

async function verifyActivation() {
  const link = document.getElementById("verifyLink");
  const btn = document.getElementById("verifyBtn");

  const value = link.value.trim();

  if (!value) {
    link.focus();

    showNotice(
      "Link verifikasi wajib diisi.",
      false
    );

    return;
  }

  btn.disabled = true;
  btn.textContent = "Verifying…";

  document.getElementById("result").className = "result";

  try {

    const r = await fetch("/api/vertif-prem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        link: value
      })
    });

    const text = await r.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        raw: text || "Empty response"
      };
    }

    showResult(data);

    if (!r.ok || !isApiSuccess(data)) {
      throw new Error(
        data.message ||
        data.error ||
        data.result ||
        `HTTP ${r.status}`
      );
    }

    // VERIFY BERHASIL
    // pindah ke DONE
    setProgress(4);

    showNotice(
      "Premium berhasil diverifikasi. Done!",
      true
    );

  } catch (e) {

    showNotice(
      "Verifikasi gagal: " + e.message,
      false
    );

  } finally {

    btn.disabled = false;
    btn.textContent = "Verify Premium  →";

  }
}

function showPage(name) {

  const views = {
    home,
    activate,
    creator,
    info
  };

  page.innerHTML =
    (views[name] || home)();

  nav.forEach(n => {
    n.classList.toggle(
      "active",
      n.dataset.page === name
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  history.replaceState(
    null,
    "",
    "#" + name
  );
}

nav.forEach(n => {
  n.addEventListener(
    "click",
    () => showPage(n.dataset.page)
  );
});

showPage(
  location.hash.slice(1) || "home"
);
