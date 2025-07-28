import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Dataservices } from '../../service/dataservices';

@Component({
  selector: 'app-hostel',
  standalone: false,
  templateUrl: './hostel.html',
  styleUrl: './hostel.css'
})
export class Hostel {
 students: Student[] = [];
  filteredStudents: Student[] = [];
  searchTerm: string = '';
  blocks: string[] = ['A', 'B', 'C', 'D'];
  selectedBlock: string = '';
  
  selectedStudentId: number | null = null;
  roomNo: string = '';
  block: string = '';
  hostelFeeAmount: number = 10000;
  allocationMode: 'allocate' | 'deallocate' = 'allocate';

  constructor(
    private dataService: Dataservices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.students = this.dataService.getStudents();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          student.id.toString().includes(this.searchTerm);
      const matchesBlock = !this.selectedBlock || 
                         (student.hostel && student.hostel.block === this.selectedBlock);
      return matchesSearch && matchesBlock;
    });
    this.cdr.detectChanges();
  }

  setAllocationMode(mode: 'allocate' | 'deallocate', studentId?: number): void {
    this.allocationMode = mode;
    if (studentId) {
      this.selectedStudentId = studentId;
      const student = this.getSelectedStudent();
      if (student?.hostel) {
        this.roomNo = student.hostel.roomNo || '';
        this.block = student.hostel.block || '';
        this.hostelFeeAmount = student.hostel.fees.amount || 10000;
      }
    }
  }

  allocateHostel(): void {
    if (!this.isFormValid()) {
      alert('Please fill all required fields!');
      return;
    }

    const student = this.getSelectedStudent();
    if (!student) {
      alert(`Student with ID ${this.selectedStudentId} not found!`);
      return;
    }

    this.dataService.allocateHostel(
      student.id, 
      this.roomNo, 
      this.block, 
      this.hostelFeeAmount
    );
    
    this.saveAndRefresh();
    alert(`Hostel allocated to ${student.name}`);
    this.resetForm();
  }

  
deallocateHostel(): void {
    if (!this.selectedStudentId) return;
    
    const student = this.getCurrentStudent();
    if (!student) {
      alert('Student not found!');
      return;
    }

    if (confirm(`Deallocate hostel from ${student.name}?`)) {
      this.dataService.deallocateHostel(student.id);
      this.saveAndRefresh();
      alert('Hostel deallocated successfully!');
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!this.selectedStudentId && !!this.roomNo && !!this.block;
  }

  // Change from private to public
public getSelectedStudent(): Student | undefined {
  return this.students.find(s => s.id === this.selectedStudentId);
}

 private saveAndRefresh(): void {
    // Force a complete refresh of student data
    this.students = this.dataService.getStudents();
    this.applyFilters();
    this.cdr.detectChanges(); // Trigger change detection
  }

public getCurrentStudent(): Student | null {
  if (!this.selectedStudentId) return null;
  return this.students.find(s => s.id === this.selectedStudentId) || null;
}

  resetForm(): void {
    this.selectedStudentId = null;
    this.roomNo = '';
    this.block = '';
    this.hostelFeeAmount = 10000;
    this.allocationMode = 'allocate';
  }
}