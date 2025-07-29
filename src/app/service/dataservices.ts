import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Dataservices {
  
  
private departments: Department[] = [
    { id: 1, name: 'CSE', hod: 'Dr. Smith' },
    { id: 2, name: 'AIML', hod: 'Dr. Johnson' },
    { id: 3, name: 'IT', hod: 'Dr. Williams' },
    { id: 4, name: 'ECE', hod: 'Dr. Brown' },
    { id: 5, name: 'EEE', hod: 'Dr. Davis' },
    { id: 6, name: 'MECH', hod: 'Dr. Miller' },
    { id: 7, name: 'CIVIL', hod: 'Dr. Wilson' }
  ];

  private courses: Course[] = [
    // CSE Courses
    { id: 101, name: 'Programming Fundamentals', department: 'CSE', year: 1, credits: 4 },
    { id: 102, name: 'Data Structures', department: 'CSE', year: 2, credits: 4 },
    { id: 103, name: 'Algorithms', department: 'CSE', year: 3, credits: 4 },
    { id: 104, name: 'Database Systems', department: 'CSE', year: 2, credits: 3 },
    { id: 105, name: 'Computer Networks', department: 'CSE', year: 3, credits: 3 },
    { id: 106, name: 'Operating Systems', department: 'CSE', year: 3, credits: 4 },
    { id: 107, name: 'Software Engineering', department: 'CSE', year: 4, credits: 3 },
    { id: 108, name: 'Artificial Intelligence', department: 'CSE', year: 4, credits: 4 },
    { id: 109, name: 'Machine Learning', department: 'CSE', year: 4, credits: 4 },
    { id: 110, name: 'Cloud Computing', department: 'CSE', year: 4, credits: 3 },
    
    // AIML Courses
    { id: 201, name: 'Python Programming', department: 'AIML', year: 1, credits: 4 },
    { id: 202, name: 'Linear Algebra', department: 'AIML', year: 1, credits: 3 },
    { id: 203, name: 'Probability & Statistics', department: 'AIML', year: 2, credits: 3 },
    { id: 204, name: 'Machine Learning Fundamentals', department: 'AIML', year: 2, credits: 4 },
    { id: 205, name: 'Deep Learning', department: 'AIML', year: 3, credits: 4 },
    { id: 206, name: 'Natural Language Processing', department: 'AIML', year: 3, credits: 4 },
    { id: 207, name: 'Computer Vision', department: 'AIML', year: 4, credits: 4 },
    { id: 208, name: 'Reinforcement Learning', department: 'AIML', year: 4, credits: 3 },
    { id: 209, name: 'AI Ethics', department: 'AIML', year: 4, credits: 2 },
    { id: 210, name: 'Big Data Analytics', department: 'AIML', year: 4, credits: 3 },
    
    // IT Courses
    { id: 301, name: 'Information Technology Fundamentals', department: 'IT', year: 1, credits: 4 },
    { id: 302, name: 'Web Technologies', department: 'IT', year: 2, credits: 4 },
    { id: 303, name: 'System Analysis and Design', department: 'IT', year: 2, credits: 3 },
    { id: 304, name: 'Network Security', department: 'IT', year: 3, credits: 3 },
    { id: 305, name: 'Cloud Computing', department: 'IT', year: 3, credits: 4 },
    { id: 306, name: 'Mobile Application Development', department: 'IT', year: 3, credits: 4 },
    { id: 307, name: 'IT Project Management', department: 'IT', year: 4, credits: 3 },
    { id: 308, name: 'Data Warehousing', department: 'IT', year: 4, credits: 3 },
    { id: 309, name: 'Cyber Security', department: 'IT', year: 4, credits: 4 },
    { id: 310, name: 'Internet of Things', department: 'IT', year: 4, credits: 3 },
    
    // ECE Courses
    { id: 401, name: 'Electronics Fundamentals', department: 'ECE', year: 1, credits: 4 },
    { id: 402, name: 'Digital Electronics', department: 'ECE', year: 2, credits: 4 },
    { id: 403, name: 'Signals and Systems', department: 'ECE', year: 2, credits: 3 },
    { id: 404, name: 'Communication Systems', department: 'ECE', year: 3, credits: 4 },
    { id: 405, name: 'Microprocessors', department: 'ECE', year: 3, credits: 4 },
    { id: 406, name: 'VLSI Design', department: 'ECE', year: 3, credits: 3 },
    { id: 407, name: 'Embedded Systems', department: 'ECE', year: 4, credits: 4 },
    { id: 408, name: 'Wireless Communication', department: 'ECE', year: 4, credits: 3 },
    { id: 409, name: 'Optical Communication', department: 'ECE', year: 4, credits: 3 },
    { id: 410, name: 'Satellite Communication', department: 'ECE', year: 4, credits: 3 },
    
    // EEE Courses
    { id: 501, name: 'Electrical Circuits', department: 'EEE', year: 1, credits: 4 },
    { id: 502, name: 'Electromagnetic Theory', department: 'EEE', year: 2, credits: 3 },
    { id: 503, name: 'Power Systems', department: 'EEE', year: 2, credits: 4 },
    { id: 504, name: 'Control Systems', department: 'EEE', year: 3, credits: 3 },
    { id: 505, name: 'Electrical Machines', department: 'EEE', year: 3, credits: 4 },
    { id: 506, name: 'Power Electronics', department: 'EEE', year: 3, credits: 4 },
    { id: 507, name: 'Renewable Energy Systems', department: 'EEE', year: 4, credits: 3 },
    { id: 508, name: 'High Voltage Engineering', department: 'EEE', year: 4, credits: 3 },
    { id: 509, name: 'Smart Grid', department: 'EEE', year: 4, credits: 3 },
    { id: 510, name: 'Industrial Automation', department: 'EEE', year: 4, credits: 4 },
    
    // MECH Courses
    { id: 601, name: 'Engineering Mechanics', department: 'MECH', year: 1, credits: 4 },
    { id: 602, name: 'Thermodynamics', department: 'MECH', year: 2, credits: 3 },
    { id: 603, name: 'Fluid Mechanics', department: 'MECH', year: 2, credits: 4 },
    { id: 604, name: 'Machine Design', department: 'MECH', year: 3, credits: 4 },
    { id: 605, name: 'Heat Transfer', department: 'MECH', year: 3, credits: 3 },
    { id: 606, name: 'Automobile Engineering', department: 'MECH', year: 3, credits: 3 },
    { id: 607, name: 'Robotics', department: 'MECH', year: 4, credits: 4 },
    { id: 608, name: 'CAD/CAM', department: 'MECH', year: 4, credits: 3 },
    { id: 609, name: 'Mechatronics', department: 'MECH', year: 4, credits: 3 },
    { id: 610, name: 'Industrial Engineering', department: 'MECH', year: 4, credits: 3 },
    
    // CIVIL Courses
    { id: 701, name: 'Engineering Drawing', department: 'CIVIL', year: 1, credits: 4 },
    { id: 702, name: 'Surveying', department: 'CIVIL', year: 2, credits: 3 },
    { id: 703, name: 'Structural Analysis', department: 'CIVIL', year: 2, credits: 4 },
    { id: 704, name: 'Concrete Technology', department: 'CIVIL', year: 3, credits: 3 },
    { id: 705, name: 'Geotechnical Engineering', department: 'CIVIL', year: 3, credits: 4 },
    { id: 706, name: 'Transportation Engineering', department: 'CIVIL', year: 3, credits: 3 },
    { id: 707, name: 'Environmental Engineering', department: 'CIVIL', year: 4, credits: 3 },
    { id: 708, name: 'Project Management', department: 'CIVIL', year: 4, credits: 3 },
    { id: 709, name: 'Earthquake Engineering', department: 'CIVIL', year: 4, credits: 3 },
    { id: 710, name: 'Urban Planning', department: 'CIVIL', year: 4, credits: 3 }
  ];

  private teachers: Teacher[] = [
    // CSE Teachers
    { id: 1, name: 'Prof. Anderson', email: 'anderson@college.edu', department: 'CSE', courses: [101, 102] },
    { id: 2, name: 'Prof. Baker', email: 'baker@college.edu', department: 'CSE', courses: [103, 104] },
    { id: 3, name: 'Prof. Carter', email: 'carter@college.edu', department: 'CSE', courses: [105, 106] },
    { id: 4, name: 'Prof. Davis', email: 'davis@college.edu', department: 'CSE', courses: [107, 108] },
    { id: 5, name: 'Prof. Evans', email: 'evans@college.edu', department: 'CSE', courses: [109, 110] },
    
    // AIML Teachers
    { id: 6, name: 'Prof. Foster', email: 'foster@college.edu', department: 'AIML', courses: [201, 202] },
    { id: 7, name: 'Prof. Green', email: 'green@college.edu', department: 'AIML', courses: [203, 204] },
    { id: 8, name: 'Prof. Harris', email: 'harris@college.edu', department: 'AIML', courses: [205, 206] },
    { id: 9, name: 'Prof. Irving', email: 'irving@college.edu', department: 'AIML', courses: [207, 208] },
    { id: 10, name: 'Prof. Johnson', email: 'johnson@college.edu', department: 'AIML', courses: [209, 210] },
    
    // IT Teachers
    { id: 11, name: 'Prof. King', email: 'king@college.edu', department: 'IT', courses: [301, 302] },
    { id: 12, name: 'Prof. Lee', email: 'lee@college.edu', department: 'IT', courses: [303, 304] },
    { id: 13, name: 'Prof. Miller', email: 'miller@college.edu', department: 'IT', courses: [305, 306] },
    { id: 14, name: 'Prof. Nelson', email: 'nelson@college.edu', department: 'IT', courses: [307, 308] },
    { id: 15, name: 'Prof. Owens', email: 'owens@college.edu', department: 'IT', courses: [309, 310] },
    
    // ECE Teachers
    { id: 16, name: 'Prof. Parker', email: 'parker@college.edu', department: 'ECE', courses: [401, 402] },
    { id: 17, name: 'Prof. Quinn', email: 'quinn@college.edu', department: 'ECE', courses: [403, 404] },
    { id: 18, name: 'Prof. Reed', email: 'reed@college.edu', department: 'ECE', courses: [405, 406] },
    { id: 19, name: 'Prof. Scott', email: 'scott@college.edu', department: 'ECE', courses: [407, 408] },
    { id: 20, name: 'Prof. Turner', email: 'turner@college.edu', department: 'ECE', courses: [409, 410] },
    
    // EEE Teachers
    { id: 21, name: 'Prof. Underwood', email: 'underwood@college.edu', department: 'EEE', courses: [501, 502] },
    { id: 22, name: 'Prof. Vance', email: 'vance@college.edu', department: 'EEE', courses: [503, 504] },
    { id: 23, name: 'Prof. White', email: 'white@college.edu', department: 'EEE', courses: [505, 506] },
    { id: 24, name: 'Prof. Xavier', email: 'xavier@college.edu', department: 'EEE', courses: [507, 508] },
    { id: 25, name: 'Prof. Young', email: 'young@college.edu', department: 'EEE', courses: [509, 510] },
    
    // MECH Teachers
    { id: 26, name: 'Prof. Zimmerman', email: 'zimmerman@college.edu', department: 'MECH', courses: [601, 602] },
    { id: 27, name: 'Prof. Adams', email: 'adams@college.edu', department: 'MECH', courses: [603, 604] },
    { id: 28, name: 'Prof. Brown', email: 'brown@college.edu', department: 'MECH', courses: [605, 606] },
    { id: 29, name: 'Prof. Clark', email: 'clark@college.edu', department: 'MECH', courses: [607, 608] },
    { id: 30, name: 'Prof. Davis', email: 'davis2@college.edu', department: 'MECH', courses: [609, 610] },
    
    // CIVIL Teachers
    { id: 31, name: 'Prof. Edwards', email: 'edwards@college.edu', department: 'CIVIL', courses: [701, 702] },
    { id: 32, name: 'Prof. Fisher', email: 'fisher@college.edu', department: 'CIVIL', courses: [703, 704] },
    { id: 33, name: 'Prof. Grant', email: 'grant@college.edu', department: 'CIVIL', courses: [705, 706] },
    { id: 34, name: 'Prof. Hill', email: 'hill@college.edu', department: 'CIVIL', courses: [707, 708] },
    { id: 35, name: 'Prof. Ingram', email: 'ingram@college.edu', department: 'CIVIL', courses: [709, 710] }
  ];
// 
 private students: Student[] = [
    // CSE Students (10)
    { id: 1, name: 'Sai Akhil', email: 'saiakhil@student.edu', department: 'CSE', year: 1, 
      courses: [101], marks: {101: 85}, fees: {amount: 50000, paid: false},  hostel: {allocated: true, roomNo: 'A101', block: 'A', fees: {amount: 10000, paid: false}} },
    { id: 2, name: 'Bob Smith', email: 'bob@student.edu', department: 'CSE', year: 1, 
      courses: [101], marks: {101: 78}, fees: {amount: 50000, paid: true},  hostel: {allocated: true, roomNo: 'A102', block: 'A', fees: {amount: 10000, paid: true}} },
    { id: 3, name: 'Charlie Brown', email: 'charlie@student.edu', department: 'CSE', year: 2, 
      courses: [102, 104], marks: {102: 92, 104: 88}, fees: {amount: 50000, paid: true},  hostel: {allocated: true, roomNo: 'B101', block: 'B', fees: {amount: 10000, paid: true}}  },
    { id: 4, name: 'David Wilson', email: 'david@student.edu', department: 'CSE', year: 2, 
      courses: [102, 104], marks: {102: 85, 104: 76}, fees: {amount: 50000, paid: false} },
    { id: 5, name: 'Eva Davis', email: 'eva@student.edu', department: 'CSE', year: 3, 
      courses: [103, 105, 106], marks: {103: 89, 105: 91, 106: 84}, fees: {amount: 50000, paid: true}, hostel: {allocated: true, roomNo: 'C101', block: 'C', fees: {amount: 10000, paid: true}} },
    { id: 6, name: 'Frank Miller', email: 'frank@student.edu', department: 'CSE', year: 3, 
      courses: [103, 105, 106], marks: {103: 76, 105: 82, 106: 79}, fees: {amount: 50000, paid: true} },

    { id: 7, name: 'Grace Lee', email: 'grace@student.edu', department: 'CSE', year: 4, 
      courses: [107, 108, 109, 110], marks: {107: 88, 108: 94, 109: 90, 110: 85}, fees: {amount: 50000, paid: true},  hostel: {allocated: true, roomNo: 'D101', block: 'D', fees: {amount: 10000, paid: true}}  },
    { id: 8, name: 'Henry Taylor', email: 'henry@student.edu', department: 'CSE', year: 4, 
      courses: [107, 108, 109, 110], marks: {107: 82, 108: 89, 109: 85, 110: 78}, fees: {amount: 50000, paid: false} },
    { id: 9, name: 'Ivy Clark', email: 'ivy@student.edu', department: 'CSE', year: 4, 
      courses: [107, 108, 109, 110], marks: {107: 91, 108: 95, 109: 92, 110: 89}, fees: {amount: 50000, paid: true} },
    { id: 10, name: 'Jack Adams', email: 'jack@student.edu', department: 'CSE', year: 4, 
      courses: [107, 108, 109, 110], marks: {107: 79, 108: 84, 109: 81, 110: 76}, fees: {amount: 50000, paid: true} },
    
    // AIML Students (10)
    { id: 11, name: 'Karen White', email: 'karen@student.edu', department: 'AIML', year: 1, 
      courses: [201, 202], marks: {201: 85, 202: 88}, fees: {amount: 55000, paid: true}, hostel: {allocated: true, roomNo: 'A201', block: 'A', fees: {amount: 10000, paid: true}}  },
    { id: 12, name: 'Leo Harris', email: 'leo@student.edu', department: 'AIML', year: 1, 
      courses: [201, 202], marks: {201: 78, 202: 82}, fees: {amount: 55000, paid: true} },
    { id: 13, name: 'Mia Martin', email: 'mia@student.edu', department: 'AIML', year: 2, 
      courses: [203, 204], marks: {203: 92, 204: 88}, fees: {amount: 55000, paid: true}, hostel: {allocated: true, roomNo: 'B201', block: 'B', fees: {amount: 10000, paid: true}} },
    { id: 14, name: 'Noah Thompson', email: 'noah@student.edu', department: 'AIML', year: 2, 
      courses: [203, 204], marks: {203: 85, 204: 76}, fees: {amount: 55000, paid: false} },
    { id: 15, name: 'Olivia Garcia', email: 'olivia@student.edu', department: 'AIML', year: 3, 
      courses: [205, 206], marks: {205: 89, 206: 91}, fees: {amount: 55000, paid: true},  hostel: {allocated: true, roomNo: 'C201', block: 'C', fees: {amount: 10000, paid: true}} },
    { id: 16, name: 'Paul Martinez', email: 'paul@student.edu', department: 'AIML', year: 3, 
      courses: [205, 206], marks: {205: 76, 206: 82}, fees: {amount: 55000, paid: true} },
    { id: 17, name: 'Quinn Robinson', email: 'quinn@student.edu', department: 'AIML', year: 4, 
      courses: [207, 208, 209, 210], marks: {207: 88, 208: 94, 209: 90, 210: 85}, fees: {amount: 55000, paid: true},  hostel: {allocated: true, roomNo: 'D201', block: 'D', fees: {amount: 10000, paid: true}}  },
    { id: 18, name: 'Rachel Clark', email: 'rachel@student.edu', department: 'AIML', year: 4, 
      courses: [207, 208, 209, 210], marks: {207: 82, 208: 89, 209: 85, 210: 78}, fees: {amount: 55000, paid: false} },
    { id: 19, name: 'Samuel Rodriguez', email: 'samuel@student.edu', department: 'AIML', year: 4, 
      courses: [207, 208, 209, 210], marks: {207: 91, 208: 95, 209: 92, 210: 89}, fees: {amount: 55000, paid: true} },
    { id: 20, name: 'Tina Lewis', email: 'tina@student.edu', department: 'AIML', year: 4, 
      courses: [207, 208, 209, 210], marks: {207: 79, 208: 84, 209: 81, 210: 76}, fees: {amount: 55000, paid: true} },
    
    // IT Students (10)
    { id: 21, name: 'Umar Walker', email: 'umar@student.edu', department: 'IT', year: 1, 
      courses: [301], marks: {301: 85}, fees: {amount: 52000, paid: true},hostel: {allocated: true, roomNo: 'A301', block: 'A', fees: {amount: 10000, paid: true}}  },
    { id: 22, name: 'Vera Hall', email: 'vera@student.edu', department: 'IT', year: 1, 
      courses: [301], marks: {301: 78}, fees: {amount: 52000, paid: true} },
    { id: 23, name: 'Walter Allen', email: 'walter@student.edu', department: 'IT', year: 2, 
      courses: [302, 303], marks: {302: 92, 303: 88}, fees: {amount: 52000, paid: true},  hostel: {allocated: true, roomNo: 'B301', block: 'B', fees: {amount: 10000, paid: true}}  },
    { id: 24, name: 'Xena Young', email: 'xena@student.edu', department: 'IT', year: 2, 
      courses: [302, 303], marks: {302: 85, 303: 76}, fees: {amount: 52000, paid: false} },
    { id: 25, name: 'Yara Hernandez', email: 'yara@student.edu', department: 'IT', year: 3, 
      courses: [304, 305, 306], marks: {304: 89, 305: 91, 306: 84}, fees: {amount: 52000, paid: true},  hostel: {allocated: true, roomNo: 'C301', block: 'C', fees: {amount: 10000, paid: true}} },
    { id: 26, name: 'Zack King', email: 'zack@student.edu', department: 'IT', year: 3, 
      courses: [304, 305, 306], marks: {304: 76, 305: 82, 306: 79}, fees: {amount: 52000, paid: true} },
    { id: 27, name: 'Ava Wright', email: 'ava@student.edu', department: 'IT', year: 4, 
      courses: [307, 308, 309, 310], marks: {307: 88, 308: 94, 309: 90, 310: 85}, fees: {amount: 52000, paid: true}, hostel: {allocated: true, roomNo: 'D301', block: 'D', fees: {amount: 10000, paid: true}}  },
    { id: 28, name: 'Ben Lopez', email: 'ben@student.edu', department: 'IT', year: 4, 
      courses: [307, 308, 309, 310], marks: {307: 82, 308: 89, 309: 85, 310: 78}, fees: {amount: 52000, paid: false} },
    { id: 29, name: 'Cara Scott', email: 'cara@student.edu', department: 'IT', year: 4, 
      courses: [307, 308, 309, 310], marks: {307: 91, 308: 95, 309: 92, 310: 89}, fees: {amount: 52000, paid: true} },
    { id: 30, name: 'Dylan Green', email: 'dylan@student.edu', department: 'IT', year: 4, 
      courses: [307, 308, 309, 310], marks: {307: 79, 308: 84, 309: 81, 310: 76}, fees: {amount: 52000, paid: true} },
    
    // ECE Students (10)
    { id: 31, name: 'Ethan Adams', email: 'ethan@student.edu', department: 'ECE', year: 1, 
      courses: [401], marks: {401: 85}, fees: {amount: 48000, paid: true}, hostel: {allocated: true, roomNo: 'A401', block: 'A', fees: {amount: 10000, paid: true}} },
    { id: 32, name: 'Fiona Baker', email: 'fiona@student.edu', department: 'ECE', year: 1, 
      courses: [401], marks: {401: 78}, fees: {amount: 48000, paid: true} },
    { id: 33, name: 'George Carter', email: 'george@student.edu', department: 'ECE', year: 2, 
      courses: [402, 403], marks: {402: 92, 403: 88}, fees: {amount: 48000, paid: true}, hostel: {allocated: true, roomNo: 'B401', block: 'B', fees: {amount: 10000, paid: true}}  },
    { id: 34, name: 'Hannah Evans', email: 'hannah@student.edu', department: 'ECE', year: 2, 
      courses: [402, 403], marks: {402: 85, 403: 76}, fees: {amount: 48000, paid: false} },
    { id: 35, name: 'Ian Foster', email: 'ian@student.edu', department: 'ECE', year: 3, 
      courses: [404, 405, 406], marks: {404: 89, 405: 91, 406: 84}, fees: {amount: 48000, paid: true},hostel: {allocated: true, roomNo: 'C401', block: 'C', fees: {amount: 10000, paid: true}} },
    { id: 36, name: 'Julia Grant', email: 'julia@student.edu', department: 'ECE', year: 3, 
      courses: [404, 405, 406], marks: {404: 76, 405: 82, 406: 79}, fees: {amount: 48000, paid: true} },
    { id: 37, name: 'Kevin Hill', email: 'kevin@student.edu', department: 'ECE', year: 4, 
      courses: [407, 408, 409, 410], marks: {407: 88, 408: 94, 409: 90, 410: 85}, fees: {amount: 48000, paid: true}, hostel: {allocated: true, roomNo: 'D401', block: 'D', fees: {amount: 10000, paid: true}} },
    { id: 38, name: 'Lily Ingram', email: 'lily@student.edu', department: 'ECE', year: 4, 
      courses: [407, 408, 409, 410], marks: {407: 82, 408: 89, 409: 85, 410: 78}, fees: {amount: 48000, paid: false} },
    { id: 39, name: 'Mason Jones', email: 'mason@student.edu', department: 'ECE', year: 4, 
      courses: [407, 408, 409, 410], marks: {407: 91, 408: 95, 409: 92, 410: 89}, fees: {amount: 48000, paid: true} },
    { id: 40, name: 'Nora Kelly', email: 'nora@student.edu', department: 'ECE', year: 4, 
      courses: [407, 408, 409, 410], marks: {407: 79, 408: 84, 409: 81, 410: 76}, fees: {amount: 48000, paid: true} }
  ];
  constructor() {this.loadStudentsFromStorage();  this.loadTeachersFromStorage();}

  private loadStudentsFromStorage(): void {
    const storedData = localStorage.getItem('studentsData');
    if (storedData) {
      this.students = JSON.parse(storedData);
    }
  }
  // Department methods
  getDepartments(): Department[] {
    return this.departments;
  }
addStudent(student: Student): void {
  if (!student.id) {
    student.id = this.generateStudentId();
  }

  // Ensure marks are initialized for all courses
  if (!student.marks) {
    student.marks = {};
    student.courses.forEach(courseId => {
      student.marks[courseId] = 0;
    });
  }

  this.students.push(student);
  this.saveStudentsToStorage();

  // Save student credentials
  const studentsAuth = JSON.parse(localStorage.getItem('studentsAuth') || '[]');
  const emailPrefix = student.email.split('@')[0];
  studentsAuth.push({
    id: student.id,
    email: student.email,
    password: emailPrefix.slice(0, 3) + '123' // Default password pattern
  });
  localStorage.setItem('studentsAuth', JSON.stringify(studentsAuth));
}
assignMarks(studentId: number, courseId: number, mark: number): void {
  const students = this.getStudents();
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex !== -1 && students[studentIndex].courses.includes(courseId)) {
    if (!students[studentIndex].marks) {
      students[studentIndex].marks = {};
    }
    students[studentIndex].marks[courseId] = mark;
    this.saveStudentsToStorage();
  }
}
private generateStudentId(): number {
  const students = this.getStudents();
  return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
}

  getDepartmentById(id: number): Department | undefined {
    return this.departments.find(dept => dept.id === id);
  }

  addDepartment(department: Department): void {
    this.departments.push(department);
  }

  updateDepartment(updatedDept: Department): void {
    const index = this.departments.findIndex(dept => dept.id === updatedDept.id);
    if (index !== -1) {
      this.departments[index] = updatedDept;
    }
  }

  deleteDepartment(id: number): void {
    this.departments = this.departments.filter(dept => dept.id !== id);
  }

  // Course methods
  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  getCoursesByDepartment(dept: string): Course[] {
    return this.courses.filter(course => course.department === dept);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  updateCourse(updatedCourse: Course): void {
    const index = this.courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      this.courses[index] = updatedCourse;
    }
  }

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  // Teacher methods
  getTeachers(): Teacher[] {
    return this.teachers;
  }

  getTeacherById(id: number): Teacher | undefined {
    return this.teachers.find(teacher => teacher.id === id);
  }

  getTeachersByDepartment(dept: string): Teacher[] {
    return this.teachers.filter(teacher => teacher.department === dept);
  }

