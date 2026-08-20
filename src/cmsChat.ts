/** Global CMS Assistant — same widget and conversation on every page. */
export const CMS_CHAT_OPEN_EVENT = 'fusion:cms-chat-open'

export function openCmsChat() {
  window.dispatchEvent(new CustomEvent(CMS_CHAT_OPEN_EVENT))
}
