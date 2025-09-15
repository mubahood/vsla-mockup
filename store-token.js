// Quick test to store the token
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgvaG9zcGl0YWwvYXBpL3VzZXJzL2xvZ2luIiwiaWF0IjoxNzU3NDA4NzEzLCJleHAiOjI3MDM0ODg3MTMsIm5iZiI6MTc1NzQwODcxMywianRpIjoienNiaTJzbmJuQTlva0JNViIsInN1YiI6IjEiLCJwcnYiOiIzZDYwNWFiNDkyODI1NTY2MWE3YWRiNTRjNTkwYWNiYmMxOWNmZjdlIn0.uEYGb0XS-lnXyzRERZ5nCtMQcSVvhbn5BhqxgHy72VA";
localStorage.setItem('DB_TOKEN', token);
console.log('Token stored successfully!');
console.log('Token value:', localStorage.getItem('DB_TOKEN'));