addTeacher(teacher: Teacher): void {
  if (!teacher.id) {
    teacher.id = this.generateTeacherId();
  }

  this.teachers.push(teacher);
  this.saveTeachersToStorage();

  // Save teacher credentials
  const teachersAuth = JSON.parse(localStorage.getItem('teachersAuth') || '[]');
  teachersAuth.push({
    id: teacher.id,
    email: teacher.email,
    password: 't12345' // Default teacher password
  });
  localStorage.setItem('teachersAuth', JSON.stringify(teachersAuth));
}

private saveTeachersToStorage(): void {
  localStorage.setItem('teachersData', JSON.stringify(this.teachers));
}
  updateTeacher(updatedTeacher: Teacher): void {
    const index = this.teachers.findIndex(teacher => teacher.id === updatedTeacher.id);
    if (index !== -1) {
      this.teachers[index] = updatedTeacher;
    }
  }

  deleteTeacher(id: number): void {
    this.teachers = this.teachers.filter(teacher => teacher.id !== id);
  }

  // Student methods
  getStudents(): Student[] {
    return this.students;
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(student => student.id === id);
  }
  getStudentsByCourse(courseId: number): Student[] {
  return this.students.filter(student => 
    student.courses.includes(courseId)
  );
}
getTeacherCourses(teacherId: number): Course[] {
    const teacher = this.getTeacherById(teacherId);
    if (!teacher) return [];
    
    return teacher.courses
      .map(courseId => this.getCourseById(courseId))
      .filter(course => course !== undefined) as Course[];
  }
 updateStudentMarks(studentId: number, courseId: number, mark: number): void {
    // Get current data from localStorage with proper typing
    const storedStudents = localStorage.getItem('studentsData');
    let students: Student[] = storedStudents ? JSON.parse(storedStudents) : this.students;

    // Update the specific student's marks
    const studentIndex = students.findIndex((s: Student) => s.id === studentId);
    if (studentIndex !== -1) {
      if (!students[studentIndex].marks) {
        students[studentIndex].marks = {};
      }
      students[studentIndex].marks[courseId] = mark;

      // Save back to localStorage
      localStorage.setItem('studentsData', JSON.stringify(students));

      // Update service's local copy
      this.students = students;

      // Trigger storage event to notify all tabs
      this.triggerStorageEvent();
    }
  }
