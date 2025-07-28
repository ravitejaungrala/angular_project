interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  year: number;
  courses: number[];
  marks: { [courseId: number]: number };
  fees: { amount: number; paid: boolean };
  hostel?: {
    allocated: boolean;
    roomNo?: string;
    block?: string;
    fees: {
      amount: number;
      paid: boolean;
    };
  };
  attendance?: AttendanceRecord[];
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
   attendanceRecords?: { [date: string]: AttendanceRecord[] };
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
// Add to your existing interfaces
interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'late';
  courseId: number;
   studentId: number; 
}

