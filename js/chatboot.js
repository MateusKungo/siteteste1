








document.addEventListener('DOMContentLoaded', () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector("#send-btn");

  let userMessage = null; 
  const inputInitHeight = chatInput.scrollHeight;
  const API_KEY = "AIzaSyC0que_Sb2lmo8cKcGqxLpAnyU-Uaw0gsw"; // Substitua por sua chave real
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    chatLi.innerHTML = className === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    return chatLi;
  };

  const generateResponse = async (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    const fullPrompt = `
Você é um assistente virtual da empresa NCSistemas. Sua função é responder dúvidas dos clientes sobre os serviços oferecidos pela empresa, de forma objetiva, cordial e profissional. Os principais serviços da NCSistemas são:

1. Segurança da Informação
   - LGPD, GDPR, ISO 27001
   - Pentest, gestão de riscos, resposta a incidentes
   - Treinamentos de conscientização

2. Transformação Digital
   - Migração para nuvem (AWS, Azure, Google Cloud)
   - Modernização de sistemas legados
   - RPA, BPM, IA e Machine Learning

3. Infraestrutura e Cloud Computing
   - Redes, data centers, virtualização (Docker, Kubernetes)
   - Otimização de custos, recuperação de desastres

4. Desenvolvimento de Software e DevOps
   - Microsserviços, serverless, CI/CD
   - Métodos ágeis (Scrum, Kanban), Code Review, SonarQube

5. Experiência do Usuário (UX/UI)
   - Pesquisa de usuários, protótipos, acessibilidade e usabilidade

6. Monitoramento e Automação
   - Zabbix, Grafana, Dynatrace, scripts proativos
   - Integração com ITIL, ServiceDesk, JIRA
   - Alertas via Teams ou SMS

Sempre que alguém fizer uma pergunta, responda com base nesses serviços. Se não tiver informação suficiente, diga que vai encaminhar para um especialista.

Agora, responda a seguinte pergunta do cliente: ${userMessage}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        contents: [{ 
          role: "user", 
          parts: [{ text: fullPrompt }] 
        }] 
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      messageElement.textContent = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
    } catch (error) {
      messageElement.classList.add("error");
      messageElement.textContent = error.message;
    } finally {
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  };

  const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      const incomingChatLi = createChatLi("Pensando...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  };

  chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      handleChat();
    }
  });

  sendChatBtn.addEventListener("click", handleChat);
  closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});