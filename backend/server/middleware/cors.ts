export default defineEventHandler((event) => {
  setHeader(event, "Access-Control-Allow-Origin", "*"); // ou domínio específico
  setHeader(event, "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  setHeader(event, "Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (getMethod(event) === "OPTIONS") {
    setResponseStatus(event, 204);
    return "OK";
  }
});
