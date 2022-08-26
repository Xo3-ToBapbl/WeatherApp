export function NotificationModel() {
  const model = {
    notificationElement: document.querySelector(".b__notification"),
    textElement: document.querySelector(".b__notification_message"),

    openNotification(message) {
      this.textElement.innerText = message;
      if (!this.notificationElement.classList.contains("b__notification_open")) {
        this.notificationElement.classList.add("b__notification_open");
      }
    },

    closeButtonClicked: closeButtonClicked,
  };

  document.querySelector(".b__notification_close").onclick = model.closeButtonClicked.bind(model);
  return model;

  function closeButtonClicked() {
    this.notificationElement.classList.remove("b__notification_open");
  }
}