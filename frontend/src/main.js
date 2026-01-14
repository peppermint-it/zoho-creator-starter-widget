import "./style.css";
import { getRecordId, zohoUpdateEmail } from "./zoho.js";

const root = document.getElementById("app");
if (!root) throw new Error("Root element #app not found");

root.innerHTML = `
  <div class="mx-auto max-w-md p-6">
    <h1 class="text-center text-3xl font-semibold">Widget</h1>
    <p class="mt-2 text-center text-sm text-slate-600">
      Built with Vite + Tailwind. Connect to Zoho Creator when running inside Creator.
    </p>

    <form id="email-form" class="mt-6 rounded-lg border bg-white p-4">
      <label for="email" class="block text-sm font-medium">Email</label>
      <input
        id="email"
        type="email"
        required
        class="mt-2 w-full rounded border px-3 py-2"
        placeholder="name@example.com"
      />
      <button
        type="submit"
        class="mt-4 w-full rounded bg-blue-600 px-4 py-2 font-medium text-white"
      >
        Save
      </button>
      <pre id="status" class="mt-4 whitespace-pre-wrap text-xs text-slate-700"></pre>
    </form>
  </div>
`;

const statusEl = document.getElementById("status");
const emailFormEl = document.getElementById("email-form");

function setStatus(message) {
  if (statusEl) statusEl.textContent = message;
}

emailFormEl?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email")?.value?.trim();
  if (!email) return;

  const recordId = await getRecordId();
  if (!recordId) {
    setStatus("No record id found. Pass `?recordId=...` or configure widget params.");
    return;
  }

  try {
    setStatus(`Updating record ${recordId}...`);
    const response = await zohoUpdateEmail({ recordId, email });
    setStatus(JSON.stringify(response, null, 2));
  } catch (error) {
    setStatus(String(error?.message || error));
  }
});

