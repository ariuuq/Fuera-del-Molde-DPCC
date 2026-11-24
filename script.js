
/* ==========================================
   FUERA DEL MOLDE — INTERACTIVE EXPERIENCE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ========================================
  // 1. MENÚ RESPONSIVE
  // ========================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });


  // ========================================
  // 2. BARRA DE PROGRESO DE LECTURA
  // ========================================

  const readingProgress = document.getElementById("readingProgress");

  function updateProgress() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 0;

    readingProgress.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();


  // ========================================
  // 3. ANIMACIONES AL DESPLAZARSE
  // ========================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => observer.observe(element));

  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }


  // ========================================
  // 4. INFORMACIÓN DESPLEGABLE
  // ========================================

  const topicData = {

    pressure: {
      kicker: "01 — PSICOLOGÍA SOCIAL",
      title: "La presión que no siempre ves.",
      content: `
        <p>
          La presión social es la influencia que ejercen otras personas
          sobre nuestros pensamientos, actitudes o comportamientos.
          Puede ser explícita o aparecer de manera indirecta.
        </p>

        <h4>¿Por qué sucede?</h4>
        <p>
          Los seres humanos necesitamos relacionarnos y sentir que
          pertenecemos a un grupo. Por eso, a veces modificamos nuestras
          decisiones para evitar el rechazo o conseguir aceptación.
        </p>

        <h4>Dos formas de presión</h4>
        <p>
          <b>Directa:</b> alguien te pide expresamente que hagas algo.
          <br><br>
          <b>Indirecta:</b> percibes expectativas, actitudes o conductas
          del grupo y sientes que debes adaptarte.
        </p>

        <h4>Algo para cuestionar</h4>
        <p>
          ¿Estás de acuerdo con lo que haces o simplemente estás
          intentando evitar las consecuencias sociales de decir que no?
        </p>
      `
    },

    autonomy: {
      kicker: "02 — ÉTICA Y FILOSOFÍA",
      title: "Tu criterio. Tu responsabilidad.",
      content: `
        <p>
          La autonomía moral es la capacidad de reflexionar, evaluar
          razones y tomar decisiones éticas por convicción propia,
          en lugar de aceptar automáticamente lo que otros dicen.
        </p>

        <h4>Autonomía no significa hacer cualquier cosa</h4>
        <p>
          Ser autónomo no significa ignorar las reglas o actuar sin
          considerar a los demás. Significa comprender por qué una
          decisión es correcta o incorrecta y asumir sus consecuencias.
        </p>

        <h4>Un ejemplo</h4>
        <p>
          Tu grupo considera gracioso excluir a un compañero.
          Puedes aceptar esa conducta para evitar conflictos o
          cuestionarla porque reconoces que vulnera su dignidad.
        </p>

        <h4>La pregunta importante</h4>
        <p>
          ¿Tus decisiones se sostienen en razones que puedes defender
          o dependen únicamente de la aprobación de otras personas?
        </p>
      `
    },

    discrimination: {
      kicker: "03 — SOCIEDAD E INCLUSIÓN",
      title: "Lo que normalizamos también importa.",
      content: `
        <p>
          La discriminación ocurre cuando una persona recibe un trato
          desigual que afecta el reconocimiento o ejercicio de sus
          derechos debido a características o condiciones personales.
        </p>

        <h4>¿Cómo puede aparecer?</h4>
        <p>
          En comentarios sobre la apariencia, exclusión de actividades,
          estereotipos, burlas repetidas o limitaciones injustificadas
          de oportunidades.
        </p>

        <h4>¿Por qué debemos cuestionarla?</h4>
        <p>
          Una conducta no deja de ser perjudicial porque sea frecuente
          o porque muchas personas la consideren normal.
        </p>

        <h4>Piensa en esto</h4>
        <p>
          Si una conducta afecta la dignidad de alguien, ¿es suficiente
          decir que no hubo mala intención para ignorar sus consecuencias?
        </p>
      `
    }

  };


  const topicModal = document.getElementById("topicModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalKicker = document.getElementById("modalKicker");
  const modalContent = document.getElementById("modalContent");

  function openTopic(key) {

    const topic = topicData[key];

    if (!topic) return;

    modalKicker.textContent = topic.kicker;
    modalTitle.textContent = topic.title;
    modalContent.innerHTML = topic.content;

    topicModal.classList.add("open");
    document.body.style.overflow = "hidden";

    document.getElementById("closeTopic").focus();
  }

  function closeTopic() {
    topicModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".open-topic").forEach(button => {

    button.addEventListener("click", () => {
      openTopic(button.dataset.topic);
    });

  });

  document.getElementById("closeTopic").addEventListener("click", closeTopic);
  document.getElementById("modalDone").addEventListener("click", closeTopic);

  topicModal.addEventListener("click", event => {
    if (event.target === topicModal) closeTopic();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeTopic();
  });


  // ========================================
  // 5. TARJETAS DE DERECHOS
  // ========================================

  document.querySelectorAll(".right-card").forEach(card => {

    function toggleCard() {

      const wasExpanded = card.classList.contains("expanded");

      document.querySelectorAll(".right-card").forEach(other => {
        other.classList.remove("expanded");
        other.setAttribute("aria-expanded", "false");
      });

      if (!wasExpanded) {
        card.classList.add("expanded");
        card.setAttribute("aria-expanded", "true");
      }

    }

    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    card.addEventListener("click", toggleCard);

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });

  });


  // ========================================
  // 6. SISTEMA DE PESTAÑAS DE JUEGOS
  // ========================================

  const gameTabs = document.querySelectorAll(".game-tab");
  const gamePanels = document.querySelectorAll(".game-panel");

  gameTabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const selected = tab.dataset.game;

      gameTabs.forEach(item => item.classList.remove("active"));
      gamePanels.forEach(panel => panel.classList.remove("active"));

      tab.classList.add("active");

      const panel = document.getElementById("game-" + selected);

      if (panel) panel.classList.add("active");

    });

  });


  // ========================================
  // 7. JUEGO: EL DILEMA
  // ========================================

  const dilemmas = [

    {
      title: "La decisión incómoda.",
      text: "Durante un trabajo grupal, tus compañeros deciden excluir a una estudiante porque consideran que no aporta nada. Tú sabes que no le dieron oportunidad de participar. Cuando propones incluirla, te responden que no compliques las cosas.",
      question: "¿Cómo actuarías ante esta situación?",
      choices: [
        {
          label: "A. Aceptar la decisión. No quieres generar problemas con el grupo.",
          feedback: "Evitar un desacuerdo puede parecer conveniente a corto plazo, pero también permite que una decisión injusta continúe. Es importante reconocer cuándo el deseo de aceptación está influyendo en tu conducta.",
          analysis: "Has priorizado la tranquilidad del grupo sobre la oportunidad de participación de una compañera."
        },
        {
          label: "B. Exigir que la incluyan, pero sin escuchar las razones de nadie.",
          feedback: "Reconocer una injusticia es importante, pero la forma de enfrentarla también importa. Una respuesta que no escucha ni busca diálogo puede generar un nuevo conflicto.",
          analysis: "Tu intención es defender la inclusión, pero necesitas considerar el diálogo y las posibles soluciones."
        },
        {
          label: "C. Cuestionar la exclusión, escuchar las razones y proponer una distribución justa del trabajo.",
          feedback: "Esta alternativa busca combinar el respeto por los derechos, la participación y la resolución pacífica del conflicto. No significa que sea la única respuesta posible, pero ofrece razones que puedes defender.",
          analysis: "Has considerado la dignidad de la estudiante, el diálogo y la responsabilidad colectiva."
        }
      ]
    },

    {
      title: "El precio de pertenecer.",
      text: "Un grupo de amigos organiza una actividad y decide que un compañero no puede participar porque no tiene los mismos recursos económicos que ellos. Algunos dicen que no es discriminación, porque simplemente quieren mantener su plan.",
      question: "¿Qué harías y qué principio defenderías?",
      choices: [
        {
          label: "A. No intervenir. Cada grupo tiene derecho a elegir con quién estar.",
          feedback: "Es cierto que las personas pueden elegir sus amistades, pero eso no justifica humillar o excluir a alguien por su situación económica. Conviene analizar la diferencia entre una preferencia personal y una conducta discriminatoria.",
          analysis: "Tu respuesta no distingue suficientemente entre la libertad individual y el respeto a la dignidad de los demás."
        },
        {
          label: "B. Proponer una alternativa que permita participar sin que los recursos sean una barrera.",
          feedback: "Esta propuesta reconoce que las diferencias económicas no deben convertirse en motivo de humillación o exclusión. También busca una solución práctica que no dependa solamente de señalar culpables.",
          analysis: "Has considerado la igualdad de oportunidades y la participación."
        },
        {
          label: "C. Acusar públicamente a todos sin intentar comprender la situación.",
          feedback: "Identificar un problema es necesario, pero atribuir responsabilidades sin dialogar puede dificultar su resolución. Puedes cuestionar una conducta y, al mismo tiempo, buscar cambios concretos.",
          analysis: "Tu intención es denunciar una injusticia, pero debes pensar en cómo conseguir una solución efectiva."
        }
      ]
    },

    {
      title: "Cuando todos callan.",
      text: "Durante una exposición, una estudiante expresa una opinión diferente a la mayoría. Sus compañeros comienzan a interrumpirla y se burlan de sus argumentos. La profesora todavía no interviene.",
      question: "¿Qué respuesta demuestra mayor autonomía moral?",
      choices: [
        {
          label: "A. Guardar silencio porque la mayoría parece estar de acuerdo.",
          feedback: "La popularidad de una opinión no demuestra que sea correcta. El silencio también puede contribuir a que una situación injusta continúe.",
          analysis: "Necesitas diferenciar entre estar de acuerdo y simplemente seguir la opinión dominante."
        },
        {
          label: "B. Defender su derecho a expresarse y pedir que se escuchen sus argumentos.",
          feedback: "Esta respuesta reconoce la libertad de expresión y el respeto por las opiniones ajenas. No es necesario compartir una idea para reconocer el derecho de alguien a expresarla.",
          analysis: "Has identificado el derecho involucrado y propuesto una acción respetuosa."
        },
        {
          label: "C. Interrumpir a los demás para imponer la opinión contraria.",
          feedback: "Defender una opinión no significa reproducir la misma falta de respeto que estás cuestionando. La participación democrática exige escuchar incluso cuando existe desacuerdo.",
          analysis: "Tu objetivo puede ser justo, pero debes mantener coherencia entre tus principios y tus acciones."
        }
      ]
    }

  ];

  let dilemmaIndex = 0;

  const dilemmaTitle = document.getElementById("dilemmaTitle");
  const dilemmaText = document.getElementById("dilemmaText");
  const dilemmaQuestion = document.getElementById("dilemmaQuestion");
  const dilemmaChoices = document.getElementById("dilemmaChoices");
  const dilemmaFeedback = document.getElementById("dilemmaFeedback");
  const dilemmaCounter = document.getElementById("dilemmaCounter");
  const nextDilemma = document.getElementById("nextDilemma");

  function renderDilemma() {

    const item = dilemmas[dilemmaIndex];

    dilemmaTitle.textContent = item.title;
    dilemmaText.textContent = item.text;
    dilemmaQuestion.textContent = item.question;

    dilemmaCounter.textContent =
      String(dilemmaIndex + 1).padStart(2, "0") +
      " — " +
      String(dilemmas.length).padStart(2, "0");

    dilemmaFeedback.classList.remove("show");
    dilemmaFeedback.innerHTML = "";
    nextDilemma.hidden = true;
    dilemmaChoices.innerHTML = "";

    item.choices.forEach((choice, index) => {

      const button = document.createElement("button");

      button.className = "choice-button";
      button.textContent = choice.label;

      button.addEventListener("click", () => {

        dilemmaChoices.querySelectorAll("button").forEach(btn => {
          btn.disabled = true;
          btn.classList.remove("selected");
        });

        button.classList.add("selected");

        dilemmaFeedback.innerHTML = `
          <strong>ANÁLISIS DE TU ELECCIÓN</strong>
          <br><br>
          ${choice.feedback}
          <br><br>
          <strong>¿Qué revela tu decisión?</strong>
          <br>
          ${choice.analysis}
        `;

        dilemmaFeedback.classList.add("show");

        nextDilemma.hidden = false;

        nextDilemma.textContent =
          dilemmaIndex === dilemmas.length - 1
            ? "VOLVER A EMPEZAR ↻"
            : "SIGUIENTE DILEMA ↗";

      });

      dilemmaChoices.appendChild(button);

    });

  }

  nextDilemma.addEventListener("click", () => {

    if (dilemmaIndex < dilemmas.length - 1) {
      dilemmaIndex++;
    } else {
      dilemmaIndex = 0;
    }

    renderDilemma();

  });

  renderDilemma();


  // ========================================
  // 8. JUEGO: DETRÁS DE LA BROMA
  // ========================================

  const observerOptions = document.querySelectorAll(".observer-option");
  const observerFeedback = document.getElementById("observerFeedback");
  const observerReset = document.getElementById("observerReset");

  observerOptions.forEach(option => {

    option.addEventListener("click", () => {

      observerOptions.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("correct");
      });

      const answer = option.dataset.answer;

      if (answer === "a") {

        option.classList.add("correct");

        observerFeedback.innerHTML = `
          <strong>ANÁLISIS CORRECTO.</strong>
          <br><br>
          La repetición de los comentarios y la desestimación del
          malestar de la persona afectada son elementos importantes.
          No se trata solamente de la intención de quien hace una broma,
          sino también de su contexto, repetición e impacto.
          <br><br>
          <strong>Para profundizar:</strong>
          ¿Por qué crees que una persona puede tener dificultades
          para expresar que una conducta le está afectando?
        `;

      } else {

        observerFeedback.innerHTML = `
          <strong>VUELVE A ANALIZAR.</strong>
          <br><br>
          Tu respuesta no considera suficientemente la situación
          de la persona afectada. Piensa en la repetición de los
          comentarios y en lo que ocurre cuando alguien expresa
          claramente que algo le incomoda.
          <br><br>
          No basta con identificar la intención de quien habla.
          También importa el impacto de sus acciones.
        `;

      }

      observerFeedback.classList.add("show");

    });

  });

  observerReset.addEventListener("click", () => {

    observerOptions.forEach(option => {
      option.disabled = false;
      option.classList.remove("correct");
    });

    observerFeedback.classList.remove("show");
    observerFeedback.innerHTML = "";

  });


  // ========================================
  // 9. JUEGO: EL EFECTO DOMINÓ
  // ========================================

  const dominoStory = document.getElementById("dominoStory");
  const dominoQuestion = document.getElementById("dominoQuestion");
  const dominoOptions = document.getElementById("dominoOptions");
  const dominoFeedback = document.getElementById("dominoFeedback");
  const dominoReset = document.getElementById("dominoReset");

  let dominoStage = 0;
  let dominoPath = "";

  const dominoBranches = {

    share: {
      story: "La imagen comienza a circular en otros grupos. Alguien la guarda y la utiliza para hacer nuevos comentarios. La persona afectada se entera de que más estudiantes la han visto.",
      question: "Ahora que conoces el alcance de lo ocurrido, ¿qué podrías hacer?",
      options: [
        {
          text: "Reconocer tu participación, dejar de difundirla y contribuir a detener su circulación.",
          feedback: "Reconocer la responsabilidad es un primer paso. No puedes garantizar que desaparezcan todas las copias, pero sí puedes dejar de contribuir a su difusión, evitar nuevas reproducciones y buscar apoyo para proteger a la persona afectada."
        },
        {
          text: "Decir que no tienes responsabilidad porque no creaste la imagen.",
          feedback: "No haber creado el contenido no significa que compartirlo sea una acción neutral. Cada persona puede contribuir a ampliar el alcance de una situación perjudicial."
        }
      ]
    },

    ignore: {
      story: "La imagen sigue circulando. Aunque no participaste directamente, observas que la persona afectada comienza a recibir comentarios y se aleja del grupo.",
      question: "¿Qué responsabilidad puedes asumir ahora?",
      options: [
        {
          text: "Acercarme a la persona, no difundir el contenido y buscar apoyo para detener la situación.",
          feedback: "Una intervención responsable no requiere que enfrentes todo el problema por tu cuenta. Puedes ofrecer apoyo, evitar amplificar el contenido y acudir a un adulto de confianza o a los canales de protección de tu institución."
        },
        {
          text: "Seguir sin intervenir porque no fui quien compartió la imagen.",
          feedback: "No participar directamente es importante, pero existen otras formas de actuar. La indiferencia puede dejar a la persona afectada sin apoyo y permitir que el problema continúe."
        }
      ]
    },

    support: {
      story: "Decides no difundir la imagen, apoyas al compañero y buscas orientación. El grupo comienza a cuestionar si compartir ese contenido fue correcto.",
      question: "¿Qué podrías hacer para contribuir a que no vuelva a suceder?",
      options: [
        {
          text: "Promover acuerdos sobre el respeto, la privacidad y el uso responsable de los grupos digitales.",
          feedback: "Esta acción va más allá de resolver el momento. Propone prevenir futuras situaciones mediante acuerdos de convivencia y responsabilidad digital."
        },
        {
          text: "Exigir que todos piensen exactamente igual que tú.",
          feedback: "La convivencia democrática no exige uniformidad de opiniones. Lo importante es establecer límites frente a conductas que vulneran derechos y dialogar sobre sus consecuencias."
        }
      ]
    }

  };

  function renderDominoOptions(options) {

    dominoOptions.innerHTML = "";

    options.forEach(option => {

      const button = document.createElement("button");
      button.textContent = option.text;

      button.addEventListener("click", () => {

        dominoOptions.querySelectorAll("button").forEach(btn => {
          btn.disabled = true;
        });

        button.classList.add("selected");

        dominoFeedback.innerHTML = `
          <strong>CONSECUENCIAS Y REFLEXIÓN</strong>
          <br><br>
          ${option.feedback}
          <br><br>
          <strong>Recuerda:</strong>
          una decisión responsable considera los derechos
          de las personas involucradas y sus posibles consecuencias.
        `;

        dominoFeedback.classList.add("show");

      });

      dominoOptions.appendChild(button);

    });

  }

  function startDomino() {

    dominoStage = 0;
    dominoPath = "";

    dominoStory.textContent =
      "Descubres que están difundiendo una imagen de un compañero para burlarse de él. En el grupo de chat, todos reaccionan con emojis y comentarios. Tú recibes el mensaje.";

    dominoQuestion.textContent = "¿Cuál sería tu primera acción?";

    dominoFeedback.classList.remove("show");
    dominoFeedback.innerHTML = "";

    renderDominoOptions([
      {
        text: "Compartirla con otros amigos.",
        path: "share"
      },
      {
        text: "No participar y no hacer nada más.",
        path: "ignore"
      },
      {
        text: "No difundirla, apoyar al compañero y buscar ayuda si es necesario.",
        path: "support"
      }
    ]);

    dominoOptions.querySelectorAll("button").forEach((button, index) => {

      button.addEventListener("click", () => {

        dominoPath = ["share", "ignore", "support"][index];

        const branch = dominoBranches[dominoPath];

        dominoStage = 1;

        dominoStory.textContent = branch.story;
        dominoQuestion.textContent = branch.question;

        dominoFeedback.classList.remove("show");
        dominoFeedback.innerHTML = "";

        renderDominoOptions(branch.options);

      });

    });

  }

  dominoReset.addEventListener("click", startDomino);

  startDomino();


  // ========================================
  // 10. DIARIO DE REFLEXIÓN
  // ========================================

  const reflectionInput = document.getElementById("reflectionInput");
  const characterCount = document.getElementById("characterCount");
  const saveReflection = document.getElementById("saveReflection");
  const reflectionMessage = document.getElementById("reflectionMessage");

  try {
    reflectionInput.value = localStorage.getItem("fdm-reflection") || "";
  } catch (error) {
    reflectionMessage.textContent = "El almacenamiento local no está disponible.";
  }

  characterCount.textContent = reflectionInput.value.length + " / 800";

  reflectionInput.addEventListener("input", () => {
    characterCount.textContent =
      reflectionInput.value.length + " / 800";
  });

  saveReflection.addEventListener("click", () => {

    const answer = reflectionInput.value.trim();

    if (answer.length < 20) {

      reflectionMessage.textContent =
        "Desarrolla un poco más tu reflexión antes de guardarla.";

      return;

    }

    try {
      localStorage.setItem("fdm-reflection", answer);

      reflectionMessage.textContent =
        "Tu reflexión ha sido guardada en este dispositivo. Gracias por tomarte el tiempo de pensar.";

    } catch (error) {

      reflectionMessage.textContent =
        "No fue posible guardar tu reflexión en este navegador.";

    }

  });


  // ========================================
  // 11. COMPROMISO PERSONAL
  // ========================================

  const commitmentOptions =
    document.querySelectorAll(".commitment-option");

  const commitmentResult =
    document.getElementById("commitmentResult");

  commitmentOptions.forEach(option => {

    option.addEventListener("click", () => {

      commitmentOptions.forEach(item => {
        item.classList.remove("selected");
      });

      option.classList.add("selected");

      commitmentResult.textContent =
        "Tu compromiso: " + option.textContent.trim() +
        " Cada pequeña acción puede contribuir a una convivencia más justa.";

      try {
        localStorage.setItem(
          "fdm-commitment",
          option.textContent.trim()
        );
      } catch (error) {
        // La selección sigue funcionando aunque no se pueda guardar.
      }

    });

  });


  // ========================================
  // 12. GENERADOR DE CÓDIGO QR
  // ========================================

  const qrContainer = document.getElementById("qrcode");
  const qrStatus = document.getElementById("qrStatus");

  function generateQR() {

    if (typeof QRCode === "undefined") {
      qrStatus.textContent =
        "No se pudo cargar el generador QR. Revisa tu conexión.";
      return;
    }

    const currentURL = window.location.href;

    const isPublished =
      currentURL.startsWith("https://") ||
      currentURL.startsWith("http://");

    if (!isPublished || currentURL.includes("localhost") ||
        currentURL.includes("127.0.0.1")) {

      qrStatus.textContent =
        "Publica la web en GitHub Pages para generar un QR que funcione desde otros dispositivos.";

      qrContainer.innerHTML =
        '<span style="font-size:12px;text-align:center;color:#712a40;padding:15px;">EL QR APARECERÁ<br>AL PUBLICAR LA WEB</span>';

      return;
    }

    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
      text: currentURL,
      width: 190,
      height: 190,
      colorDark: "#171315",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    qrStatus.textContent =
      "Código generado. Escanea para visitar la página.";

  }

  generateQR();


  // ========================================
  // 13. RESTAURAR COMPROMISO GUARDADO
  // ========================================

  try {

    const savedCommitment =
      localStorage.getItem("fdm-commitment");

    if (savedCommitment) {

      commitmentOptions.forEach(option => {

        if (option.textContent.trim() === savedCommitment) {

          option.classList.add("selected");

          commitmentResult.textContent =
            "Tu compromiso: " + savedCommitment;

        }

      });

    }

  } catch (error) {
    // La página sigue funcionando sin almacenamiento local.
  }


  // ========================================
  // 14. AÑO AUTOMÁTICO EN CONSOLA
  // ========================================

  console.log(
    "%c FUERA DEL MOLDE. ",
    "background:#85384b;color:white;font-size:20px;padding:10px;font-weight:bold;"
  );

  console.log(
    "Piensa. Cuestiona. Decide."
  );

});
