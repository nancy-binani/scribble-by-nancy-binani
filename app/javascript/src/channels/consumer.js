// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable";

import { getFromLocalStorage } from "utils/storage";

const buildWebsocketURL = () => {
  const authUserId = getFromLocalStorage("authUserId");

  return encodeURI(`/cable?user_id=${authUserId}`);
};

export default () => createConsumer(buildWebsocketURL());
