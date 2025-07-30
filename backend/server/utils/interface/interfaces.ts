export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role: "admin"| "operator";
}

export interface Login {
    username: string;
    password: string;
}