private saveStudentsToStorage(): void {
  localStorage.setItem('studentsData', JSON.stringify(this.students));
  // Additional write to ensure change detection
  localStorage.setItem('studentsData_timestamp', Date.now().toString());
}


  private triggerStorageEvent(): void {
    // Create and dispatch a proper storage event
    const event = new StorageEvent('storage', {
      key: 'studentsData',
      newValue: localStorage.getItem('studentsData'),
      oldValue: localStorage.getItem('studentsData'),
      storageArea: localStorage,
      url: window.location.href
    });
    window.dispatchEvent(event);

    // Force update for all components
    setTimeout(() => {
      localStorage.setItem('studentsData_refresh', Date.now().toString());
    }, 100);
  }
   getStudentsWithMarks(courseId: number): {student: Student, mark: number}[] {
    return this.getStudentsByCourse(courseId).map(student => {
      return {
        student: student,
        mark: student.marks?.[courseId] || 0
      };
    });
  }
  getStudentsByDepartment(dept: string): Student[] {
    return this.students.filter(student => student.department === dept);
  }

  getStudentsByYear(year: number): Student[] {
    return this.students.filter(student => student.year === year);
  }
generateId(): number {
  const students = this.getStudents();
  return students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
}
  // addStudent(student: Student): void {
  //   this.students.push(student);
  // }

 

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
  }


