/**
 * @fileoverview Notification for displaying errors to the user in the notifcation window
 * @author Alex Dawson
 */

'use strict';

var IdeNotification = (function () { //jshint ignore:line
  IdeNotification.TYPE_ERROR = "ERROR";
  IdeNotification.TYPE_WARNING = "WARNING";
  IdeNotification.TYPE_POSITIVE = "POSITIVE";

  IdeNotification.Type = {
    "ERROR" : "error",
    "WARNING" : "warning",
    "POSITIVE" : "positive"
  };

  /**
   * Constructor for IdeNotification type.
   * @param {!String} message The message the notification should display
   * @param {!String} notificationType The type of notification to display, if it is not found in  IdeNotification.Type a default style is applied.
   * @param {!int} timeout Optional, the time in millis before the  notification should remove itself.
   * @param {!Boolean} userRemovable Optional. True if the user should be able to remove the notification, otherwise false
   * @return {IdeNotification} A new notification object.
   */
  function IdeNotification (message, notificationType, timeout, userRemovable) {
      var element = document.createElement('span');
      var notificationBox = document.getElementById('notificationBox');
      notificationBox.insertBefore(element, notificationBox.childNodes[0]);
      element.className += " notification";
      element.className += ' ' + IdeNotification.Type[notificationType] || ' default';

      var date = new Date();
      element.textContent = '[' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] ' + message;

      var spacer = document.createElement('span');
      spacer.className += "spacer1";
      element.appendChild(spacer);


      if (userRemovable === undefined || userRemovable === true) {
        var removeButton = document.createElement('i');
        removeButton.className += "fa fa-times exitButton";
        removeButton.ariaHidden = true;
        removeButton.title = "Remove this notification";
        removeButton.style.color = element.style.borderColor;

        removeButton.addEventListener('click', function () {
          IdeNotification.removeNotification(element);
        }, true);

        element.appendChild(removeButton);
        setTimeout(function () {
          element.classList.add("notificationShow");
        }, 50);
      }

      if (timeout) {
        setTimeout(function () {
          IdeNotification.removeNotification(element);
        }, timeout);
      }
  }

  IdeNotification.removeNotification = function (notification) {
    var notificationBox = document.getElementById('notificationBox');
    notification.classList.remove("notificationShow");
    notification.classList.add("notificationHide");
    setTimeout(function() {notificationBox.removeChild(notification)}, 300);
  }

  return IdeNotification;
}());

function clearAllNotifications () {
  var notificationBox = document.getElementById('notificationBox');
  notificationBox.childNodes.forEach(function (child) {
    child.classList.remove('notificationShow');
    child.classList.add('notificationHide');
    setTimeout(function() {notificationBox.removeChild(child)}, 600);
  });
}

/**
 * Event handler for the 'clear notifications' button in the notifcation window
 */
document.getElementById('clearNotificationsButton').addEventListener('click', function () {
  clearAllNotifications();
}, true);
