const buttonContainer = document.getElementById("buttonDiv");

const selectedClassName = "current";

const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function handleButtonClick(event) {
    let last = event.target.parentElement.querySelector(
        `${selectedClassName}`
    );

    if (last && last === event.target) {
        return;
    }

    const color = event.target.dataset.color;
    chrome.storage.sync.set({ color });

    // last.classList.remove(selectClassName);
    event.target.classList.add(selectedClassName);
}

function constractOptons(buttonColors) {
    chrome.storage.sync.get("color", (data) => {
        const currentColor = data.color;
    
        for (const buttonColor of buttonColors) {
            const button = document.createElement("button");
            button.style.backgroundColor = buttonColor;
            button.dataset.color = buttonColor;
    
            if (buttonColor === currentColor) {
                button.classList.add(selectedClassName);
            }
    
            button.addEventListener("click", handleButtonClick);
            buttonContainer.appendChild(button);
        }
    });
}

constractOptons(presetButtonColors);