// Update the existing updateStudent method to handle hostel fees
updateStudent(student: Student): void {
  const index = this.students.findIndex(s => s.id === student.id);
  if (index !== -1) {
    this.students[index] = student;
    // Update payment history
    this.updatePaymentHistory(student);
     this.saveStudentsToStorage();
  }
}
assignMarksToStudent(studentId: number, courseId: number, mark: number): void {
  const students = this.getStudents();
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex !== -1) {
    if (!students[studentIndex].marks) {
      students[studentIndex].marks = {};
    }
    students[studentIndex].marks[courseId] = mark;
    this.saveStudentsToStorage();
  }
}
 private loadTeachersFromStorage(): void {
    const storedData = localStorage.getItem('teachersData');
    if (storedData) {
      const storedTeachers = JSON.parse(storedData);
      // Merge with default teachers
      storedTeachers.forEach((storedTeacher: any) => {
        if (!this.teachers.some(t => t.id === storedTeacher.id)) {
          this.teachers.push({
            id: storedTeacher.id,
            name: storedTeacher.name || 'New Teacher',
            email: storedTeacher.email,
            department: storedTeacher.department || 'CSE',
            courses: storedTeacher.courses || []
          });
        }
      });
    }
  }
//   assignMarks(studentId: number, courseId: number, mark: number): void {
//   const student = this.getStudentById(studentId);
//   if (student && student.courses.includes(courseId)) {
//     if (!student.marks) {
//       student.marks = {};
//     }
//     student.marks[courseId] = mark;
//     this.saveStudentsToStorage();
//   }
// }
private generateTeacherId(): number {
  const teachers = this.getTeachers();
  return teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
}
private updatePaymentHistory(student: Student): void {
  const history = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
  // Add logic to track both college and hostel payments
  localStorage.setItem('paymentHistory', JSON.stringify(history));
}
validateUser(username: string, password: string): { role: string, id?: number } | null {
  // Check admin (unchanged)
  if (username === 'admin' && password === '12345') {
    return { role: 'admin' };
  }
  
  // Check teachers - first in default data, then in localStorage
  let teacher = this.teachers.find(t => t.email === username);
  if (!teacher) {
    // Check if teacher exists in localStorage
    const storedTeachers = JSON.parse(localStorage.getItem('teachersData') || '[]');
    teacher = storedTeachers.find((t: Teacher) => t.email === username);
  }
  
  if (teacher && password === 't12345') {
    return { role: 'teacher', id: teacher.id };
  }
  
  // Check students - first in default data, then in localStorage
  let student = this.students.find(s => s.email === username);
  if (!student) {
    // Check if student exists in localStorage
    const storedStudents = JSON.parse(localStorage.getItem('studentsData') || '[]');
    student = storedStudents.find((s: Student) => s.email === username);
  }
  
  if (student) {
    const reqpwd = student.email.slice(0, 3) + '123';
    if (password === reqpwd) {
      return { role: 'student', id: student.id };
    }
  }
  
  return null;
}
// Get attendance for a student
getStudentAttendance(studentId: number): AttendanceRecord[] {
  const student = this.getStudentById(studentId);
  return student?.attendance || [];
}

