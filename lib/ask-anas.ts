export const ASK_ANAS_OPEN = "ask-anas:open";

export function openAskAnas() {
  window.dispatchEvent(new Event(ASK_ANAS_OPEN));
}
