import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {
  students: Student[] = [];
  departments: string[] = [];
  years = [1, 2, 3, 4];
  availableCourses: Course[] = [];
  selectedCourses: number[] = [];
  studentForm: FormGroup;
  isEditing = false;
  currentStudentId: number | null = null;

  constructor(
    private dataService: Dataservices,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      year: ['', Validators.required],
      feesAmount: ['', [Validators.required, Validators.min(0)]],
      feesPaid: [false],
      courses: [[], [Validators.required, Validators.minLength(2)]],
      hostelAllocated: [false],
      hostelRoom: [''],
      hostelBlock: [''],
      hostelFeesAmount: ['', [Validators.min(0)]],
      hostelFeesPaid: [false]
    });

    this.studentForm.get('department')?.valueChanges.subscribe(() => {
      this.updateAvailableCourses();
    });

    this.studentForm.get('year')?.valueChanges.subscribe(() => {
      this.updateAvailableCourses();
    });
  }

  ngOnInit(): void {
    this.loadStudents();
    this.departments = this.dataService.getDepartments().map(dept => dept.name);
    this.loadAvailableCourses();
  }

  loadStudents(): void {
    this.students = this.dataService.getStudents();
  }

  loadAvailableCourses(): void {
    this.availableCourses = this.dataService.getCourses();
  }

  updateAvailableCourses(): void {
    const dept = this.studentForm.get('department')?.value;
    const year = this.studentForm.get('year')?.value;
    
    if (dept && year) {
      this.availableCourses = this.dataService.getCourses()
        .filter(course => course.department === dept && course.year === Number(year));
    } else {
      this.availableCourses = [];
    }
    
    this.studentForm.get('courses')?.setValue([]);
    this.selectedCourses = [];
  }

  onCourseSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCourses = Array.from(selectElement.selectedOptions).map(option => Number(option.value));
  }

  getCourseName(courseId: number): string {
    const course = this.dataService.getCourseById(courseId);
    return course ? course.name : 'Unknown Course';
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      if (this.studentForm.get('courses')?.errors?.['minLength']) {
        alert('Please select at least 2 courses');
      }
      return;
    }

    const formValue = this.studentForm.value;
    const marks: { [courseId: number]: number } = {};
    formValue.courses?.forEach((courseId: number) => {
      marks[courseId] = 0;
    });

    const student: Student = {
      id: this.currentStudentId || this.dataService.generateId(),
      name: formValue.name,
      email: formValue.email,
      department: formValue.department,
      year: formValue.year,
      courses: formValue.courses || [],
      marks: marks,
      fees: {
        amount: formValue.feesAmount,
        paid: formValue.feesPaid
      },
      hostel: formValue.hostelAllocated ? {
        allocated: true,
        roomNo: formValue.hostelRoom,
        block: formValue.hostelBlock,
        fees: {
          amount: formValue.hostelFeesAmount,
          paid: formValue.hostelFeesPaid
        }
      } : undefined
    };

    if (this.isEditing && this.currentStudentId) {
      this.dataService.updateStudent(student);
    } else {
      this.dataService.addStudent(student);
      const emailPrefix = student.email.split('@')[0];
      const defaultPassword = emailPrefix.slice(0, 3) + '123';
      const studentsAuth = JSON.parse(localStorage.getItem('studentsAuth') || '[]');
      studentsAuth.push({
        id: student.id,
        email: student.email,
        password: defaultPassword
      });
      localStorage.setItem('studentsAuth', JSON.stringify(studentsAuth));
    }

    this.resetForm();
    this.loadStudents();
  }

  onEdit(student: Student): void {
    this.isEditing = true;
    this.currentStudentId = student.id;
    this.studentForm.patchValue({
      name: student.name,
      email: student.email,
      department: student.department,
      year: student.year,
      feesAmount: student.fees.amount,
      feesPaid: student.fees.paid,
      courses: student.courses,
      hostelAllocated: student.hostel?.allocated || false,
      hostelRoom: student.hostel?.roomNo || '',
      hostelBlock: student.hostel?.block || '',
      hostelFeesAmount: student.hostel?.fees.amount || '',
      hostelFeesPaid: student.hostel?.fees.paid || false
    });
    this.selectedCourses = student.courses;
    this.updateAvailableCourses();
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.dataService.deleteStudent(id);
      this.loadStudents();
    }
  }

  resetForm(): void {
    this.studentForm.reset({
      feesPaid: false,
      hostelAllocated: false,
      hostelFeesPaid: false,
      courses: []
    });
    this.isEditing = false;
    this.currentStudentId = null;
    this.selectedCourses = [];
    this.availableCourses = [];
  }

  onHostelAllocationChange(allocated: boolean): void {
    const controls = ['hostelRoom', 'hostelBlock', 'hostelFeesAmount'];
    controls.forEach(control => {
      const formControl = this.studentForm.get(control);
      if (allocated) {
        formControl?.setValidators([Validators.required]);
      } else {
        formControl?.clearValidators();
      }
      formControl?.updateValueAndValidity();
    });
  }
}