// Get attendance for a course on a specific date
getCourseAttendance(courseId: number, date: string): AttendanceRecord[] {
  const course = this.getCourseById(courseId);
  return course?.attendanceRecords?.[date] || [];
}
// Update the markAttendance method to include studentId in the records
markAttendance(courseId: number, date: string, attendanceData: {studentId: number, status: 'present' | 'absent' | 'late'}[]): void {
  // Update course attendance records
  const course = this.getCourseById(courseId);
  if (!course) return;

  if (!course.attendanceRecords) {
    course.attendanceRecords = {};
  }
  
  // Include studentId in the course attendance records
  course.attendanceRecords[date] = attendanceData.map(data => ({
    studentId: data.studentId, // Add this line
    date,
    status: data.status,
    courseId
  }));

  // Update each student's attendance record
  attendanceData.forEach(data => {
    const student = this.getStudentById(data.studentId);
    if (student) {
      if (!student.attendance) {
        student.attendance = [];
      }
      
      // Remove existing record for this date/course if it exists
      student.attendance = student.attendance.filter(
        record => !(record.date === date && record.courseId === courseId)
      );
      
      // Add new record with studentId
      student.attendance.push({
        studentId: data.studentId, // Add this line
        date,
        status: data.status,
        courseId
      });
    }
  });
}
// Get attendance percentage for a student in a course
getAttendancePercentage(studentId: number, courseId: number): number {
  const student = this.getStudentById(studentId);
  if (!student?.attendance) return 0;
  
  const courseAttendance = student.attendance.filter(a => a.courseId === courseId);
  if (courseAttendance.length === 0) return 0;
  
  const presentCount = courseAttendance.filter(a => a.status === 'present').length;
  return Math.round((presentCount / courseAttendance.length) * 100);
}
// In dataservices.ts
allocateHostel(studentId: number, roomNo: string, block: string, hostelFeeAmount: number): void {
  const student = this.getStudentById(studentId);
  if (student) {
    student.hostel = {
      allocated: true,
      roomNo,
      block,
      fees: {
        amount: hostelFeeAmount,
        paid: false
      }
    };
    this.saveStudentsToStorage();
  }
}

deallocateHostel(studentId: number): void {
  const students = this.getStudents();
  const student = students.find(s => s.id === studentId);
  if (student) {
    delete student.hostel;
    this.saveStudentsToStorage();
    this.triggerStorageUpdate(); // Add this line
  }
}
private triggerStorageUpdate(): void {
  const event = new StorageEvent('storage', {
    key: 'studentsData',
    newValue: localStorage.getItem('studentsData'),
    oldValue: localStorage.getItem('studentsData'),
    storageArea: localStorage,
    url: window.location.href
  });
  window.dispatchEvent(event);
}

payHostelFees(studentId: number, amount: number): void {
  const student = this.getStudentById(studentId);
  if (student?.hostel) {
    student.hostel.fees.amount -= amount;
    if (student.hostel.fees.amount <= 0) {
      student.hostel.fees.paid = true;
      student.hostel.fees.amount = 0;
    }
    
    // Update payment history
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    paymentHistory.push({
      studentId,
      amount,
      date: new Date().toISOString(),
      type: 'hostel'
    });
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    
    this.saveStudentsToStorage();
  }
}

}