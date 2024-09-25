// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';
// eslint-disable-next-line import/no-extraneous-dependencies
import { schedules } from "@trigger.dev/sdk/v3";

// Define the task
export const callEndpointTask = schedules.task({
  id: "call-endpoint-every-5-seconds",
  cron: "* * * * *",
  run: async () => {
    try {
      // Make the API call
      const response = await fetch('https://cryptogpt.app/api/auth/token/', {
        method: 'POST',
        body: JSON.stringify({ token: "1234567890" }),
      });

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  },
});
