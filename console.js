(() => {
  let popup;

  document.addEventListener("keydown", e => {
    if (event.altKey && event.shiftKey && (event.key === 'E' || event.key === 'e')) {
      event.preventDefault();

      if (!popup || popup.closed) {
        popup = window.open("", "DevPopup", "width=600,height=450,resizable,scrollbars");
        
        // Basic styling
        popup.document.head.innerHTML = `
          <meta charset="utf-8">
          <title>Developer Console</title>
          <style>
            html, body {
              height: 100%;
              margin: 0;
              background: #000;
              color: #0f0;
              font-family: monospace;
            }
            #header { margin-top: 15px; margin-left: 8px; }
            #output {
              padding: 8px;
              overflow: auto;
              white-space: pre-wrap;
              height: calc(100% - 80px);
              box-sizing: border-box;
            }
            #input {
              width: 100%;
              box-sizing: border-box;
              padding: 8px;
              border: none;
              outline: none;
              background: #111;
              color: #0f0;
              font-family: monospace;
            }
          </style>
        `;

        popup.document.body.innerHTML = `
          <h3 id="header">Developer Console</h3>
          <div id="output"></div>
          <input id="input" placeholder="Type JS command and press Enter" autofocus />
        `;

        const input = popup.document.getElementById("input");
        const output = popup.document.getElementById("output");

        const history = [];
        let histIdx = -1;

        function append(text) {
          const line = popup.document.createElement("div");
          line.textContent = text;
          output.appendChild(line);
          output.scrollTop = output.scrollHeight;
        }

        input.addEventListener("keydown", ev => {
          if (ev.key === "Enter") {
            const cmd = input.value.trim();
            if (!cmd) return;
            input.value = "";
            history.push(cmd);
            histIdx = history.length;
            append("> " + cmd);
            try {
              // eslint-disable-next-line no-eval
              const result = eval(cmd);
              append(result === undefined ? "" : result);
            } catch (err) {
              append("Error: " + (err && err.message ? err.message : err));
            }
          } else if (ev.key === "ArrowUp") {
            if (history.length && histIdx > 0) { histIdx--; input.value = history[histIdx]; }
            else if (history.length && histIdx === -1) { histIdx = history.length - 1; input.value = history[histIdx]; }
            ev.preventDefault();
          } else if (ev.key === "ArrowDown") {
            if (history.length && histIdx < history.length - 1) { histIdx++; input.value = history[histIdx]; }
            else { histIdx = history.length; input.value = ""; }
            ev.preventDefault();
          } else if (ev.key === "Escape") {
            popup.close();
          }
        });

        input.focus();

        // close popup if main page unloads
        window.addEventListener("beforeunload", () => { try { if (popup && !popup.closed) popup.close(); } catch {} });

      } else {
        popup.focus();
      }
    }
  }, true);
})();
function panic() {
  window.close()
    }