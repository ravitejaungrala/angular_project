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
   status?: 'present' | 'absent' | 'late'; // <-- Add this line
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

interface AttendanceSummary {
  courseId: number;
  courseName: string;
  totalClasses: number;
  presentClasses: number;
  percentage: number;
}

interface CourseWithStudents {
  id: number;
  name: string;
  department: string;
  students: StudentAttendance[];
}

interface StudentAttendance {
  id: number;
  name: string;
  department: string;
  year: number;
  attendancePercentage: number;
  attendanceStatus: 'present' | 'absent' | 'late';
}


interface Examination {
  id: number;
  name: string; // e.g., "First Semester Exams 2023"
  type: 'semester' | 'midterm' | 'final';
  year: number;
  startDate: string;
  endDate: string;
  departments: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface ExamSchedule {
  id: number;
  examId: number;
  courseId: number;
  date: string;
  time: string;
  duration: string;
  roomAllocations: RoomAllocation[];
}

interface RoomAllocation {
  id: number;
  roomNo: string;
  block: string;
  teacherId: number;
  studentIds: number[];
}

interface HallTicket {
  id: number;
  studentId: number;
  examId: number;
  courses: number[];
  roomNo: string;
  block: string;
  examDate: string;
  issuedDate: string;
  isApproved: boolean;
}