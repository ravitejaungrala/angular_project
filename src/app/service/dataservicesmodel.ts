interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  year: number;
  courses: number[];
  marks: { [courseId: number]: number };
  fees: { amount: number; paid: boolean };
  hostel?: { roomNo: string; block: string };
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  department: string;
  courses: number[];
}

interface Course {
  id: number;
  name: string;
  department: string;
  year: number;
  credits: number;
}

interface Department {
  id: number;
  name: string;
  hod: string;
}

interface User {
  role: string;
  username: string;
  password: string;
  id?: number;
}
