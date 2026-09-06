/* ============================================
   INITIALIZE LUCIDE ICONS
============================================ */

document.addEventListener("DOMContentLoaded", () => {
    /* =========================================
   DESCRIPTION CHARACTER COUNTER
========================================= */

function setupCharacterCounter() {

    const textarea =
        document.getElementById("supportDescription");

    const counter =
        document.getElementById("characterCount");


    if (!textarea || !counter) {
        return;
    }


    function updateCounter() {

        counter.textContent =
            `${textarea.value.length} / 500`;

    }


    textarea.addEventListener(
        "input",
        updateCounter
    );


    /* Restore previous description */

    const savedDescription =
        localStorage.getItem(
            "supportDescription"
        );


    if (savedDescription) {

        textarea.value =
            savedDescription;

        updateCounter();

    }

}
    if (window.lucide) {
        lucide.createIcons();
    }

});


/* ============================================
   GET ELEMENTS
============================================ */

const startChatBtn =
    document.getElementById("startChatBtn");

const chatModal =
    document.getElementById("chatModal");

const closeChatBtn =
    document.getElementById("closeChatBtn");

const chatInput =
    document.getElementById("chatInput");

const sendMessageBtn =
    document.getElementById("sendMessageBtn");

const chatBody =
    document.getElementById("chatBody");

const toast =
    document.getElementById("toast");

const notificationBtn =
    document.getElementById("notificationBtn");

const calmBtn =
    document.getElementById("calmBtn");

const journalBtn =
    document.getElementById("journalBtn");

const guidanceBtn =
    document.getElementById("guidanceBtn");

const recommendationBtn =
    document.getElementById("recommendationBtn");

const professionalBtn =
    document.getElementById("professionalBtn");

const communityBtn =
    document.getElementById("communityBtn");

const helplineBtn =
    document.getElementById("helplineBtn");


/* ============================================
   TOAST NOTIFICATION
============================================ */

let toastTimer;

function showToast(message) {

    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* ============================================
   OPEN CHAT MODAL
============================================ */

function openChat() {

    if (!chatModal) return;

    chatModal.classList.add("active");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        if (chatInput) {
            chatInput.focus();
        }

    }, 300);

}


/* ============================================
   CLOSE CHAT MODAL
============================================ */

function closeChat() {

    if (!chatModal) return;

    chatModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* ============================================
   START CHAT BUTTON
============================================ */

if (startChatBtn) {

    startChatBtn.addEventListener("click", () => {

        openChat();

    });

}


/* ============================================
   CLOSE CHAT BUTTON
============================================ */

if (closeChatBtn) {

    closeChatBtn.addEventListener("click", () => {

        closeChat();

    });

}


/* ============================================
   CLOSE MODAL ON BACKGROUND CLICK
============================================ */

if (chatModal) {

    chatModal.addEventListener("click", (event) => {

        if (event.target === chatModal) {

            closeChat();

        }

    });

}


/* ============================================
   ESCAPE KEY
============================================ */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeChat();

    }

});


/* ============================================
   ADD USER MESSAGE
============================================ */

function addUserMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.classList.add(
        "user-message"
    );

    messageElement.textContent =
        message;

    chatBody.appendChild(
        messageElement
    );

    scrollChatToBottom();

}


/* ============================================
   ADD BOT MESSAGE
============================================ */

function addBotMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.classList.add(
        "bot-message"
    );

    messageElement.textContent =
        message;

    chatBody.appendChild(
        messageElement
    );

    scrollChatToBottom();

}


/* ============================================
   CHAT SCROLL
============================================ */

function scrollChatToBottom() {

    if (!chatBody) return;

    chatBody.scrollTop =
        chatBody.scrollHeight;

}


/* ============================================
   SEND MESSAGE
============================================ */

async function sendMessage() {

    if (!chatInput || !chatBody) return;

    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }

    // Display user message immediately
    addUserMessage(message);

    // Clear input
    chatInput.value = "";

    // Disable input while AI is responding
    chatInput.disabled = true;
    sendMessageBtn.disabled = true;

    // Create typing indicator
    const typingElement =
        document.createElement("div");

    typingElement.classList.add(
        "bot-message",
        "typing-message"
    );

    typingElement.textContent =
        "Wellness Assistant is typing...";

    chatBody.appendChild(typingElement);

    scrollChatToBottom();

    try {

        const response = await fetch(
            "http://localhost:5000/api/chat/message",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    message: message,
                }),
            }
        );

        const data = await response.json();

        // Remove typing indicator
        typingElement.remove();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Could not get AI response"
            );

        }

        // Display Groq AI response
        addBotMessage(
            data.data.assistantMessage
        );

    } catch (error) {

        console.error(
            "Chat API error:",
            error
        );

        typingElement.remove();

        addBotMessage(
            "Sorry, I couldn't connect to the Wellness Assistant. Please try again."
        );

    } finally {

        // Enable input again
        chatInput.disabled = false;
        sendMessageBtn.disabled = false;

        chatInput.focus();

    }

}


/* ============================================
   SEND BUTTON
============================================ */

if (sendMessageBtn) {

    sendMessageBtn.addEventListener(
        "click",
        sendMessage
    );

}


/* ============================================
   ENTER KEY
============================================ */

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                sendMessage();

            }

        }
    );

}


/* ============================================
   TOPIC BUTTONS
============================================ */

const topicButtons =
    document.querySelectorAll(".topic-btn");


topicButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const topicElement =
            button.querySelector("span");

        const topic =
            topicElement
                ? topicElement.textContent.trim()
                : button.textContent.trim();


        openChat();


        setTimeout(() => {

            addUserMessage(
                `I want to talk about ${topic.toLowerCase()}.`
            );


            setTimeout(() => {

                addBotMessage(
                    `Of course. We can talk about ${topic.toLowerCase()}. Take your time and share whatever is on your mind.`
                );

            }, 600);

        }, 300);

    });

});


/* ============================================
   CALM DOWN BUTTON
============================================ */

if (calmBtn) {

    calmBtn.addEventListener("click", () => {

        showToast(
            "Let's begin a short breathing exercise. Breathe in slowly..."
        );

    });

}


/* ============================================
   JOURNAL BUTTON
============================================ */

if (journalBtn) {

    journalBtn.addEventListener("click", () => {

        showToast(
            "Opening your private journal..."
        );

    });

}


/* ============================================
   GUIDANCE BUTTON
============================================ */

if (guidanceBtn) {

    guidanceBtn.addEventListener("click", () => {

        showToast(
            "Exploring personalized wellness guidance..."
        );

    });

}


/* ============================================
   RECOMMENDATION BUTTON
============================================ */

if (recommendationBtn) {

    recommendationBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Opening your personalized bedtime routine..."
            );

        }
    );

}


/* ============================================
   PROFESSIONAL SUPPORT
============================================ */

if (professionalBtn) {

    professionalBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "professional-support.html";

        }
    );

}


/* ============================================
   COMMUNITY
============================================ */

if (communityBtn) {

    communityBtn.addEventListener(
        "click",
        () => {

            window.location.href =
                "community.html";

        }
    );

}


/* ============================================
   HELPLINES
============================================ */

if (helplineBtn) {

    helplineBtn.addEventListener(
        "click",
        () => {

            showToast(
                "Opening emergency and support helplines..."
            );

        }
    );

}


/* ============================================
   NOTIFICATION BUTTON
============================================ */

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        () => {

            const badge =
                notificationBtn.querySelector(
                    ".notification-badge"
                );


            if (badge) {

                badge.style.display = "none";

            }


            showToast(
                "You have checked all your notifications."
            );

        }
    );

}


/* ============================================
   NAVIGATION
============================================ */

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach((item) => {

    item.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            navItems.forEach((navItem) => {

                navItem.classList.remove(
                    "active"
                );

            });


            item.classList.add(
                "active"
            );

        }
    );

});